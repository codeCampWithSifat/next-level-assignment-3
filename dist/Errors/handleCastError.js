"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    //   console.log(error);
    const errors = [
        {
            path: error.path,
            message: 'Invalid Object Id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error Is Occured',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
