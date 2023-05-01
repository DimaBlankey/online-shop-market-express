import axios from "axios";
import appConfig from "../Utils/AppConfig";
import OrderModel from "../Models/OrderModel";
import { CartActionType, cartStore } from "../Redux/CartState";

class OrderService {
  public async getOrderByUser(userId: number): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(
      appConfig.ordersUrl + userId
    );
    const orders = response.data;
    return orders;
  }

  public async addOrder(order: OrderModel): Promise<void> {
    await axios.post<OrderModel>(appConfig.ordersUrl, order);
    sessionStorage.clear();
    cartStore.dispatch({
      type: CartActionType.ClearState,
      payload: undefined,
    });
  }
}

const orderService = new OrderService();

export default orderService;
