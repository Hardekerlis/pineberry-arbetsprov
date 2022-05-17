import { Router } from 'express';
import { body } from 'express-validator';

import { authenticate, validateResult } from '../../lib';

const router = Router();

import register from './register';
router.post(
  '/register',
  authenticate,
  [
    body('username')
      .exists()
      .withMessage('Need a username')
      .isString()
      .withMessage('Must be a string'),
    body('password')
      .exists()
      .withMessage('Need a password')
      .isLength({ min: 6, max: 20 })
      .withMessage('A password must be between 6 and 20 characters'),
  ],
  validateResult,
  register,
);

import login from './login';
router.post(
  '/login',
  [
    body('username').exists().withMessage('Need a username'),
    body('password').exists().withMessage('Need a password'),
  ],
  validateResult,
  login,
);

export default router;
