import express from 'express';
import { UserController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
