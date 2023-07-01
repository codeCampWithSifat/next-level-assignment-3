/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interface/common';
const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Created User');
  }

  return result;
};

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

const getAllUsers = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find().sort(sortConditions).skip(skip).limit(limit);
  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExits = await User.findOne({ _id: id });

  if (!isExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
export const UserService = {
  createUser,
  getSingleUser,
  deleteUser,
  getAllUsers,
  updateUser,
};
