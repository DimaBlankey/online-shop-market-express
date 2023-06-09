import express, { Request, Response, NextFunction } from "express";
import orderServices from "../5-services/orders-services";
import verifyAdmin from "../3-middleware/verify-admin";
import reportsServices from "../5-services/reports-services";

const router = express.Router();

router.get(
  "/reports/:beginDate/:endDate",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const beginDate = request.params.beginDate;
      const endDate = request.params.endDate;
      const productsSold = await reportsServices.getProductsSold(
        beginDate,
        endDate
      );
      response.json(productsSold);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
