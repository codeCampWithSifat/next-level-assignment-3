import express from 'express';
import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validatation';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(cowValidation.createCowZodSchema),
  CowController.createCow
);

router.get('/:id', CowController.getSingleCow);
router.delete('/:id', CowController.deleteCow);
router.patch(
  '/:id',
  validateRequest(cowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.get('/', CowController.getAllCows);

// router.get("/", CowController.getAllCows)

export const CowRouters = router;
