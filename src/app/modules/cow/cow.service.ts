import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const cowData = await Cow.create(payload);
  if (!cowData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created Cow data');
  }
  return cowData;
};

export const CowService = {
  createCow,
};
