import axios from "axios";
import appConfig from "../Utils/AppConfig";
import ReviewModel from "../Models/ReviewModel";
import { ReviewsActionType, reviewStore } from "../Redux/ReviewState";

class ReviewService {
  public async getReviewsByUser(userId: number): Promise<ReviewModel[]> {
    const response = await axios.get<ReviewModel[]>(
      appConfig.reviewsUrl + userId
    );
    const reviews = response.data;
    return reviews;
  }

  public async getReviewsByProduct(productId: number): Promise<ReviewModel[]> {
    let reviewState = reviewStore.getState();

    if (reviewState.productId !== productId) {
      const response = await axios.get<ReviewModel[]>(
        appConfig.reviewsByProductUrl + productId
      );
      let reviews = response.data;
      reviewStore.dispatch({
        type: ReviewsActionType.FetchReviews,
        payload: { reviews, productId },
      });
    }
    return reviewStore.getState().reviews;
  }

  public async addProductReview(review: ReviewModel): Promise<void> {
    const response = await axios.post<ReviewModel>(
      appConfig.reviewsUrl,
      review
    );
    const addedReview = response.data;
    reviewStore.dispatch({
      type: ReviewsActionType.AddReviews,
      payload: addedReview,
    });
  }
}

const reviewService = new ReviewService();

export default reviewService;
