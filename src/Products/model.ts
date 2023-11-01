import * as yup from 'yup';

export interface ProductsInterface {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  idCategoria: number;
}

export const productsFields = ['nome', 'descricao', 'valor', 'idCategoria'];

export interface ProductsInputInterface extends Partial<Omit<ProductsInterface, 'id'>> {}

export class ProductsModel {
  private _products: any;

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  private createProductsSchema = yup.object().shape({
    nome: yup
      .string()
      .required('O campo de nome [nome] deve ter no mínimo 3 caracteres')
      .min(3, 'O campo de nome [nome] deve ter no mínimo 3 caracteres'),
    descricao: yup
      .string()
      .required('O campo de nome [descricao] deve ter no mínimo 3 caracteres')
      .min(3, 'O campo de nome [descricao] deve ter no mínimo 3 caracteres'),
    valor: yup
      .number()
      .moreThan(0)
      .required('O campo de nome [valor] não deve ser nulo')
      .min(1, 'O campo de nome [valor] deve ser no minimo 1'),
    idCategoria: yup
      .number()
      .required('O campo de nome [categoria] não deve ser nulo')
      .min(1, 'O campo de nome [categoria] deve ser no minimo 1'),
  });

  private viewProductsSchema = yup.object().shape({
    nome: yup.string(),
    descricao: yup.string(),
    id: yup.number(),
    valor: yup.number(),
    idCategoria: yup.number(),
  });

  private updateProductsSchema = yup
    .object()
    .shape({
      nome: yup.string(),
      descricao: yup.string(),
      valor: yup.number(),
      idCategoria: yup.number(),
    })
    .noUnknown(`O corpo deve conter apenas os campos a seguir: [${productsFields.join(', ')}]`);

  constructor(products: any) {
    this._products = products;
  }

  public set products(value: any) {
    this._products = value;
  }

  create = () => {
    const validateNewProducts = this.createProductsSchema.validateSync(this._products, this._defaultYupOptions);

    return validateNewProducts;
  };

  view = () => {
    const castedProducts = this.viewProductsSchema.cast(this._products, {
      stripUnknown: true,
    });

    return castedProducts;
  };

  update = () => {
    const validateUpdatedProducts = this.updateProductsSchema.validateSync(this._products, {
      ...this._defaultYupOptions,
      stripUnknown: false,
    });

    return validateUpdatedProducts;
  };
}
