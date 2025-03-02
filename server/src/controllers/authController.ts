import { db } from "../db";
import { NODE_ENV } from "../env";
import HttpError from "../error";
import { RegisterUserModel } from "../models/authModels";
import utils from "../utils";
import { formatApiRespone } from "../utils/apiUtils";

const { asyncHandler } = utils;

const registerUserHandler = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } =
    req.body as RegisterUserModel;
  // Check if the user exists
  const foundUser = await db.user.findUnique({ where: { email } });
  if (foundUser)
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
      passwordHash: await utils.hashPass(password),
    },
  });
  // Sign Tokens
  const tokenPayload = { id: newUser.id };
  const { access, refresh } = {
    access: utils.signUserToken("ACCESS", tokenPayload),
    refresh: utils.signUserToken("REFRESH", tokenPayload),
  };
  // Build response
  const response = {
    user: newUser,
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
    .status(201)
    .json(formatApiRespone(response, 201, "User created successfully"));
});

const loginUserHandler = asyncHandler(async (req, res, next) => {});

const refreshUserHandler = asyncHandler(async (req, res, next) => {});

const logOffUserHandler = asyncHandler(async (req, res, next) => {});
