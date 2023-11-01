import * as yup from 'yup';

export interface InstallmentsInterface {
  parcelas: number;
}

export class InstallmentsModel {
  private _installments: any;

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  private installmentSchema = yup.object().shape({
    parcelas: yup
      .number()
      .required('O campo de nome [parcelas] é obrigatório')
      .min(2, 'A quantidade mínima de parcelas é 2'),
  });

  public get parcelas(): number {
    return this._installments.parcelas;
  }

  constructor(installments: any) {
    const validateInstallment = this.installmentSchema.validateSync(installments, this._defaultYupOptions);
    this._installments = validateInstallment;
  }
}
