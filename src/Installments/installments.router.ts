import * as yup from 'yup';
import { Router, Request, NextFunction, Response } from 'express';
import { InstallmentController } from './controller';
import { InstallmentErrors } from './error';

export const InstallmentRouter = Router();
const controller = new InstallmentController();

InstallmentRouter.get('/:id', controller.index);

InstallmentRouter.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof yup.ValidationError) {
    const yupErrors = err.errors;
    return next(InstallmentErrors.ValidationErrors([...yupErrors]));
  }
  next(err);
});
