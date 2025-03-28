import { db } from "../db";
import { appEnv } from "../env";
import HttpError from "../error";
import { LoginUserModel, RegisterUserModel } from "../models/authModels";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";
import logger from "../logger";

const { selectUser } = userModels;
const { formatApiResponse } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const registerUserHandler = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } =
    req.body as RegisterUserModel;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "Request to Register User Received"
  );

  if (await db.user.findUnique({ where: { email } })) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, email },
      "User Already Exists"
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "User Already Exists",
    });
  }

  const newUser = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwordHash: await hashPass(password),
    },
    select: { ...selectUser },
  });

  const tokenPayload = { id: newUser.id, role: newUser.role };
  const access = signUserToken("ACCESS", tokenPayload);
  const refresh = signUserToken("REFRESH", tokenPayload);

  await db.user.update({
    where: { id: newUser.id },
    data: { lastLoginAt: new Date().toISOString(), refreshToken: refresh },
  });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId: newUser.id },
    "User Registered"
  );

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: appEnv.NODE_ENV.toLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.status(201).json(
    formatApiResponse({
      data: { user: newUser, accessToken: access },
      message: "User created successfully",
    })
  );
});

const loginUserHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body as LoginUserModel;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, email },
    "Request to Sign In Received"
  );

  const foundUser = await db.user.findUnique({
    where: { email },
    select: { ...selectUser, passwordHash: true },
  });

  if (!foundUser || !(await verifyPass(foundUser.passwordHash, password))) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, email },
      "Invalid Credentials"
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Email or Password is incorrect",
    });
  }

  if (!foundUser.isActive) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, email },
      "Inactive user login attempt."
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User is inactive, please contact admin.",
    });
  }
  const { passwordHash, ...restOfUser } = foundUser;
  const tokenPayload = { id: restOfUser.id, role: restOfUser.role };
  const access = signUserToken("ACCESS", tokenPayload);
  const refresh = signUserToken("REFRESH", tokenPayload);

  await db.user.update({
    where: { id: restOfUser.id },
    data: { lastLoginAt: new Date().toISOString(), refreshToken: refresh },
  });

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: appEnv.NODE_ENV.toLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId: foundUser.id },
    "User Signed In"
  );

  res.status(200).json(
    formatApiResponse({
      data: { user: restOfUser, accessToken: access },
      message: "Signed in successfully",
    })
  );
});

const refreshUserHandler = asyncHandler(async (req, res, next) => {
  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "Request to Refresh User Received"
  );

  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken === undefined) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip },
      "Missing Refresh Token"
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Missing Refresh Token",
    });
  }

  let id: string | null = null;
  try {
    id = (await verifyUserToken("REFRESH", refreshToken)).id;
  } catch (error) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip },
      (error as Error).message
    );
    next(error);
    return;
  }

  const foundUser = await db.user.findUnique({
    where: { id, refreshToken },
    select: { ...selectUser },
  });
  if (!foundUser) {
    logger.error(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId: id,
        refreshToken,
      },
      "User Not Found"
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User Not Found",
    });
  }
  if (!foundUser.isActive) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, userId: id },
      "Inactive user login attempt."
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User is inactive, please contact admin.",
    });
  }
  const newAccessToken = signUserToken("ACCESS", { id, role: foundUser.role });

  res.status(200).json(
    formatApiResponse({
      data: { user: foundUser, accessToken: newAccessToken },
      message: "Refreshed User",
    })
  );
});

const logOffUserHandler = asyncHandler(async (req, res, next) => {
  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "Request to Sign Out Received"
  );

  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    let id: string | null = null;
    try {
      id = (await verifyUserToken("REFRESH", refreshToken)).id;
    } catch (error) {
      logger.error(
        { method: req.method, url: req.url, ip: req.ip },
        (error as Error).message
      );
      next(error);
      return;
    }

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

    if (foundUser.refreshToken) {
      await db.user.update({ where: { id }, data: { refreshToken: null } });
    }

    res.clearCookie("refreshToken");
  }

  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "User Signed Out"
  );

  res.status(200).json(formatApiResponse({ message: "User Signed Out" }));
});

export default {
  registerUserHandler,
  loginUserHandler,
  refreshUserHandler,
  logOffUserHandler,
};
