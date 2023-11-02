import DefaultErrors from '../DefaultErrors';
import { NextFunction, Request, Response } from 'express';
import { ProductsService } from './service';
import { ProductsModel, productsFields } from './model';
import { ProductsErrors } from './error';
import { CategoryService } from '../Category/service';
import { CategoryErrors } from '../Category/error';

export class ProductsController {
  private service: ProductsService;
  private categoryService: CategoryService;
  constructor() {
    this.service = new ProductsService();
    this.categoryService = new CategoryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.service.index();
      const existingProductsReturn = { message: 'Produtos encontrados com sucesso', data: products };

      const nonExistingProducts = { message: 'Ainda não existem produtos cadastrados' };

      const returnObject = products.length > 0 ? existingProductsReturn : nonExistingProducts;

      return res.status(200).send(returnObject);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const Products = await this.service.show(Number(id));
      if (!Products) throw ProductsErrors.ProductsNotFound();

      return res.status(200).json({ message: 'Produto encontrado com sucesso', data: Products });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProducts = req.body;
      const productsModel = new ProductsModel(newProducts);

      const normalizedProducts = productsModel.create();
      const { idCategoria } = normalizedProducts;

      const categoryExists = await this.categoryService.show(idCategoria);
      if (!categoryExists) throw CategoryErrors.CategoryNotFound();

      const createdProducts = await this.service.create(normalizedProducts);

      productsModel.products = createdProducts;

      const outputProducts = productsModel.view();

      return res.json({ message: 'Produto criado com sucesso', data: outputProducts });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const ProductsExists = await this.service.show(Number(id));
      if (!ProductsExists) throw ProductsErrors.ProductsNotFound();

      const updateProducts = req.body;
      if (Object.keys(updateProducts).length === 0) throw ProductsErrors.NoFieldsToUpdate();

      if (!Object.keys(updateProducts).some((field) => productsFields.includes(field)))
        throw ProductsErrors.ProductsMustContainsAtLeastOneField();

      const productsModel = new ProductsModel(updateProducts);

      const normalizedProducts = productsModel.update();
      const { idCategoria } = normalizedProducts;

      if (idCategoria != undefined) {
        const categoryExists = await this.categoryService.show(idCategoria);
        if (!categoryExists) throw CategoryErrors.CategoryNotFound();
      }

      const updatedProducts = await this.service.update({
        id: formattedId,
        updateProducts: normalizedProducts,
      });

      productsModel.products = updatedProducts;

      const outputProducts = productsModel.view();

      return res.status(200).json({ message: 'Produto atualizado com sucesso', data: outputProducts });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const ProductsExists = await this.service.show(Number(id));
      if (!ProductsExists) throw ProductsErrors.ProductsNotFound();

      await this.service.delete(formattedId);

      return res.status(204).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}
