import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Data Created Successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
};
