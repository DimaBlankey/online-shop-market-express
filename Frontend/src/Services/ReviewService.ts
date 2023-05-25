import axios from "axios";
import appConfig from "../Utils/AppConfig";
import ReviewModel from "../Models/ReviewModel";

class ReviewService {
  public async getReviewsByUser(userId: number): Promise<ReviewModel[]> {
    // add check state
    const response = await axios.get<ReviewModel[]>(
      appConfig.reviewsUrl + userId
    );
    const reviews = response.data;
    return reviews;
  }

  public async getReviewsByProduct(productId: number): Promise<ReviewModel[]> {
    // add check state
    const response = await axios.get<ReviewModel[]>(
      appConfig.reviewsByProductUrl + productId
    );
    const reviews = response.data;
    return reviews;
  }

  public async addProductReview(review: ReviewModel): Promise<void> {
    const response = await axios.post<ReviewModel>(
      appConfig.reviewsUrl,
      review
    );
    const addedReview = response.data;
    // add dispatch to state
  }
}

const reviewService = new ReviewService();

export default reviewService;
