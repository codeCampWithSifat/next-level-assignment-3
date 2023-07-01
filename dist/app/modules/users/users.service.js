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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const users_model_1 = require("./users.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.create(payload);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed To Created User');
    }
    return result;
});
// const getAllUsers = async (
//   paginationOptions: IPaginationOptions,
//    filters: IUserFilterableFields
// ): Promise<IGenericResponse<IUser[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const { searchTerm, ...filtersData } = filters;
//   const andConditions = [];
//   if (searchTerm) {
//     andConditions.push({
//       $or: userSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};
//   const result = await User.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);
//   const total = await User.countDocuments(whereConditions);
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
const getAllUsers = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield users_model_1.User.find().sort(sortConditions).skip(skip).limit(limit);
    const total = yield users_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield users_model_1.User.findOne({ _id: id });
    if (!isExits) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Found');
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`; // `name.fisrtName`
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield users_model_1.User.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findOne({ _id: id });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    getSingleUser,
    deleteUser,
    getAllUsers,
    updateUser,
};
