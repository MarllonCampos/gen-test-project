import { NextFunction, Request, Response, Router } from 'express';
import DefaultErrors from './DefaultErrors';

import { ProductsRouter } from './Products/products.router';
import { CategoryRouter } from './Category/category.router';

export const router = Router();

router.use('/categorias', CategoryRouter);
router.use('/produtos', ProductsRouter);

router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DefaultErrors) {
    const sendObject: {
      message: string;
      data?: string[];
    } = {
      message: err.message,
    };
    if (err.errors.length > 0) sendObject.data = err.errors;
    const status = err.status ? err.status : 400;
    console.log(err);

    return res.status(status).send(sendObject);
  }

  console.log('Error Middleware', err, err.constructor.name);
  res.status(500).send({ message: 'Erro interno no servidor' });
});
