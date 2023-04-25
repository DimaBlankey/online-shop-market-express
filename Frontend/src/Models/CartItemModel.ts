class CartItemModel {
  // product
  productId: number;
  productCode: string;
  productName: string;
  salePrice: number;
  price: number;
  image1Url: string;
  //cart
  cartId: number;
  quantity: number;
  totalPrice: number;
  
}

export default CartItemModel;
