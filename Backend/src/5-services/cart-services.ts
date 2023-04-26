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
  // Check if the productId already exists in the cart_details
  const checkSql = `SELECT id, quantity, totalPrice FROM cart_details WHERE productId = ? AND cartId = ?`;
  const checkResult = await dal.execute(checkSql, [
    cartDetails.productId,
    cartDetails.cartId,
  ]);

  if (checkResult && checkResult.length > 0) {
    // If the productId exists, update the quantity and totalPrice
    const existingItem = checkResult[0];
    const tempPrice = existingItem.totalPrice / existingItem.quantity;
    const newQuantity = existingItem.quantity + 1;
    const newTotalPrice = newQuantity * tempPrice;
    const updateSql = `UPDATE cart_details SET quantity = ?, totalPrice = ? WHERE id = ?`;
    await dal.execute(updateSql, [newQuantity, newTotalPrice, existingItem.id]);
  } else {
    // If the productId does not exist, insert a new row
    const insertSql = `INSERT INTO cart_details VALUES(DEFAULT, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(insertSql, [
      cartDetails.productId,
      cartDetails.quantity,
      cartDetails.totalPrice,
      cartDetails.cartId,
    ]);
    cartDetails.id = result.insertId;
  }
}

async function removeItemsFromCartDetails(
  cartDetails: CartDetailsModel
): Promise<void> {
  // Check if the productId exists in the cart_details
  const checkSql = `SELECT id, quantity, totalPrice FROM cart_details WHERE productId = ? AND cartId = ?`;
  const checkResult = await dal.execute(checkSql, [
    cartDetails.productId,
    cartDetails.cartId,
  ]);

  if (checkResult && checkResult.length > 0) {
    // If the productId exists, update the quantity and totalPrice or remove the row
    const existingItem = checkResult[0];
    if (existingItem.quantity > 1) {
      const tempPrice = existingItem.totalPrice / existingItem.quantity;
      const newQuantity = existingItem.quantity - 1;
      const newTotalPrice = newQuantity * tempPrice;
      const updateSql = `UPDATE cart_details SET quantity = ?, totalPrice = ? WHERE id = ?`;
      await dal.execute(updateSql, [
        newQuantity,
        newTotalPrice,
        existingItem.id,
      ]);
    } else {
      // If the quantity is 1, remove the entire row
      const deleteSql = `DELETE FROM cart_details WHERE id = ?`;
      await dal.execute(deleteSql, [existingItem.id]);
    }
  } else {
    // If the productId does not exist, do nothing
    console.log("Item not found in cart_details");
  }
}

export default {
  createNewCart,
  addItemsToCartDetails,
  getCartIdByUser,
  removeItemsFromCartDetails,
};
