import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { ResourceNotFoundError } from "../2-models/client-errors";
import logger from "../4-utils/logger";
import OrderModel from "../2-models/order-model";

async function addOrder(order: OrderModel): Promise<OrderModel> {
  // Do Validation

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

  logger.logActivity("User " + order.userId + "has placed an order")
 
  return order;
}

export default {
  addOrder,
};
