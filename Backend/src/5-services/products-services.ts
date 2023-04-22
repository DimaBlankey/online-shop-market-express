import { OkPacket } from "mysql";
import ProductModel from "../2-models/product-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";

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
      product.image1Url = appConfig.imagesUrl + imageName2;
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

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
};
