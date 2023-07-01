"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const CowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.locations,
    },
    breed: {
        type: String,
        required: true,
    },
    weigth: {
        type: Number,
        required: true,
    },
    lebel: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.categories,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.Cow = (0, mongoose_1.model)('Cows', CowSchema);
