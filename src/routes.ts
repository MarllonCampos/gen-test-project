import { Router } from 'express';
import { CategoryRouter } from './Category/category.router';

export const router = Router();

router.use('/categories', CategoryRouter);
