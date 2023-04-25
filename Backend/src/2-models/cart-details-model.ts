class CartDetailsModel {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  cartId: number;

  public constructor(cartDetails: CartDetailsModel) {
    this.id = cartDetails.id;
    this.productId = cartDetails.productId;
    this.quantity = cartDetails.quantity;
    this.totalPrice = cartDetails.totalPrice;
    this.cartId = cartDetails.cartId;
  }
}

export default CartDetailsModel;
