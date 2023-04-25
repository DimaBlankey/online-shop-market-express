import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { ResourceNotFoundError } from "../2-models/client-errors";
import logger from "../4-utils/logger";
import CartDetailsModel from "../2-models/cart-details-model";

async function createNewCart(userId: number): Promise<number> {
  // Do Validation
  const sqlCheck = `SELECT * FROM cart WHERE userId = ?`;
  const rows = await dal.execute(sqlCheck, [userId]);
  if (rows.length > 0) {
    return;
  } else {
    const date = new Date();
    const sql = `INSERT INTO cart VALUES(DEFAULT, ? ,?)`;
    const result: OkPacket = await dal.execute(sql, [userId, date]);
    const cartId = result.insertId;
    return cartId;
  }
}

async function getCartIdByUser(userId: number): Promise<number> {
  const sql = `SELECT id FROM cart WHERE userId =?`;
  const result = await dal.execute(sql, [userId]);
  const cartId = result[0].id;
  return cartId;
}

async function addItemsToCartDetails(
  cartDetails: CartDetailsModel
): Promise<void> {
  const sql = `INSERT INTO cart_details VALUES(DEFAULT, ?, ?, ?, ?)`;
  const result: OkPacket = await dal.execute(sql, [
    cartDetails.productId,
    cartDetails.quantity,
    cartDetails.totalPrice,
    cartDetails.cartId,
  ]);
  cartDetails.id = result.insertId;
}

export default {
  createNewCart,
  addItemsToCartDetails,
  getCartIdByUser,
};
