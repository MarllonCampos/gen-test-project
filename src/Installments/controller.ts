import DefaultErrors from '../DefaultErrors';
import { NextFunction, Request, Response } from 'express';
import { ProductsService } from '../Products/service';
import { CategoryErrors } from '../Category/error';
import { ProductsErrors } from '../Products/error';
import { CategoryService } from '../Category/service';
import { InstallmentsModel } from './model';
import { InstallmentService } from './service';

export class InstallmentController {
  private productService: ProductsService;
  private categoryService: CategoryService;
  private service: InstallmentService;
  constructor() {
    this.service = new InstallmentService();
    this.productService = new ProductsService();
    this.categoryService = new CategoryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: productId } = req.params;
      const formattedId = Number(productId);

      if (isNaN(formattedId)) throw DefaultErrors.IdMustBeANumber();

      const product = await this.productService.show(formattedId);
      if (!product) throw ProductsErrors.ProductsNotFound();

      const category = await this.categoryService.show(product.idCategoria);
      if (!category) throw CategoryErrors.CategoryNotFound();
      const queryParams = req.query;

      const installmentModel = new InstallmentsModel(queryParams);
      this.service.installment = installmentModel.parcelas;
      this.service.interestRate = category.juros;
      this.service.value = product.valor;
      return res.status(200).send({ message: 'Previsão realizada com sucesso', data: this.service.returnObject });
    } catch (error) {
      next(error);
    }
  };
}
