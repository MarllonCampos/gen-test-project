import DefaultErrors, { ApplicationErrorConstructor } from '../DefaultErrors';

export class CategoryErrors extends DefaultErrors {
  constructor({ message, errors = [], status = 400 }: ApplicationErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, CategoryErrors.prototype);
  }

  static CategoryNotFound(): CategoryErrors {
    return new CategoryErrors({ message: 'A categoria informada não foi encontrada', status: 404 });
  }
  static CategoryHasChildrensCantDelete(): CategoryErrors {
    return new CategoryErrors({
      message: 'A categoria informada não pode ser deletada pois existem produtos relacionados a ela',
      status: 400,
    });
  }
}
