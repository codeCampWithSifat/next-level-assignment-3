"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error Handler Route
class ApiError extends Error {
    constructor(statusCode, messge, stack = '') {
        super(messge);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
