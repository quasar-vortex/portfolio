"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_1 = require("../error");
const errorMiddleware = (err, req, res, next) => {
    let message = "Internal Error", statusCode = 500;
    if (err instanceof error_1.HttpError) {
        res.status(err.code).json({ message: err.message });
        return;
    }
    res.status(statusCode).json({ message });
};
exports.errorMiddleware = errorMiddleware;
