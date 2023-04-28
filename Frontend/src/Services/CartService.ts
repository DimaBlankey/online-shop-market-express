import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CartItemModel from "../Models/CartItemModel";
import { CartActionType, cartStore } from "../Redux/CartState";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";

class CartService {
  public async addCartDetails(cartDetails: CartItemModel): Promise<void> {
    const response = await axios.post<CartItemModel>(
      appConfig.cartUrl + "add-item",
      cartDetails
    );
    const addedItem = response.data;
    cartStore.dispatch({ type: CartActionType.AddItems, payload: addedItem });
  }

  public async removeCartDetails(cartDetails: CartItemModel): Promise<void> {
    const response = await axios.post<CartItemModel>(
      appConfig.cartUrl + "remove-item",
      cartDetails
    );
    const removedItem = response.data;
    cartStore.dispatch({
      type: CartActionType.RemoveItems,
      payload: removedItem,
    });
  }

  public async removeWholeItemFromCart(cartDetails: CartItemModel): Promise<void> {
   await axios.delete<CartItemModel>(
      appConfig.cartUrl + "remove-whole-item",
      {
        data: cartDetails,
      }
    );
    cartStore.dispatch({
      type: CartActionType.RemoveWholeItem,
      payload: cartDetails,
    });
  }
  


  public async getCartByUser(cartId: number): Promise<CartItemModel[]> {
    let items = cartStore.getState().items;
    if (items.length === 0) {
      const response = await axios.get<CartItemModel[]>(
        appConfig.cartUrl + cartId
      );
      items = response.data;
      cartStore.dispatch({
        type: CartActionType.FetchItems,
        payload: items,
      });
    }
    return items;
  }

  public async insertCartDetailsFromStorage(user: UserModel): Promise<void> {
    const cartDetails = JSON.parse(localStorage.getItem("cart") || "[]");
    const userIdCardNumber = user.idCardNumber;
    const requestData = {
      cartDetails,
      userIdCardNumber,
    };

    const response = await axios.post<any>(
      appConfig.cartUrl + "new-cart",
      requestData
    );
    if (response) {
      localStorage.removeItem("cart");
    }
  }

  public async logToCart(credentials: CredentialsModel): Promise<void> {
    const cartDetails = JSON.parse(localStorage.getItem("cart") || "[]");
    const userEmail = credentials.email;
    const requestData = { cartDetails, userEmail };
    const response = await axios.post<any>(
      appConfig.cartUrl + "log-to-cart",
      requestData
    );
    if (response) {
      localStorage.removeItem("cart");
    }
  }
}

const cartService = new CartService();

export default cartService;
