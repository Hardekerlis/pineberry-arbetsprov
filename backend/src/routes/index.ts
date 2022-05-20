import { Router } from 'express';

const router = Router();

import adminRouter from './admin';
router.use('/admin', adminRouter);

import competitionRouter from './competition';
router.use('/competition', competitionRouter);

import participantsRouter from './participants';
router.use('/participants', participantsRouter);

export default router;
