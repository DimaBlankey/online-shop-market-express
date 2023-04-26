class CartDetailsModel {
  id: number;
  productId: number;
  productCode: string;
  productName: string;
  salePrice: number;
  price: number;
  image1Url: string;
  quantity: number;
  totalPrice: number;
  cartId: number;

  public constructor(cartDetails: CartDetailsModel) {
    this.id = cartDetails.id;
    this.productId = cartDetails.productId;
    this.productCode = cartDetails.productCode;
    this.productName = cartDetails.productName
    this.salePrice = cartDetails.salePrice;
    this.price = cartDetails.price;
    this.image1Url = cartDetails.image1Url;
    this.quantity = cartDetails.quantity;
    this.totalPrice = cartDetails.totalPrice;
    this.cartId = cartDetails.cartId;
  }
}

export default CartDetailsModel;
