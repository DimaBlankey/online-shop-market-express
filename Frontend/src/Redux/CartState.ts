import { createStore } from "redux";
import CartItemModel from "../Models/CartItemModel";

export class CartState {
  public items: CartItemModel[] = [];
}

export enum CartActionType {
  FetchItems,
  AddItems,
  RemoveItems,
  ClearState,
}

export interface CartAction {
  type: CartActionType;
  payload: any;
}

export function cartReducer(
  currentState = new CartState(),
  action: CartAction
): CartState {
  const newState = { ...currentState };
  newState.items = [...currentState.items];
  switch (action.type) {
    case CartActionType.FetchItems:
      newState.items = action.payload;
      break;
    case CartActionType.AddItems:
      return new CartState();
    case CartActionType.RemoveItems:
      const indexToDelete = newState.items.findIndex(
        (i) => i.productId === action.payload
      );
      if (indexToDelete >= 0) {
        newState.items.splice(indexToDelete, 1);
      }
      break;
    case CartActionType.ClearState:
      return new CartState();
  }
  return newState;
}

export const productsStore = createStore(cartReducer);
