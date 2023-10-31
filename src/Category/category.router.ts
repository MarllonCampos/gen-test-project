import * as yup from 'yup';
import { Router, Request, NextFunction, Response } from 'express';
import { CategoryController } from './controller';
import { CategoryErrors } from './error';

export const CategoryRouter = Router();
const controller = new CategoryController();

CategoryRouter.get('/', controller.index);
CategoryRouter.post('/', controller.store);
CategoryRouter.get('/:id', controller.show);
CategoryRouter.patch('/:id', controller.update);
CategoryRouter.delete('/:id', controller.delete);

CategoryRouter.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof yup.ValidationError) {
    const yupErrors = err.errors;
    return next(CategoryErrors.ValidationErrors([...yupErrors]));
  }
  next(err);
});
