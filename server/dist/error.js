"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const statusCodes = {
    NOT_FOUND: 404,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
};
class HttpError extends Error {
    constructor({ message, status, }) {
        super(message);
        this.status = status;
        this.code = statusCodes[status];
    }
}
exports.HttpError = HttpError;
