import { NextFunction, Request, Response } from 'express';
import { CategoryService } from './service';

export class CategoryController {
  private service: CategoryService;
  constructor() {
    this.service = new CategoryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await this.service.index();

    return res.status(200).send(categories);
  };
}
