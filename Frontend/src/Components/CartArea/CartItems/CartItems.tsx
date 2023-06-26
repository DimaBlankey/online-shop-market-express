import React, { useEffect, useState } from "react";
import CartItemModel from "../../../Models/CartItemModel";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import "./CartItems.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import cartService from "../../../Services/CartService";
import { CartActionType, cartStore } from "../../../Redux/CartState";
import Spinner from "../../SharedArea/Spinner/Spinner";

interface CartItemsProps {
  item: CartItemModel;
}

function CartItems({ item }: CartItemsProps): JSX.Element {
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
      productId: item.productId,
      cartId: user ? user.cartId : Math.floor(Math.random() * 1000000),
      productCode: item.productCode,
      productName: item.productName,
      salePrice: item.salePrice,
      price: item.price,
      image1Url: item.image1Url,
      quantity: 1,
      totalPrice: item.salePrice || item.price,
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
        cartItems[existingItemIndex].totalPrice =
          parseFloat(
            (
              cartItems[existingItemIndex].quantity *
              (cartItems[existingItemIndex].salePrice || cartItems[existingItemIndex].price)
            ).toFixed(2)
          );
      } else {
        cartItems.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      cartStore.dispatch({
        type: CartActionType.FetchItems,
        payload: cartItems,
      });
    } else {
      cartService.addCartDetails(cartItem);
    }
  };

  const removeFromCart = () => {
    const cartItem: CartItemModel = {
      productId: item.productId,
      cartId: user ? user.cartId : Math.floor(Math.random() * 1000000),
      productCode: "",
      productName: "",
      salePrice: 0,
      price: 0,
      image1Url: "",
      quantity: 0,
      totalPrice: 0,
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
        cartItems[existingItemIndex].quantity--;

        if (cartItems[existingItemIndex].quantity === 0) {
          cartItems.splice(existingItemIndex, 1);
        } else {
          cartItems[existingItemIndex].totalPrice =
          parseFloat(
            (
              cartItems[existingItemIndex].quantity *
              (cartItems[existingItemIndex].salePrice || cartItems[existingItemIndex].price)
            ).toFixed(2)
          );
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        cartStore.dispatch({
          type: CartActionType.FetchItems,
          payload: cartItems,
        });
      }
    } else {
      cartService.removeCartDetails(cartItem);
    }
  };

  const removeWholeItemFromCart = () => {
    const cartItem: CartItemModel = {
      productId: item.productId,
      cartId: user ? user.cartId : Math.floor(Math.random() * 1000000),
      productCode: "",
      productName: "",
      salePrice: 0,
      price: 0,
      image1Url: "",
      quantity: 0,
      totalPrice: 0,
    };
    if (!user) {
      const storedCartItems = localStorage.getItem("cart");
      let cartItems: CartItemModel[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : [];
  
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.productId === item.productId 
      );
  
      if (existingItemIndex > -1) {
        cartItems.splice(existingItemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        cartStore.dispatch({
          type: CartActionType.FetchItems,
          payload: cartItems,
        });
      }
    } else {
      cartService.removeWholeItemFromCart(cartItem);
    }
  };
  

  return (
    <Card className="CartItems" sx={{ display: "flex", marginBottom: 2 }}>
      <Grid container>
        <Grid item xs={9}>
          <CardContent>
          <IconButton
              size="small"
              onClick={removeWholeItemFromCart}
              style={{ float: "right" }}
            >
              <Close />
            </IconButton>
            <span hidden>{item.productId}</span>
            <Typography variant="h6" component="div">
              {item.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Code: {item.productCode}
            </Typography>
            <div >
              {item.salePrice ? (
                <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textDecoration: "line-through", marginInline: 10}}
                  >
                    ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.salePrice}
                  </Typography>
                  </div>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  ${item.price}
                </Typography>
              )}
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ marginLeft: 8 }}
              >
                Total Price: ${item.totalPrice}
              </Typography>
            </div>

            <div>
              <IconButton size="small" onClick={removeFromCart} disabled={item.quantity === 1}>
                <Remove />
              </IconButton>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: "inline" }}
              >
                {item.quantity}
              </Typography>
              <IconButton size="small" onClick={addToCart}>
                <Add />
              </IconButton>
            </div>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            height="150"
            image={item.image1Url}
            alt={item.productName}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default CartItems;
