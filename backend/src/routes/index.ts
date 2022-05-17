import { Router } from 'express';

const router = Router();

import adminRouter from './admin';
router.use('/admin', adminRouter);

export default router;
