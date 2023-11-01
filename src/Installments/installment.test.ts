import { InstallmentService } from './service';
import { InstallmentErrors } from './error';
import { ApplicationErrorConstructor } from '../DefaultErrors';
describe('InstallmentService', () => {
  it.skip('deve calcular as parcelas corretamente', () => {
    const service = new InstallmentService();
    service.installment = 2;
    service.value = 100;
    service.interestRate = 5;

    const result = service.returnObject;

    expect(result.installments).toBe(2);
    expect(result.installmentValue).toBe('R$ 53,78');
    expect(result.totalValue).toBe('R$ 107,56');
  });

  it('deve lançar um erro para taxa de juros inválida', () => {
    const service = new InstallmentService();
    service.installment = 2;
    service.value = 100;
    service.interestRate = 0; // Taxa de juros inválida
    let error: any;
    try {
      service.returnObject;
      // Se a exceção não for lançada, o teste falhará
      expect(true).toBe(false);
    } catch (err: any) {
      error = err;
    }

    expect(error).not.toBeNull();

    expect(error.message).toBe('A taxa de juros é inválida, verifique a categoria');
  });

  it('deve lançar um erro para valor inválido', () => {
    const service = new InstallmentService();
    service.installment = 2;
    service.value = 0; // Valor inválido
    service.interestRate = 3;
    let error: any;
    try {
      service.returnObject;
      // Se a exceção não for lançada, o teste falhará
      expect(true).toBe(false);
    } catch (err: any) {
      error = err;
    }

    expect(error).not.toBeNull();

    expect(error.message).toBe('O valor é inválido, ele deve ser um número e maior que 1');
  });

  it('deve lançar um erro para parcelas inválidas', () => {
    const service = new InstallmentService();
    service.installment = 1; // Parcelas inválidas;
    service.value = 3;
    service.interestRate = 3;
    let error: any;
    try {
      service.returnObject;
      // Se a exceção não for lançada, o teste falhará
      expect(true).toBe(false);
    } catch (err: any) {
      error = err;
    }

    expect(error).not.toBeNull();

    expect(error.message).toBe('A parcela é inválida, ela deve ser um número e maior que 1');
  });
});
