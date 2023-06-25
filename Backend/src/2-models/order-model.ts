import { ValidationError } from "./client-errors";
import Joi from "joi";

class OrderModel {
  id: number;
  userId: number;
  cartId: number;
  totalPrice: number;
  city: string;
  address: string;
  dateOfDelivery: string;
  dateOfPurchase: string;
  creditCardNum: number;
  productsAndQuantity: JSON;

  public constructor(order: OrderModel) {
    this.id = order.id;
    this.userId = order.userId;
    this.cartId = order.cartId;
    this.totalPrice = order.totalPrice;
    this.city = order.city;
    this.address = order.address;
    this.dateOfDelivery = order.dateOfDelivery;
    this.dateOfPurchase = order.dateOfPurchase;
    this.creditCardNum = order.creditCardNum;
    this.productsAndQuantity = order.productsAndQuantity;
  }
  private static postValidationSchema = Joi.object({
    id: Joi.number().optional(),
    userId: Joi.number().required().positive().integer(),
    cartId: Joi.number().required().positive().integer(),
    totalPrice: Joi.number().required().positive(),
    city: Joi.string().required().max(50),
    address: Joi.string().required().max(100),
    dateOfDelivery: Joi.date().required(),
    dateOfPurchase: Joi.optional(),
    creditCardNum: Joi.number().required(),
    productsAndQuantity: Joi.string()
      .custom((value, helpers) => {
        try {
          JSON.parse(value);
        } catch (err) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "JSON Validation")
      .required(),
  });

  public validateOrderPost(): void {
    const result = OrderModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default OrderModel;
