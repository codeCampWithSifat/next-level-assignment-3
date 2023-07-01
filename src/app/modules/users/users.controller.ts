import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './users.service';
import { IUser } from './users.interface';
import paginationPick from '../../../shared/paginationPick';
import { paginationFields } from '../../../constants/pagination';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created User Successfully',
    data: result,
  });
});

// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//   const paginationOptions = paginationPick(req.query, paginationFields);
//   console.log(paginationOptions);
//   // const filters = paginationPick(req.query, userFilterableFields);
//   const result = await UserService.getAllUsers( paginationOptions);

//   sendResponse<IUser[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Students retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = paginationPick(req.query, paginationFields);
  const result = await UserService.getAllUsers(paginationOptions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created User Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get A Single User  Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User  Successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedUser = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted User Successfully',
    data: deletedUser,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  deleteUser,
  getAllUsers,
  updateUser,
};
