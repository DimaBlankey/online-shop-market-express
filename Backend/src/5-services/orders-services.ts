import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { ResourceNotFoundError } from "../2-models/client-errors";
import logger from "../4-utils/logger";
import OrderModel from "../2-models/order-model";
import cartServices from "./cart-services";

async function addOrder(order: OrderModel): Promise<[OrderModel, number]> {
 
  //  Validation
  order.validateOrderPost();

  const sqlCheck = `SELECT * FROM orders WHERE cartId = ?`;
  const rows = await dal.execute(sqlCheck, [order.cartId]);
  if (rows.length > 0) {
    return rows[0];
  }

  const dateOfPurchase = new Date();

  const sql = `INSERT INTO orders VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  const result: OkPacket = await dal.execute(sql, [
    order.userId,
    order.cartId,
    order.totalPrice,
    order.city,
    order.address,
    order.dateOfDelivery,
    dateOfPurchase,
    order.creditCardNum,
    order.productsAndQuantity,
  ]);
  order.id = result.insertId;

  const newCartId = await clearCartAndCreateNew(order.cartId);

  logger.logActivity("User " + order.userId + " has placed an order");

  return [order, newCartId];
}

async function clearCartAndCreateNew(cartId: number): Promise<number> {
  const sql = `DELETE FROM cart_details WHERE cartId = ?`;
  await dal.execute(sql, [cartId]);

  const findUserQuery = `SELECT userId FROM cart WHERE id = ?`;

  const userResult = await dal.execute(findUserQuery, [cartId]);
  if (userResult.length === 0) {
    throw new Error("User not found");
  }
  const userId = userResult[0].userId;

  const deleteCartQuery = `DELETE FROM cart WHERE id = ?`;
  await dal.execute(deleteCartQuery, [cartId]);

  const newCartId = await cartServices.createNewCart(userId);

  return newCartId;
}

async function getOrdersByUser(userId: number): Promise<OrderModel[]> {
  const sql = `SELECT * From orders WHERE userId = ?`;
  const orders = await dal.execute(sql, [userId]);
  return orders;
}

export default {
  addOrder,
  getOrdersByUser,
};
