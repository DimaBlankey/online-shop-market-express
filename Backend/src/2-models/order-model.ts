class OrderModel {
  id: number;
  userId: number;
  cartId: number;
  totalPrice: number;
  city: string;
  address: string;
  dateOfDelivery: string;
  dateOfPurchase: string;
  creditCardNum: number;
  productsAndQuantity: JSON;

  public constructor(order: OrderModel) {
    this.id = order.id;
    this.userId = order.userId;
    this.cartId = order.cartId;
    this.totalPrice = order.totalPrice;
    this.city = order.city;
    this.address = order.address;
    this.dateOfDelivery = order.dateOfDelivery;
    this.dateOfPurchase = order.dateOfPurchase;
    this.creditCardNum = order.creditCardNum;
    this.productsAndQuantity = order.productsAndQuantity;
  }
  //   Do Validation!
}

export default OrderModel;
