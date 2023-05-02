import { useEffect, useState } from "react";
import "./Cart.css";
import CartItemModel from "../../../Models/CartItemModel";
import cartService from "../../../Services/CartService";
import notifyService from "../../../Services/NotifyService";
import UserModel from "../../../Models/UserModel";
import CartItems from "../CartItems/CartItems";
import { authStore } from "../../../Redux/AuthState";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartStore } from "../../../Redux/CartState";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";

function Cart(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const [items, setItems] = useState<CartItemModel[]>([]);

  useEffect(() => {
    setItems(cartStore.getState().items);
    const unsubscribe = cartStore.subscribe(() => {
      const newItems = cartStore.getState().items;
      setItems(newItems);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      cartService
        .getCartByUser(user.cartId)
        .then((responseItems) => {
          setItems(responseItems);
        })
        .catch((err) => notifyService.error(err));
    } else {
      const storedCartItems = localStorage.getItem("cart");
      let cartItems: CartItemModel[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : [];
      setItems(cartItems);
    }
  }, [user]);

  function checkout() {
    if (!user) {
      navigate("/login?checkout");
    }else{
     navigate("/checkout");
  }
}

  return (
    <div className="Cart">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>My Cart</Typography>
              <ShoppingCartIcon />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div
        className="scrollbar"
        style={{
          display: "flex",
          margin: "10px",
          flexDirection: "column",
          minHeight: "650px",
          maxHeight: "650px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {items.length > 0 ? (
          items.map((i) => <CartItems key={i.productId} item={i} />)
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              minHeight: "100%",
            }}
          >
            <RemoveShoppingCart fontSize="large" />
            <Typography>Your cart is empty</Typography>
          </Box>
        )}
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h5>
          Total: $
          {items.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
        </h5>
        <Button variant="contained" onClick={checkout} disabled={items.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
