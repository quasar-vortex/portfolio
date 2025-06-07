"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = exports.optionalAuthMiddleware = void 0;
const error_1 = require("../error");
const auth_utils_1 = require("../auth/auth.utils");
const logger_1 = __importDefault(require("../logger"));
// Helper to extract and validate a Bearer token
function getBearerToken(header) {
    if (!header?.startsWith("Bearer ")) {
        throw new error_1.HttpError({
            status: "NOT_AUTHORIZED",
            message: "Missing or invalid Authorization header",
        });
    }
    // Slice to after bearer
    return header.slice(7);
}
const authMiddleware = async (req, res, next) => {
    const meta = { ip: req.ip, method: req.method, url: req.url };
    logger_1.default.info(meta, "Verifying access token");
    try {
        const token = getBearerToken(req.headers.authorization);
        const { id, role } = await (0, auth_utils_1.verifyUserToken)("ACCESS", token);
        req.user = { id, role };
        return next();
    }
    catch (err) {
        logger_1.default.warn({ ...meta, error: err }, "Authentication failed");
        return next(new error_1.HttpError({
            status: "NOT_AUTHORIZED",
            message: err.message ?? "Invalid or expired token",
        }));
    }
};
exports.authMiddleware = authMiddleware;
const optionalAuthMiddleware = async (req, res, next) => {
    const meta = { ip: req.ip, method: req.method, url: req.url };
    logger_1.default.info(meta, "Verifying access token");
    try {
        const token = getBearerToken(req.headers.authorization);
        console.log(token);
        const { id, role } = await (0, auth_utils_1.verifyUserToken)("ACCESS", token);
        req.user = { id, role };
        return next();
    }
    catch (err) {
        logger_1.default.info({ ...meta }, "Non-authenticated Request");
        return next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
const roleMiddleware = (requiredRole) => async (req, res, next) => {
    const meta = { ip: req.ip, method: req.method, url: req.url };
    logger_1.default.info(meta, `Checking for role ${requiredRole}`);
    try {
        const user = req.user;
        if (!user?.id || !user?.role) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "User not authenticated",
            });
        }
        if (user.role !== requiredRole) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: `Requires role ${requiredRole}, but user has ${user.role}`,
            });
        }
        return next();
    }
    catch (err) {
        logger_1.default.warn({ ...meta, error: err }, "Role check failed");
        return next(err);
    }
};
exports.roleMiddleware = roleMiddleware;
