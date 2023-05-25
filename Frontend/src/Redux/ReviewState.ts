import { createStore } from "redux";
import ReviewModel from "../Models/ReviewModel";

export class ReviewState {
  public reviews: ReviewModel[] = [];
  public productId: number | null = null;

}

export enum ReviewsActionType {
  FetchReviews,
  AddReviews,
  ClearState,
}

export interface ReviewsAction {
  type: ReviewsActionType;
  payload: any;
}

export function reviewsReducer(
  currentState = new ReviewState(),
  action: ReviewsAction
): ReviewState {
  const newState = { ...currentState };
  newState.reviews = [...currentState.reviews];
  let itemIndex: number;
  
  switch (action.type) {
    case ReviewsActionType.FetchReviews:
      newState.reviews = action.payload.reviews;
      newState.productId = action.payload.productId;
      break;
    case ReviewsActionType.AddReviews:
      itemIndex = newState.reviews.findIndex((r) => r.id === action.payload.id);
      newState.reviews.push(action.payload);
      break;
  }
  return newState;
}

export const reviewStore = createStore(reviewsReducer);
