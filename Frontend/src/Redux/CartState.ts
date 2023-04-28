import { createStore } from "redux";
import CartItemModel from "../Models/CartItemModel";

export class CartState {
  public items: CartItemModel[] = [];
}

export enum CartActionType {
  FetchItems,
  AddItems,
  RemoveItems,
  RemoveWholeItem,
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
  let targetItem: CartItemModel | undefined;
  let itemIndex: number;

  switch (action.type) {
    case CartActionType.FetchItems:
      newState.items = action.payload.map((item: CartItemModel) => {
        item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
        return item;
      });
      break;
    case CartActionType.AddItems:
      itemIndex = newState.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (itemIndex > -1) {
        newState.items[itemIndex].quantity += 1;
        newState.items[itemIndex].totalPrice = parseFloat(
          (
            newState.items[itemIndex].quantity *
            (newState.items[itemIndex].salePrice ||
              newState.items[itemIndex].price)
          ).toFixed(2)
        );
      } else {
        newState.items.push(action.payload);
      }
      break;
    case CartActionType.RemoveItems:
      itemIndex = newState.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (itemIndex > -1) {
        if (newState.items[itemIndex].quantity > 1) {
          newState.items[itemIndex].quantity -= 1;
          newState.items[itemIndex].totalPrice = parseFloat(
            (
              newState.items[itemIndex].quantity *
              (newState.items[itemIndex].salePrice ||
                newState.items[itemIndex].price)
            ).toFixed(2)
          );
        } else {
          newState.items.splice(itemIndex, 1);
        }
      }
      break;
       case CartActionType.RemoveWholeItem:
      itemIndex = newState.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (itemIndex > -1) {
        newState.items.splice(itemIndex, 1);
      }
      break;
    case CartActionType.ClearState:
      return new CartState();
  }
  return newState;
}

export const cartStore = createStore(cartReducer);
