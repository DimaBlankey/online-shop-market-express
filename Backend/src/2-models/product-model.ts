import { UploadedFile } from "express-fileupload";
import { ValidationError } from "./client-errors";
import Joi from "joi";

class ProductModel {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  image1: UploadedFile;
  image1Url: string;
  image2: UploadedFile;
  image2Url: string;
  salePrice: number;
  saleStartDate: string;
  saleEndDate: string;
  productCode: string;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.categoryId = product.categoryId;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.image1 = product.image1;
    this.image1Url = product.image1Url;
    this.image2 = product.image2;
    this.image2Url = product.image2Url;
    this.salePrice = product.salePrice;
    this.saleStartDate = product.saleStartDate;
    this.saleEndDate = product.saleEndDate;
    this.productCode = product.productCode;
  }

  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden().positive().integer(),
    categoryId: Joi.number().required().positive().integer(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(250),
    price: Joi.number().required().positive(),
    image1: Joi.optional(),
    image1Url: Joi.optional(),
    image2: Joi.optional(),
    image2Url: Joi.optional(),
    salePrice: Joi.forbidden(),
    saleStartDate: Joi.forbidden(),
    saleEndDate: Joi.forbidden(),
    productCode: Joi.string().required(),
  });

  private static putValidationSchema = Joi.object({
    id: Joi.number().required().positive().integer(),
    categoryId: Joi.number().required().positive().integer(),
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(250),
    price: Joi.number().required().positive(),
    image1: Joi.optional(),
    image1Url: Joi.optional(),
    image2: Joi.optional(),
    image2Url: Joi.optional(),
    salePrice: Joi.forbidden(),
    saleStartDate: Joi.forbidden(),
    saleEndDate: Joi.forbidden(),
    productCode: Joi.string().required(),
  });

  public validateProductPost(): void {
    const result = ProductModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateProductPut(): void {
    const result = ProductModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default ProductModel;
