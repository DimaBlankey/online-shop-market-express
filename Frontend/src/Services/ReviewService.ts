import axios from "axios";
import appConfig from "../Utils/AppConfig";
import ReviewModel from "../Models/ReviewModel";

class ReviewService {
  public async getReviewsByUser(userId: number): Promise<ReviewModel[]> {
    const response = await axios.get<ReviewModel[]>(
      appConfig.reviewsUrl + userId
    );
    const reviews = response.data;
    return reviews;
  }
}

const reviewService = new ReviewService();

export default reviewService;
