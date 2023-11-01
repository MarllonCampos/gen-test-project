import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { InstallmentErrors } from './error';

interface InstallmentInterface {
  value: number;
  installment: number;
  interestRate: number;
}

export class InstallmentService {
  private _value: number;
  private _installment: number;
  private _interestRate: number;
  private _monthlyValue: number;

  private currencyFormat = {
    style: 'currency',
    currency: 'BRL',
  };

  public set installment(installment: number) {
    this._installment = installment;
  }
  public set interestRate(interestRate: number) {
    this._interestRate = interestRate;
  }
  public set value(value: number) {
    this._value = value;
  }

  private monthlyInstallmentValue = () => {
    if (isNaN(this._interestRate) || this._interestRate <= 0)
      throw InstallmentErrors.InterestMustBeANumberAndGreaterThanOne();

    if (isNaN(this._installment) || this._installment <= 1)
      throw InstallmentErrors.InstallmentMustBeANumberAndGreaterThanOne();

    if (isNaN(this._value) || this._value <= 0) throw InstallmentErrors.ValueMustBeANumberAndGreaterThanOne();

    const interestRatePorcentage = this._interestRate / 100;
    const monthlyValue =
      (this._value * interestRatePorcentage) / (1 - Math.pow(1 + interestRatePorcentage, -this._installment));

    if (isNaN(monthlyValue)) throw InstallmentErrors.ErrorWhileTryingToProcessInstallments();
    this._monthlyValue = monthlyValue;
    const monthlyValueFixed = monthlyValue.toFixed(2);
    const monthlyInstallmentValue = Number(monthlyValueFixed).toLocaleString('pt-br', {
      ...this.currencyFormat,
    });

    return monthlyInstallmentValue;
  };

  private totalValue = () => {
    const totalValue = this._monthlyValue * this._installment;

    return Number(totalValue.toFixed(2)).toLocaleString('pt-br', { ...this.currencyFormat });
  };

  public get returnObject() {
    return {
      installments: this._installment,
      installmentValue: this.monthlyInstallmentValue(),
      totalValue: this.totalValue(),
    };
  }
}
