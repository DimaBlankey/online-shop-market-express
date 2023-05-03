import axios from "axios";
import appConfig from "../Utils/AppConfig";
import OrderModel from "../Models/OrderModel";
import { CartActionType, cartStore } from "../Redux/CartState";
import { AuthActionType, authStore } from "../Redux/AuthState";
import refreshTokenService from "./TokenService";

class OrderService {
  public async getOrderByUser(userId: number): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(
      appConfig.ordersUrl + userId
    );
    const orders = response.data;
    return orders;
  }

  public async addOrder(order: OrderModel): Promise<void> {
    
    const response =  await axios.post<OrderModel, any>(appConfig.ordersUrl, order);
   
    const newCartId = +response.data[1]

    sessionStorage.clear();
       cartStore.dispatch({
      type: CartActionType.UpdateCartId,
      payload: newCartId,
    });
    cartStore.dispatch({
      type: CartActionType.ClearState,
      payload: undefined,
    });
    authStore.dispatch({
      type: AuthActionType.UpdateCartId,
      payload: newCartId
    })
    authStore.dispatch({
      type: AuthActionType.ClearState,
      payload: undefined
    })

    refreshTokenService.refreshToken(order.userId)
  }
}

const orderService = new OrderService();

export default orderService;
