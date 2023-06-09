import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";

async function getProductsSold(
  beginDate: string,
  endDate: string
): Promise<string> {
  const sql = `
    SELECT productsAndQuantity
    FROM orders
    WHERE dateOfPurchase BETWEEN ? AND ?
    `;
  const productsSold = await dal.execute(sql, [beginDate, endDate]);
  return productsSold;
}

export default {
  getProductsSold,
};
