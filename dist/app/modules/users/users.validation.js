"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// import { role } from './users.constant';
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: 'Password Is Required' }),
        role: zod_1.z.enum(['seller', 'buyer'], {
            required_error: 'Role is Required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'First Name Is Required' }),
            lastName: zod_1.z.string({ required_error: 'Last Name Is Required' }),
        }),
        phoneNumber: zod_1.z.string({ required_error: 'Phone Number Is Required' }),
        address: zod_1.z.string({ required_error: 'Phone Number is Required' }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(['seller', 'buyer']).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
