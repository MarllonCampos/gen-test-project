import { Router, Request, NextFunction } from 'express';
import { CategoryController } from './controller';

export const CategoryRouter = Router();
const controller = new CategoryController();

CategoryRouter.get('/', controller.index);
