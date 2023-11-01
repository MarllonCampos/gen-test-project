import DefaultErrors, { ApplicationErrorConstructor } from '../DefaultErrors';

export class InstallmentErrors extends DefaultErrors {
  constructor({ message, errors = [], status = 400 }: ApplicationErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, InstallmentErrors.prototype);
  }

  static ErrorWhileTryingToProcessInstallments(): InstallmentErrors {
    return new InstallmentErrors({ message: 'Ops! Algo ocorreu do nosso lado, entre em contato via SAC', status: 500 });
  }
  static InterestMustBeANumberAndGreaterThanOne(): InstallmentErrors {
    return new InstallmentErrors({ message: 'A taxa de juros é inválida, verifique a categoria', status: 500 });
  }
  static InstallmentMustBeANumberAndGreaterThanOne(): InstallmentErrors {
    return new InstallmentErrors({
      message: 'A parcela é inválida, ela deve ser um número e maior que 1',
      status: 400,
    });
  }
  static ValueMustBeANumberAndGreaterThanOne(): InstallmentErrors {
    return new InstallmentErrors({
      message: 'O valor é inválido, ele deve ser um número e maior que 1',
      status: 400,
    });
  }
}
