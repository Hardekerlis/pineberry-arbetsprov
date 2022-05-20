import { Router } from 'express';
import { body } from 'express-validator';

import { authenticate, validateResult } from '../../lib';

const router = Router();

import create from './create';
router.post(
  '/create',
  authenticate,
  [
    // Add sex
    body('name')
      .exists()
      .withMessage('Need a name')
      .bail()
      .isString()
      .withMessage('Must be a string'),
    body('timestamp')
      .exists()
      .withMessage('Need a timestamp')
      .bail()
      .isNumeric()
      .withMessage('Must be a timestamp'),
    body('sex')
      .exists()
      .withMessage('Need a sex')
      .bail()
      .custom((value, { req }) => {
        if (value !== 'male' && value !== 'female')
          throw new Error('Invalid sex');

        return value;
      }),
  ],
  validateResult,
  create,
);

import fetch from './fetch';
router.get('/:id', fetch.one);
router.get('/', fetch.many);

import results from './results';
router.post(
  '/results',
  authenticate,
  [
    body('competitionId')
      .exists()
      .withMessage('Need competitionId')
      .bail()
      .isString()
      .withMessage('competitionId must be a string'),
    body('values').custom((values, { req }) => {
      if (!values[0]) throw new Error('Need values');

      if (!values[0].userId)
        throw new Error('Need user id in results array objects');
      if (!values[0].value)
        throw new Error('Need value in results array objects');

      return values;
    }),
    body('userIds').isArray().withMessage('userIds must be an array'),
  ],
  validateResult,
  results,
);

export default router;
