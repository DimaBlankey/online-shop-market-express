class OrderModel{
    id: number;
    userId: number;
    cartId: number;
    totalPrice: number;
    city: string;
    address: string;
    dateOfDelivery: string;
    dateOfPurchase: string;
    creditCardNum: number;
    productsAndQuantity: string;
}

export default OrderModel