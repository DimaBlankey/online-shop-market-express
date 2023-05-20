import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

export class AuthState {
  public token: string = null;
  public user: UserModel = null;
  public role: UserModel = null;
  public cartId: number = null;

  public constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
  }
}

export enum AuthActionType {
  Signup,
  Login,
  Logout,
  ClearState,
  UpdateCartId,
  UpdateToken,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };
  // newState.user = { ...currentState.user };
  switch (action.type) {
    case AuthActionType.Signup:
    case AuthActionType.Login:
      newState.token = action.payload;
      newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
      localStorage.setItem("token", newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("token");
      sessionStorage.clear();
      break;
    case AuthActionType.UpdateCartId:
      if (newState.user) {
        newState.user = { ...newState.user, cartId: action.payload };
      }
      break;
    case AuthActionType.UpdateToken:
      newState.token = action.payload;
      newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
      localStorage.setItem("token", newState.token);
      break;
    case AuthActionType.ClearState:
      return new AuthState();
  }

  return newState;
}

export const authStore = createStore(authReducer);
