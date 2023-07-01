"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        age: zod_1.z.number({ required_error: 'Age is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        location: zod_1.z.enum([...cow_constant_1.locations]),
        breed: zod_1.z.string({ required_error: 'Breed is required' }),
        weigth: zod_1.z.number({ required_error: 'Weigth is required' }),
        lebel: zod_1.z.string({ required_error: 'Level is required' }),
        category: zod_1.z.enum([...cow_constant_1.categories]),
        seller: zod_1.z.string().optional(),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.locations]).optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        level: zod_1.z.string().optional(),
        category: zod_1.z.enum([...cow_constant_1.categories]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.cowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
