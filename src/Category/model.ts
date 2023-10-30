import * as yup from 'yup';

export interface CategoryInterface {
  id?: number;
  nome: string;
}

export interface CategoryInputInterface {
  nome: string;
}
export class CategoryModel {
  private _category: any;

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  private createCategorySchema = yup.object().shape({
    nome: yup
      .string()
      .min(3, 'O campo de nome [nome] deve ter no mínimo 3 caracteres')
      .required('O campo de nome [nome] deve ter no mínimo 3 caracteres'),
  });

  private viewCategorySchema = yup.object().shape({
    nome: yup.string(),
    id: yup.number(),
  });

  constructor(category: any) {
    this._category = category;
  }

  public set category(value: any) {
    this._category = value;
  }

  create = () => {
    const validateNewCategory = this.createCategorySchema.validateSync(this._category, this._defaultYupOptions);

    return validateNewCategory;
  };

  view = () => {
    const castedCategory = this.viewCategorySchema.cast(this._category, {
      stripUnknown: true,
    });

    return castedCategory;
  };

  update = () => {
    const validateUpdatedCategory = this.createCategorySchema.validateSync(this._category, this._defaultYupOptions);

    return validateUpdatedCategory;
  };
}
