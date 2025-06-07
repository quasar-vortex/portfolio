"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = exports.signUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const error_1 = require("../error");
const logger_1 = __importDefault(require("../logger"));
const signUserToken = (type, payload) => {
    return jsonwebtoken_1.default.sign(payload, type === "ACCESS" ? env_1.JWT_ACCESS_SECRET : env_1.JWT_REFRESH_SECRET, { expiresIn: type === "ACCESS" ? "15m" : "7d" });
};
exports.signUserToken = signUserToken;
const verifyUserToken = (type, payload) => {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(payload, type === "ACCESS" ? env_1.JWT_ACCESS_SECRET : env_1.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                logger_1.default.warn(err);
                rej(new error_1.HttpError({
                    status: "NOT_AUTHORIZED",
                    message: "Invalid Token",
                }));
            }
            res(decoded);
        });
    });
};
exports.verifyUserToken = verifyUserToken;
