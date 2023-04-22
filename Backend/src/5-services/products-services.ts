import { OkPacket } from "mysql";
import ProductModel from "../2-models/product-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";

async function getAllProducts(): Promise<ProductModel[]> {
  const sql = `SELECT * FROM products`;
  const products = await dal.execute(sql);
  return products;
}

async function getOneProduct(productCode: string): Promise<ProductModel> {
  const sql = `SELECT * FROM products WHERE productCode = ?`;
  const product = await dal.execute(sql, [productCode]);
  return product;
}

async function addProduct(product: ProductModel): Promise<ProductModel> {
  // Do Validation

  // Check if exists
  const sqlCheck = `SELECT * FROM products WHERE productCode = ?`;
  const rows = await dal.execute(sqlCheck, [product.productCode]);
  if (rows.length > 0) {
    return rows[0];
  } else {
    // Handle Image1
    let imageName1 = null;
    if (product.image1) {
      imageName1 = await imageHandler.saveImage(product.image1);
      product.image1Url = appConfig.imagesUrl + imageName1;
    }

    // Handle Image2
    let imageName2 = null;
    if (product.image2) {
      imageName2 = await imageHandler.saveImage(product.image2);
      product.image2Url = appConfig.imagesUrl + imageName2;
    }
    // Create product
    const sql = `INSERT INTO products VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [
      product.categoryId,
      product.name,
      product.description,
      product.price,
      imageName1,
      imageName2,
      product.salePrice,
      product.saleStartDate,
      product.saleEndDate,
      product.productCode,
    ]);
    product.id = result.insertId;

    delete product.image1;
    delete product.image2;

    return product;
  }
}

async function updateProduct(product: ProductModel): Promise<ProductModel> {
  // Do Validation!

  let images = await getProductImageName(product.productCode);
  if (product.image1) {
    images[0] = await imageHandler.updateImage(product.image1, images[0]);
  }
  if (product.image2) {
    images[1] = await imageHandler.updateImage(product.image2, images[1]);
  }
  product.image1Url = appConfig.imagesUrl + images[0];
  product.image2Url = appConfig.imagesUrl + images[1];

  const sql = `UPDATE products SET 
   categoryId = ?,
   name = ?,
   description = ?,
   price = ?,
   image1 = ?,
   image2 = ?,
   salePrice = ?,
   saleStartDate = ?,
   saleEndDate = ?
   WHERE productCode = ?
  `;
  const result: OkPacket = await dal.execute(sql, [
    product.categoryId,
    product.name,
    product.description,
    product.price,
    images[0],
    images[1],
    product.salePrice,
    product.saleStartDate,
    product.saleEndDate,
    product.productCode,
  ]);
  if (result.affectedRows === 0)
    throw new ResourceNotFoundError(product.productCode);

  delete product.image1;
  delete product.image2;
  return product;
}

async function deleteProduct(productCode: string): Promise<void> {
  let images = await getProductImageName(productCode);
  const sql = `DELETE FROM products WHERE productCode = ?`;
  const result: OkPacket = await dal.execute(sql, [productCode]);
  if (result.affectedRows === 0) throw new ResourceNotFoundError(productCode);
  await imageHandler.deleteImage(images[0]);
  await imageHandler.deleteImage(images[1]);
}

async function getProductImageName(productCode: string): Promise<any> {
  const sql = `SELECT image1, image2 FROM products WHERE productCode = ? `;
  const products = await dal.execute(sql, [productCode]);
  const product = products[0];

  if (!product) return null;

  const image1 = product.image1;
  const image2 = product.image2;
  const images = [image1, image2];
  return images;
}

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
