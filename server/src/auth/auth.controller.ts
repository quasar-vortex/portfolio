import { RequestHandler } from "express";
import { LoginUserModel, RegisterUserModel } from "./auth.models";
import { db } from "../db";
import logger from "../logger";
import { HttpError } from "../error";
import argon from "argon2";
import { signUserToken } from "./auth.utils";
import { NODE_ENV } from "../env";
import { baseUserSelect } from "../users/users.controller";

export const registerUserHandler: RequestHandler = async (req, res, next) => {
  try {
    // password confirmation checked by zod
    const { email, password, firstName, lastName } =
      req.body as RegisterUserModel;
    const meta = {
      ip: req.ip,
      method: req.method,
      url: req.url,
      data: { email },
    };
    logger.info(meta, "Request to Register User");
    // check if user exists
    const foundUser = await db.user.findUnique({ where: { email } });
    if (foundUser) {
      logger.error(meta, "User Already Exists");
      throw new HttpError({ message: "User Exists", status: "BAD_REQUEST" });
    }
    // Create new user
    const newUser = await db.user.create({
      data: {
        email,
        passwordHash: await argon.hash(password),
        firstName,
        lastName,
      },
      select: baseUserSelect,
    });
    // Create Tokens
    const tokenPayload = {
      id: newUser.id,
      role: newUser.role,
    };
    const [access, refresh] = [
      signUserToken("ACCESS", tokenPayload),
      signUserToken("REFRESH", tokenPayload),
    ];
    // Update DB Login
    await db.user.update({
      where: { id: newUser.id },
      data: { lastLoginDate: new Date(), refreshToken: refresh },
    });
    res.cookie("refreshToken", refresh, {
      maxAge: 1000 * 60 * 60 * 7 * 24,
      httpOnly: true,
      secure: NODE_ENV === "production",
    }); // 7 days
    logger.info(meta, "User Registered Successfully");
    res.status(201).json({
      data: { user: newUser, accessToken: access },
      message: "User Registered Successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export const loginUserHandler: RequestHandler = async (req, res, next) => {
  try {
    // password confirmation checked by zod
    const { email, password } = req.body as LoginUserModel;
    const meta = {
      ip: req.ip,
      method: req.method,
      url: req.url,
      data: { email },
    };
    logger.info(meta, "Request to Login User");
    // check if user exists
    const foundUser = await db.user.findUnique({
      where: { email },
      select: { ...baseUserSelect, passwordHash: true },
    });
    if (!foundUser) {
      logger.error(meta, "Email Not Found");
      throw new HttpError({
        message: "Credentials Incorrect",
        status: "NOT_AUTHORIZED",
      });
    }
    const { passwordHash, ...toUser } = foundUser;
    // Check password
    const isPassValid = await argon.verify(foundUser.passwordHash, password);
    if (!isPassValid) {
      logger.error(meta, "Password Incorrect");
      throw new HttpError({
        message: "Credentials Incorrect",
        status: "NOT_AUTHORIZED",
      });
    }
    // Create Tokens
    const tokenPayload = {
      id: foundUser.id,
      role: foundUser.role,
    };
    const [access, refresh] = [
      signUserToken("ACCESS", tokenPayload),
      signUserToken("REFRESH", tokenPayload),
    ];
    // Update DB Login
    await db.user.update({
      where: { id: foundUser.id },
      data: { lastLoginDate: new Date(), refreshToken: refresh },
    });
    res.cookie("refreshToken", refresh, {
      maxAge: 1000 * 60 * 60 * 7 * 24,
      httpOnly: true,
      secure: NODE_ENV === "production",
    }); // 7 days
    logger.info(meta, "User Login Successfully");
    res.status(200).json({
      data: { user: toUser, accessToken: access },
      message: "User Login Successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export const refreshUserHandler: RequestHandler = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    data: { refreshToken },
  };
  try {
    logger.info(meta, "Request to Refresh User");
    if (typeof refreshToken !== "string") {
      logger.error(meta, "Failed to Refresh User, No Token");
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Refresh Token Not Provided",
      });
    }
    // Find user
    const foundUser = await db.user.findUnique({
      where: { refreshToken },
      select: baseUserSelect,
    });
    if (!foundUser) {
      logger.error(meta, "Failed to Refresh User, No User");
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Refresh Token Invalid",
      });
    }

    // Create Tokens
    const tokenPayload = {
      id: foundUser.id,
      role: foundUser.role,
    };
    const accessToken = signUserToken("ACCESS", tokenPayload);

    logger.info(meta, "User Refresh Successfully");

    res.status(200).json({
      data: { user: foundUser, accessToken },
      message: "User Refresh Successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export const signOutUserHandler: RequestHandler = async (req, res, next) => {
  //@ts-ignore
  const userId = req.user!.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    data: { userId },
  };
  logger.info(meta, "Request to Sign Off");
  try {
    await db.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    res.clearCookie("refreshToken", { expires: new Date(0) });
    logger.info(meta, "User Signed Out");
    res.status(200).json({ data: null, message: "User Signed Out" });
  } catch (error) {
    next(error);
  }
};
