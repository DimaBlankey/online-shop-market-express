import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import ReviewModel from "../2-models/review-model";

async function getReviewsByUser(userId: number): Promise<ReviewModel[]> {
  const sql = `SELECT reviews.*,
  products.name,
  products.productCode
  FROM reviews
  JOIN products ON products.id = reviews.productId
  WHERE userId = ?`;

  const reviews = await dal.execute(sql, [userId]);

  return reviews;
}

export default {
  getReviewsByUser,
};
