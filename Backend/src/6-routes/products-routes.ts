import express, { Request, Response, NextFunction } from "express";
import productsServices from "../5-services/products-services";
import verifyAdmin from "../3-middleware/verify-admin";
import ProductModel from "../2-models/product-model";
import imageHandler from "../4-utils/image-handler";

const router = express.Router();

router.get(
  "/products/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productsServices.getAllProducts();
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/products/:productCode",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productCode = request.params.productCode;
      const products = await productsServices.getOneProduct(productCode);
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/products",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image1 = request.files?.image1;
      request.body.image2 = request.files?.image2;
      const product = new ProductModel(request.body);
      const addedProduct = await productsServices.addProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/products/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const imagePath = imageHandler.getImagePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  "/products/:productCode",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.productCode = request.params.productCode;
      request.body.image1 = request.files?.image1;
      request.body.image2 = request.files?.image2;
      const product = new ProductModel(request.body);
      const updatedProduct = await productsServices.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/products/:productCode",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productCode = request.params.productCode;
      await productsServices.deleteProduct(productCode);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
