"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const cow_model_1 = require("./cow.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = yield cow_model_1.Cow.create(payload);
    if (!cowData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to created Cow data');
    }
    return cowData;
});
const getAllCows = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield cow_model_1.Cow.find().sort(sortConditions).skip(skip).limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOne({ _id: id });
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield cow_model_1.Cow.findOne({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cows Not Found');
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    deleteCow,
    updateCow,
};
