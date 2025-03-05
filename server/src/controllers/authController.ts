import { db } from "../db";
import { NODE_ENV } from "../env";
import HttpError from "../error";
import { LoginUserModel, RegisterUserModel } from "../models/authModels";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const registerUserHandler = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } =
    req.body as RegisterUserModel;

  // Check if the user exists
  if (await db.user.findUnique({ where: { email } }))
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "User Already Exists",
    });
  // Creat the user
  const newUser = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      // hash the password
      passwordHash: await hashPass(password),
    },
    select: selectUser,
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
  // Sign refresh http only cookie
  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: NODE_ENV.toLocaleLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  res
    .status(201)
    .json(formatApiRespone(response, 201, "User created successfully"));
});

const loginUserHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as LoginUserModel;
  // Check if the user doesn't exit
  const foundUser = await db.user.findUnique({
    where: { email },
    select: { ...selectUser, passwordHash: true },
  });
  if (!foundUser)
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Email or Password is incorrect",
    });
  const { passwordHash, ...restOfUser } = foundUser;
  // Verify the password
  const isPassValid = await verifyPass(passwordHash, password);
  if (!isPassValid)
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Email or Password is incorrect",
    });
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
    secure: NODE_ENV.toLocaleLowerCase() === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  res
    .status(200)
    .json(formatApiRespone(response, 200, "Signed in successfully"));
});

const refreshUserHandler = asyncHandler(async (req, res, next) => {
  // Get the cookie token
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Missing Refresh Token",
    });
  // Verify the token and get the user id
  const { id } = await verifyUserToken("REFRESH", refreshToken);
  // Check if the user exists in the database
  const foundUser = await db.user.findUnique({
    where: { id, refreshToken },
    select: { ...selectUser },
  });
  if (!foundUser)
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User Not Found",
    });
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
  if (refreshToken) {
    // Verify the token and get the user id
    const { id } = await verifyUserToken("REFRESH", req.cookies?.refreshToken);
    // Check if the user exists in the database
    const foundUser = await db.user.findUnique({
      where: { id },
      select: { refreshToken: true },
    });
    if (!foundUser)
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "User Not Found",
      });
    // Remove the token from the database
    if (foundUser.refreshToken) {
      await db.user.update({ where: { id }, data: { refreshToken: null } });
    }
    // Clear the cookie
    res.clearCookie("refreshToken", undefined);
  }

  res.status(200).json(formatApiRespone(null, 200, "User Signed Out"));
});

export default {
  registerUserHandler,
  loginUserHandler,
  refreshUserHandler,
  logOffUserHandler,
};
