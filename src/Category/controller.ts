import DefaultErrors from '../DefaultErrors';
import { NextFunction, Request, Response } from 'express';
import { CategoryService } from './service';
import { CategoryModel } from './model';
import { CategoryErrors } from './error';

export class CategoryController {
  private service: CategoryService;
  constructor() {
    this.service = new CategoryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.index();

      return res.status(200).send({ message: 'Categorias encontradas com sucesso', data: categories });
    } catch (error) {
      console.log(error);
      return res.send(500).json({ message: 'Algo deu errado do nosso lado!' });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const category = await this.service.show(Number(id));
      if (!category) throw CategoryErrors.CategoryNotFound();

      return res.status(200).json({ message: 'Categoria encontrada com sucesso', data: category });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = req.body;
      const categoryModel = new CategoryModel(newCategory);

      const normalizedCategory = categoryModel.create();

      const createdCategory = await this.service.create(normalizedCategory);

      categoryModel.category = createdCategory;

      const outputCategory = categoryModel.view();

      return res.json({ message: 'Categoria criada com sucesso', data: outputCategory });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const categoryExists = await this.service.show(Number(id));
      if (!categoryExists) throw CategoryErrors.CategoryNotFound();

      const category = req.body;
      if (Object.keys(category).length === 0) throw CategoryErrors.NoFieldsToUpdate();

      const categoryModel = new CategoryModel(category);

      const normalizedCategory = categoryModel.update();

      const updatedCategory = await this.service.update({
        id: formattedId,
        updateCategory: normalizedCategory,
      });

      categoryModel.category = updatedCategory;

      const outputCategory = categoryModel.view();

      return res.status(200).json({ message: 'Categoria atualizada com sucesso', data: outputCategory });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const categoryExists = await this.service.show(Number(id));
      if (!categoryExists) throw CategoryErrors.CategoryNotFound();

      await this.service.delete(formattedId);

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
