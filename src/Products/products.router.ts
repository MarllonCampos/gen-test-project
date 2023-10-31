import * as yup from 'yup';
import { Router, Request, NextFunction, Response } from 'express';
import { ProductsController } from './controller';
import { ProductsErrors } from './error';

export const ProductsRouter = Router();
const controller = new ProductsController();

ProductsRouter.get('/', controller.index);
ProductsRouter.post('/', controller.store);
ProductsRouter.get('/:id', controller.show);
ProductsRouter.patch('/:id', controller.update);
ProductsRouter.delete('/:id', controller.delete);

ProductsRouter.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof yup.ValidationError) {
    const yupErrors = err.errors;
    return next(ProductsErrors.ValidationErrors([...yupErrors]));
  }
  next(err);
});
