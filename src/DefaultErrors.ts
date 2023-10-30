export interface ErrorConstructor {
  message: string;
  errors?: string[];
  status?: number;
}

export default class DefaultErrors extends Error {
  errors: string[] = [];
  status: number = 400;

  constructor({ message, errors = [], status = 400 }: ErrorConstructor) {
    super(message);
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, DefaultErrors.prototype);
  }

  static IdMustBeANumber(): DefaultErrors {
    return new DefaultErrors({ message: 'O parametro da rota deve ser um número inteiro' });
  }
}
