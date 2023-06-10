import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import promotionServices from "../5-services/promotion-services";


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

export default router;
