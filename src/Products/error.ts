import DefaultErrors, { ApplicationErrorConstructor } from '../DefaultErrors';
import { productsFields } from './model';

export class ProductsErrors extends DefaultErrors {
  constructor({ message, errors = [], status = 400 }: ApplicationErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, ProductsErrors.prototype);
  }

  static ProductsNotFound(): ProductsErrors {
    return new ProductsErrors({ message: 'O produto informado não foi encontrada', status: 404 });
  }

  static ProductsMustContainsAtLeastOneField(): ProductsErrors {
    return new ProductsErrors({
      message: `O corpo deve conter pelo menos um dos campos a seguir: [${productsFields.join(', ')}]`,
    });
  }
}
