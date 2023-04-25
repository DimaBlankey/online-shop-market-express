import express, { Request, Response, NextFunction } from "express";
import productsServices from "../5-services/products-services";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import CartDetailsModel from "../2-models/cart-details-model";
import cartServices from "../5-services/cart-services";

const router = express.Router();

router.post(
    "/cart",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const cartDetails = new CartDetailsModel(request.body);
        const addedCartDetails = await cartServices.addItemsToCartDetails(cartDetails);
        response.status(201).json(addedCartDetails);
      } catch (err: any) {
        next(err);
      }
    }
  );

export default router;