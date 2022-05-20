import { Router } from 'express';
import { body } from 'express-validator';

import { authenticate, validateResult } from '../../lib';

const router = Router();

import add from './add';
router.post(
  '/:competitionId',
  authenticate,
  [
    body('name')
      .exists()
      .withMessage('Need a name')
      .bail()
      .isString()
      .withMessage('Name must be a string'),
    body('number')
      .exists()
      .withMessage('Need a number')
      .bail()
      .isNumeric()
      .withMessage('Number must be a number'),
  ],
  validateResult,
  add,
);

export default router;
