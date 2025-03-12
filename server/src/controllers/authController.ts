import { db } from "../db";
import { appEnv } from "../env";
import HttpError from "../error";
import { LoginUserModel, RegisterUserModel } from "../models/authModels";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";
import logger from "../logger";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const registerUserHandler = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } =
    req.body as RegisterUserModel;

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
    },
    "Request to Register User Received"
  );

  // Check if the user exists
  if (await db.user.findUnique({ where: { email } })) {
    logger.error(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
        email,
      },
      "User Already Exists"
    );
    new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "User Already Exists",
    });
  }

  // Creat the user
  const newUser = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      // hash the password
      passwordHash: await hashPass(password),
    },
    select: { ...selectUser },
  });
  // Sign Tokens
  const tokenPayload = { id: newUser.id };
  const { access, refresh } = {
    access: signUserToken("ACCESS", tokenPayload),
    refresh: signUserToken("REFRESH", tokenPayload),
  };
  // Build response
  const response = {
    user: newUser,
    accessToken: access,
  };
  await db.user.update({
    where: { id: newUser.id },
    data: { lastLoginAt: new Date().toISOString(), refreshToken: refresh },
  });
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId: newUser.id },
    "User Registered"
  );
  // Sign refresh http only cookie
  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: appEnv.NODE_ENV.toLocaleLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res
    .status(201)
    .json(formatApiRespone(response, 201, "User created successfully"));
});

const loginUserHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as LoginUserModel;
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, email },
    "Request to Sign In Received"
  );
  // Check if the user doesn't exit
  const foundUser = await db.user.findUnique({
    where: { email },
    select: { ...selectUser, passwordHash: true },
  });
  if (!foundUser) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, email },
      "No User Was Found"
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Email or Password is incorrect",
    });
  }

  const { passwordHash, ...restOfUser } = foundUser;
  // Verify the password
  const isPassValid = await verifyPass(passwordHash, password);
  if (!isPassValid) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip },
      "Password Is Invalid"
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Email or Password is incorrect",
    });
  }

  // Sign Tokens
  const tokenPayload = { id: restOfUser.id };
  const { access, refresh } = {
    access: signUserToken("ACCESS", tokenPayload),
    refresh: signUserToken("REFRESH", tokenPayload),
  };
  await db.user.update({
    where: { id: restOfUser.id },
    data: { lastLoginAt: new Date().toISOString(), refreshToken: refresh },
  });
  // Build response
  const response = {
    user: restOfUser,
    accessToken: access,
  };
  // Sign refresh http only cookie
  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: appEnv.NODE_ENV.toLocaleLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId: foundUser.id },
    "User Signed In"
  );
  res
    .status(200)
    .json(formatApiRespone(response, 200, "Signed in successfully"));
});

const refreshUserHandler = asyncHandler(async (req, res, next) => {
  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
    },
    "Request to Refresh User Received"
  );

  // Get the cookie token
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip },
      "Unable to Refresh User"
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Missing Refresh Token",
    });
  }
  let id: string | null = null;
  try {
    // Verify the token and get the user id
    const decoded = await verifyUserToken("REFRESH", refreshToken);
    id = decoded.id;
  } catch (error) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip },
      (error as Error).message
    );
    next(error);
    return;
  }
  // Check if the user exists in the database
  const foundUser = await db.user.findUnique({
    where: { id, refreshToken },
    select: { ...selectUser },
  });
  if (!foundUser) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, userId: id },
      "User Not Found"
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User Not Found",
    });
  }
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, foundUser },
    "Found User"
  );
  // Sign a new token, no new refresh token is issued
  const newAccessToken = signUserToken("ACCESS", { id });
  res
    .status(200)
    .json(
      formatApiRespone(
        { user: foundUser, accessToken: newAccessToken },
        200,
        "Refreshed User"
      )
    );
});

const logOffUserHandler = asyncHandler(async (req, res, next) => {
  // Get the cookie token
  const refreshToken = req.cookies?.refreshToken;
  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "Request to Sign Out Received"
  );
  if (refreshToken) {
    let id: string | null = null;
    try {
      // Verify the token and get the user id
      const decoded = await verifyUserToken("REFRESH", refreshToken);
      id = decoded.id;
    } catch (error) {
      logger.error(
        { method: req.method, url: req.url, ip: req.ip },
        (error as Error).message
      );
      next(error);
      return;
    }
    // Check if the user exists in the database
    const foundUser = await db.user.findUnique({
      where: { id },
      select: { refreshToken: true },
    });
    if (!foundUser) {
      logger.error(
        { method: req.method, url: req.url, ip: req.ip, userId: id },
        "User Not Found"
      );
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "User Not Found",
      });
    }
    logger.info(
      { method: req.method, url: req.url, ip: req.ip, userId: id },
      "Found User"
    );
    // Remove the token from the database
    if (foundUser.refreshToken) {
      await db.user.update({ where: { id }, data: { refreshToken: null } });
    }
    // Clear the cookie
    res.clearCookie("refreshToken", undefined);
  }
  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "User Signed Out"
  );
  res.status(200).json(formatApiRespone(null, 200, "User Signed Out"));
});

export default {
  registerUserHandler,
  loginUserHandler,
  refreshUserHandler,
  logOffUserHandler,
};
