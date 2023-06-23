import { ValidationError } from "./client-errors";
import Joi from "joi";

class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idCardNumber: number;
  city: string;
  address: string;
  roleId: number;
  password: string;
  cartId: number

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.idCardNumber = user.idCardNumber;
    this.city = user.city;
    this.address = user.address;
    this.roleId = user.roleId;
    this.password = user.password
    this.cartId = user.cartId
  }
  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden().positive().integer(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    idCardNumber: Joi.number().integer(),
    city: Joi.required(),
    address: Joi.required(),
    password: Joi.string()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./?]{8,30}$")
      )
      .required()
      .messages({
        "string.pattern.base": "Password must be between 8 and 30 characters",
      }),
      roleId: Joi.string().optional(),
      cartId: Joi.forbidden()
  });

  private static putValidationSchema = Joi.object({
    id: Joi.number().optional().positive().integer(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    idCardNumber: Joi.number().integer(),
    city: Joi.required(),
    address: Joi.required(),
    password: Joi.string().forbidden(),
      roleId: Joi.string().forbidden(),
      cartId: Joi.forbidden()
  });


  public validateUserPost(): void {
    const result = UserModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUserPut(): void {
    const result = UserModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

}

export default UserModel;
