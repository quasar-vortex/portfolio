"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const env_1 = require("./env");
const isProd = env_1.NODE_ENV === "production";
const level = isProd ? "info" : "debug";
exports.default = (0, pino_1.default)({
    level,
    transport: isProd
        ? undefined // raw JSON in production
        : {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                ignore: "pid,hostname",
            },
        },
});
