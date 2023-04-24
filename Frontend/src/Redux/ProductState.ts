import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

export class ProductState {
  public products: ProductModel[] = [];
}

export enum ProductsActionType {
  FetchProducts,
  AddProducts,
  UpdateProducts,
  DeleteProducts,
  ClearState,
}

export interface ProductsAction {
  type: ProductsActionType;
  payload: any;
}

export function productsReducer(
  currentState = new ProductState(),
  action: ProductsAction
): ProductState {
  const newState = { ...currentState };
  newState.products = [...currentState.products];
  switch (action.type) {
    case ProductsActionType.FetchProducts:
      newState.products = action.payload;
      break;
    case ProductsActionType.AddProducts:
      return new ProductState();
    case ProductsActionType.UpdateProducts:
      return new ProductState();
    case ProductsActionType.DeleteProducts:
      const indexToDelete = newState.products.findIndex(
        (p) => p.id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.products.splice(indexToDelete, 1);
      }
      break;
    case ProductsActionType.ClearState:
      return new ProductState();
  }
  return newState;
}

export const productsStore = createStore(productsReducer);
