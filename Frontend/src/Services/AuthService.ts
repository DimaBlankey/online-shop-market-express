import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";
import cartService from "./CartService";
import { CartActionType, cartStore } from "../Redux/CartState";

class AuthService {
  public async signUp(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.signupUrl, user);
    if (response) {
      cartService.insertCartDetailsFromStorage(user);
      
    }
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Signup, payload: token });
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    if (response) {
      cartService.logToCart(credentials);
    }
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Login, payload: token });
  }

  public logout(): void {
    authStore.dispatch({ type: AuthActionType.Logout });
    cartStore.dispatch({
      type: CartActionType.ClearState,
      payload: undefined,
    });
  }
}

const authService = new AuthService();

export default authService;
