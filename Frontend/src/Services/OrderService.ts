import axios from "axios";
import appConfig from "../Utils/AppConfig";
import OrderModel from "../Models/OrderModel";

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
  }
}

const orderService = new OrderService();

export default orderService;
