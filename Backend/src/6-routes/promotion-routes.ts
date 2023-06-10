import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import promotionServices from "../5-services/promotion-services";
import PromotionModel from "../2-models/promotion-model";

const router = express.Router();

router.get(
  "/promotions/",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const promotions = await promotionServices.getAllPromotions();
      response.json(promotions);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/promotions",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const promotion = new PromotionModel(request.body);
      const addedPromotion = await promotionServices.addPromotion(promotion);
      response.status(201).json(addedPromotion);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  "/promotions/:id",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      const promotion = new PromotionModel(request.body);
      const updatedPromotion = await promotionServices.promotionStatus(promotion);
      response.json(updatedPromotion);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/promotions/:id",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await promotionServices.deletePromotion(id)
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);




export default router;
