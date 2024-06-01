"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = function (error, req, res, next) {
    const statusCode = res.statusCode || 500;
    if (process.env.NODE_ENV === 'production') {
        res.status(statusCode).json({ message: error.message });
    }
    else {
        res.status(statusCode).json({ message: error.message, stack: error.stack, });
    }
    next();
};
exports.errorHandler = errorHandler;
