import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import ReviewModel from "../2-models/review-model";
import ReviewSummeryModel from "../2-models/review-summery-model";
import { ValidationError } from "../2-models/client-errors";

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

async function getReviewsByProduct(productId: number): Promise<ReviewModel[]> {
  const sql = `SELECT reviews.*,
  users.firstName
  FROM reviews
  JOIN users ON users.id = reviews.userId
  WHERE productId = ?`;

  const reviews = await dal.execute(sql, [productId]);
  return reviews;
}

async function getReviewSummeryByProduct(
  productId: number
): Promise<ReviewSummeryModel> {
  const sql = `SELECT 
  productId,
  ROUND(AVG(rating)*2)/2 AS averageRating,
  COUNT(*) AS reviewCount
  FROM 
  reviews
  WHERE 
  productId = ?
`;
  const reviewsSummery = await dal.execute(sql, [productId]);
  const reviewSummery = reviewsSummery[0];

  return reviewSummery;
}

async function addProductReview(review: ReviewModel): Promise<ReviewModel> {
 
  //  Validation

  review.validateReviewPost();

  // Sql check combination cannot be twice
  
  const sqlCheckCombination = `
  SELECT * FROM reviews WHERE userId = ? AND productId =?
  `
  const rows = await dal.execute(sqlCheckCombination, [
    review.userId,
    review.productId
  ])

  if(rows.length > 0){
    throw new ValidationError("You have already reviewed this item.")
  }

  // Sql check if user bought the item for review

  const findUserOrders =`
  SELECT productsAndQuantity
  FROM orders
  WHERE
  userId = ?
  `
  const orders = await dal.execute(findUserOrders, [review.userId])

  let uniqueIds = new Set();

  for (let order of orders) {
    const productsAndQuantity = JSON.parse(order.productsAndQuantity);
    const ids = productsAndQuantity.map(item => item.id);
    ids.forEach(id => uniqueIds.add(id));
  }
  
  const uniqueIdsArray = Array.from(uniqueIds)

  if(!uniqueIdsArray.includes(review.productId)){
    throw new ValidationError("Only costumers who bought this item can review it")
  }

  // Add Review
  const date = new Date();

  const sql = `INSERT INTO reviews VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await dal.execute(sql, [
    review.productId,
    review.rating,
    review.review,
    review.userId,
    date,
  ]);
  review.id = result.insertId;

  return review;
}

export default {
  getReviewsByUser,
  getReviewsByProduct,
  getReviewSummeryByProduct,
  addProductReview,
};
