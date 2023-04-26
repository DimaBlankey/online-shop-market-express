import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import CartItemModel from "../../../Models/CartItemModel";
import cartService from "../../../Services/CartService";

interface ProductCardProps {
  product: ProductModel;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = () => {
    const cartItem: CartItemModel = {
      productId: product.id,
      productCode: product.productCode,
      productName: product.name,
      salePrice: product.salePrice,
      price: product.price,
      image1Url: product.image1Url,
      cartId: user ? user.cartId : Math.floor(Math.random() * 1000000),
      quantity: 1,
      totalPrice: product.salePrice || product.price,
    };

    if (!user) {
      const storedCartItems = localStorage.getItem("cart");
      let cartItems: CartItemModel[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : [];

      const existingItemIndex = cartItems.findIndex(
        (item) => item.productId === cartItem.productId
      );

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity++;
        cartItems[existingItemIndex].totalPrice +=
          cartItems[existingItemIndex].salePrice ||
          cartItems[existingItemIndex].price;
      } else {
        cartItems.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      cartService.addCartDetails(cartItem);
    }
  };

  const images = [product.image1Url, product.image2Url].filter(Boolean);
  return (
    <Card className="ProductCard">
      <Carousel
        className="carousel"
        showThumbs={false}
        showStatus={false}
        showIndicators={images.length > 1}
        showArrows={images.length > 1}
        infiniteLoop
        swipeable
        emulateTouch
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`${product.name} - ${index + 1}`}
              style={{ height: "200px", objectFit: "contain" }}
            />
          </div>
        ))}
      </Carousel>
      <CardContent>
        <span hidden>
          {product.categoryId}
          {product.categoryName}
        </span>
        <span hidden>{product.description}</span>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          {product.salePrice ? (
            <>
              <Typography variant="h6" color="error">
                ${product.salePrice}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", ml: 1 }}
              >
                ${product.price}
              </Typography>
            </>
          ) : (
            <Typography variant="h6">${product.price}</Typography>
          )}
        </Box>
        <Button variant="contained" onClick={addToCart}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
