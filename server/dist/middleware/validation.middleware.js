"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valMiddleware = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../logger"));
const valMiddleware = (s) => async (req, res, next) => {
    try {
        await s.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.warn({ ip: req.ip, method: req.method, url: req.url, error: error.issues }, "Validation Request Failed");
            res
                .status(400)
                .json({ error: error.issues, message: "Check Your Input" });
            return;
        }
        next(error);
    }
};
exports.valMiddleware = valMiddleware;
