import express, { Request, Response, NextFunction } from "express";
import productsServices from "../5-services/products-services";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import OrderModel from "../2-models/order-model";
import orderServices from "../5-services/orders-services";

const router = express.Router();

router.post(
  "/orders",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      const addedOrder = await orderServices.addOrder(order);
      response.status(201).json(addedOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/orders/:userId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId
      const orders = await orderServices.getOrdersByUser(userId);
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }
);





export default router;
