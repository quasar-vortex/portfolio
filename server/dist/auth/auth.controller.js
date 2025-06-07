"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOutUserHandler = exports.refreshUserHandler = exports.loginUserHandler = exports.registerUserHandler = void 0;
const db_1 = require("../db");
const logger_1 = __importDefault(require("../logger"));
const error_1 = require("../error");
const argon2_1 = __importDefault(require("argon2"));
const auth_utils_1 = require("./auth.utils");
const users_controller_1 = require("../users/users.controller");
const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 7 * 24, // 7 days
    httpOnly: true,
    secure: false,
    sameSite: "lax",
};
const registerUserHandler = async (req, res, next) => {
    try {
        // password confirmation checked by zod
        const { email, password, firstName, lastName } = req.body;
        const meta = {
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: { email },
        };
        logger_1.default.info(meta, "Request to Register User");
        // check if user exists
        const foundUser = await db_1.db.user.findUnique({ where: { email } });
        if (foundUser) {
            logger_1.default.error(meta, "User Already Exists");
            throw new error_1.HttpError({ message: "User Exists", status: "BAD_REQUEST" });
        }
        // Create new user
        const newUser = await db_1.db.user.create({
            data: {
                email,
                passwordHash: await argon2_1.default.hash(password),
                firstName,
                lastName,
            },
            select: users_controller_1.baseUserSelect,
        });
        // Create Tokens
        const tokenPayload = {
            id: newUser.id,
            role: newUser.role,
        };
        const { access, refresh } = {
            access: (0, auth_utils_1.signUserToken)("ACCESS", tokenPayload),
            refresh: (0, auth_utils_1.signUserToken)("REFRESH", tokenPayload),
        };
        // Update DB Login
        await db_1.db.user.update({
            where: { id: newUser.id },
            data: { lastLoginDate: new Date() },
        });
        res.cookie("refreshToken", refresh, cookieConfig); // 7 days
        logger_1.default.info(meta, "User Registered Successfully");
        res.status(201).json({
            data: { user: newUser, accessToken: access },
            message: "User Registered Successfully",
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.registerUserHandler = registerUserHandler;
const loginUserHandler = async (req, res, next) => {
    try {
        // password confirmation checked by zod
        const { email, password } = req.body;
        const meta = {
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: { email },
        };
        logger_1.default.info(meta, "Request to Login User");
        // check if user exists
        const foundUser = await db_1.db.user.findUnique({
            where: { email },
            select: { ...users_controller_1.baseUserSelect, passwordHash: true },
        });
        if (!foundUser) {
            logger_1.default.error(meta, "Email Not Found");
            throw new error_1.HttpError({
                message: "Credentials Incorrect",
                status: "NOT_AUTHORIZED",
            });
        }
        const { passwordHash, ...toUser } = foundUser;
        // Check password
        const isPassValid = await argon2_1.default.verify(foundUser.passwordHash, password);
        if (!isPassValid) {
            logger_1.default.error(meta, "Password Incorrect");
            throw new error_1.HttpError({
                message: "Credentials Incorrect",
                status: "NOT_AUTHORIZED",
            });
        }
        // Create Tokens
        const tokenPayload = {
            id: foundUser.id,
            role: foundUser.role,
        };
        const { access, refresh } = {
            access: (0, auth_utils_1.signUserToken)("ACCESS", tokenPayload),
            refresh: (0, auth_utils_1.signUserToken)("REFRESH", tokenPayload),
        };
        // Update DB Login
        await db_1.db.user.update({
            where: { id: foundUser.id },
            data: { lastLoginDate: new Date() },
        });
        res.cookie("refreshToken", refresh, cookieConfig); // 7 days
        logger_1.default.info(meta, "User Login Successfully");
        res.status(200).json({
            data: { user: toUser, accessToken: access },
            message: "User Login Successfully",
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.loginUserHandler = loginUserHandler;
const refreshUserHandler = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
        throw new error_1.HttpError({
            message: "Refresh Token Must Be Provided!",
            status: "NOT_AUTHORIZED",
        });
    logger_1.default.info("Token", refreshToken);
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
    };
    try {
        logger_1.default.info(meta, "Request to Refresh User");
        if (typeof refreshToken !== "string") {
            logger_1.default.error(meta, "Failed to Refresh User, No Token");
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Refresh Token Not Provided",
            });
        }
        const { id } = await (0, auth_utils_1.verifyUserToken)("REFRESH", refreshToken);
        const foundUser = await db_1.db.user.findUnique({ where: { id } });
        if (!foundUser) {
            logger_1.default.error(meta, "Failed to Refresh User, No User");
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Refresh Token Invalid",
            });
        }
        // Create Tokens
        const tokenPayload = {
            id: foundUser.id,
            role: foundUser.role,
        };
        const accessToken = (0, auth_utils_1.signUserToken)("ACCESS", tokenPayload);
        logger_1.default.info(meta, "User Refresh Successfully");
        res.status(200).json({
            data: { user: foundUser, accessToken },
            message: "User Refresh Successfully",
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.refreshUserHandler = refreshUserHandler;
const signOutUserHandler = async (req, res, next) => {
    //@ts-ignore
    const userId = req.user.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        data: { userId },
    };
    logger_1.default.info(meta, "Request to Sign Off");
    try {
        res.clearCookie("refreshToken", { expires: new Date(0) });
        logger_1.default.info(meta, "User Signed Out");
        res.status(200).json({ data: null, message: "User Signed Out" });
    }
    catch (error) {
        next(error);
    }
};
exports.signOutUserHandler = signOutUserHandler;
