import { ValidationError } from "./client-errors";
import Joi from "joi";

class PromotionModel {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  percentageDiscount: number;
  amountDiscount: number;
  finalPriceDiscount: number;
  products: JSON;
  isActive: boolean;

  public constructor(promotion: PromotionModel) {
    this.id = promotion.id;
    this.name = promotion.name;
    this.startDate = promotion.startDate;
    this.endDate = promotion.endDate;
    this.percentageDiscount = promotion.percentageDiscount;
    this.amountDiscount = promotion.amountDiscount;
    this.finalPriceDiscount = promotion.finalPriceDiscount;
    this.products = promotion.products;
    this.isActive = promotion.isActive;
  }
  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden().positive().integer(),
    name: Joi.string().required().min(2).max(50),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    percentageDiscount: Joi.number().allow(null).optional(),
    amountDiscount: Joi.number().allow(null).optional(),
    finalPriceDiscount: Joi.number().allow(null).optional(),
    products: Joi.string()
      .custom((value, helpers) => {
        try {
          JSON.parse(value);
        } catch (err) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "JSON Validation")
      .required(),
    isActive: Joi.forbidden(),
  });

  public validatePromotionPost(): void {
    const result = PromotionModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default PromotionModel;
