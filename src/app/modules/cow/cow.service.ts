import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const cowData = await Cow.create(payload);
  if (!cowData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created Cow data');
  }
  return cowData;
};

const getAllCows = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Cow.find().sort(sortConditions).skip(skip).limit(limit);
  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id: id });
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExists = await Cow.findOne({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cows Not Found');
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};
