import { createStore } from "redux";
import PromotionModel from "../Models/PromotionModel";
import id from "date-fns/locale/id/index";

export class PromotionState {
  public promotions: PromotionModel[] = [];
}

export enum PromotionsActionType {
  FetchPromotions,
  AddPromotion,
  UpdatePromotion,
  DeletePromotion,
  ClearState,
}

export interface PromotionAction {
  type: PromotionsActionType;
  payload: any;
}

export function promotionReducer(
  currentState = new PromotionState(),
  action: PromotionAction
): PromotionState {
  const newState = { ...currentState };
  newState.promotions = [...currentState.promotions];
  switch (action.type) {
    case PromotionsActionType.FetchPromotions:
      newState.promotions = action.payload;
      break;
    case PromotionsActionType.AddPromotion:
      const promotionIndex = newState.promotions.findIndex(
        (p) => p.id === action.payload.id
      );
      newState.promotions.push(action.payload);
      break;
      case PromotionsActionType.UpdatePromotion:
        newState.promotions = newState.promotions.map((promotion) => 
          promotion.id === action.payload.id ? action.payload : promotion
        );
        break;      
    case PromotionsActionType.DeletePromotion:
      const indexToDelete = newState.promotions.findIndex(
        (p) => p.id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.promotions.splice(indexToDelete, 1);
      }
      break;
    case PromotionsActionType.ClearState:
      return new PromotionState();
  }
  return newState;
}

export const promotionsStore = createStore(promotionReducer);
