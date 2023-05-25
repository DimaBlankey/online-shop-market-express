class ReviewModel {
  id: number;
  productId: number;
  rating: number;
  review: string;
  userId: number;
  date: string;
  // extended
  productCode: string;
  name: string;
  firstName: string
}

export default ReviewModel;
