import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import categoryServices from "../5-services/category-services";

const router = express.Router();

router.get(
  "/categories/",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await categoryServices.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
