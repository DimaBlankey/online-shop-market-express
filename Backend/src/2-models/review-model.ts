class ReviewModel {
  id: number;
  productId: number;
  rating: number;
  review: string;
  userId: number;
  date: string;

  public constructor(review: ReviewModel) {
    this.id = review.id;
    this.productId = review.productId;
    this.rating = review.rating;
    this.review = review.review;
    this.userId = review.userId;
    this.date = review.date;
  }

  // Do Validation!
}

export default ReviewModel;
