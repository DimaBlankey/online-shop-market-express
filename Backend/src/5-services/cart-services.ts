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
): Promise<CartDetailsModel> {
  
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
  return cartDetails;
}

async function removeItemsFromCartDetails(
  cartDetails: CartDetailsModel
): Promise<CartDetailsModel> {
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
    // return cartDetails
  } else {
    // If the productId does not exist, do nothing
    console.log("Item not found in cart_details");
    // return cartDetails
  }
  return cartDetails;
}

async function removeWholeItemFromCart(
  cartDetails: CartDetailsModel
): Promise<CartDetailsModel> {
  // Check if the productId exists in the cart_details
  const checkSql = `SELECT id, quantity, totalPrice FROM cart_details WHERE productId = ? AND cartId = ?`;
  const checkResult = await dal.execute(checkSql, [
    cartDetails.productId,
    cartDetails.cartId,
  ]);
  if (checkResult && checkResult.length > 0) {
    const existingItem = checkResult[0];
    const deleteSql = `DELETE FROM cart_details WHERE id = ?`;
    await dal.execute(deleteSql, [existingItem.id]);
  }
  return cartDetails
}

async function getCartItemsByUser(cartId: number): Promise<CartDetailsModel[]> {
  const sql = `SELECT 
    cart_details.productId, 
    cart_details.quantity, 
    cart_details.totalPrice, 
    products.name AS productName,
    products.productCode, 
    products.price, 
    products.salePrice, 
    products.image1,
    CONCAT('${appConfig.imagesUrl}', products.image1) AS image1Url
    FROM 
    cart_details
    JOIN 
    products ON cart_details.productId = products.id
    WHERE 
    cart_details.cartId = ?;`;
  const cartDetails = await dal.execute(sql, [cartId]);
  return cartDetails;
}

async function insertCartDetailsFromStorage(
  cartDetails: any[],
  userIdCardNumber: number
): Promise<boolean> {
  // Find the user ID by searching the idCardNumber
  const findUserQuery = `
    SELECT id
    FROM users
    WHERE idCardNumber = ?;
  `;

  const userResult = await dal.execute(findUserQuery, [userIdCardNumber]);
  if (userResult.length === 0) {
    throw new Error("User not found");
  }
  const userId = userResult[0].id;

  // Find the cart ID by searching the userId
  const findCartQuery = `
    SELECT id
    FROM cart
    WHERE userId = ?;
  `;

  const cartResult = await dal.execute(findCartQuery, [userId]);
  if (cartResult.length === 0) {
    throw new Error("Cart not found");
  }
  const cartId = cartResult[0].id;

  // Insert each cartDetails object into the cart_details table
  const insertCartDetailsQuery = `
    INSERT INTO cart_details (productId, quantity, totalPrice, cartId)
    VALUES (?, ?, ?, ?);
  `;

  for (const detail of cartDetails) {
    const { productId, quantity, totalPrice } = detail;
    await dal.execute(insertCartDetailsQuery, [
      productId,
      quantity,
      totalPrice,
      cartId,
    ]);
  }

  return true;
}

async function logToCart(
  cartDetails: any[],
  userEmail: string
): Promise<boolean> {
  if (cartDetails.length === 0) {
    return false;
  }
  const findUserQuery = `
    SELECT id
    FROM users
    WHERE email = ?;
  `;
  const userResult = await dal.execute(findUserQuery, [userEmail]);
  if (userResult.length === 0) {
    throw new Error("User not found");
  }
  const userId = userResult[0].id;

  const findCartQuery = `
    SELECT id
    FROM cart
    WHERE userId = ?;
  `;
  const cartResult = await dal.execute(findCartQuery, [userId]);
  if (cartResult.length === 0) {
    throw new Error("Cart not found");
  }
  const cartId = cartResult[0].id;

  const deleteCartDetailsQuery = `
    DELETE FROM cart_details
    WHERE cartId = ?;
  `;
  await dal.execute(deleteCartDetailsQuery, [cartId]);

  // Insert each cartDetails object into the cart_details table
  const insertCartDetailsQuery = `
    INSERT INTO cart_details (productId, quantity, totalPrice, cartId)
    VALUES (?, ?, ?, ?);
  `;

  for (const detail of cartDetails) {
    const { productId, quantity, totalPrice } = detail;
    await dal.execute(insertCartDetailsQuery, [
      productId,
      quantity,
      totalPrice,
      cartId,
    ]);
  }

  return true;
}

export default {
  createNewCart,
  addItemsToCartDetails,
  getCartIdByUser,
  removeItemsFromCartDetails,
  getCartItemsByUser,
  insertCartDetailsFromStorage,
  logToCart,
  removeWholeItemFromCart
};
