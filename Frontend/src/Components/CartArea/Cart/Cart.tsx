import { useEffect, useState } from "react";
import "./Cart.css";
import CartItemModel from "../../../Models/CartItemModel";
import cartService from "../../../Services/CartService";
import notifyService from "../../../Services/NotifyService";
import UserModel from "../../../Models/UserModel";
import CartItems from "../CartItems/CartItems";
import { authStore } from "../../../Redux/AuthState";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart(): JSX.Element {
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
    if (user) {
      cartService
        .getCartByUser(user.cartId)
        .then((responseItems) => {
          setItems(responseItems);
        })
        .catch((err) => notifyService.error(err));
    }
  }, [user]);

  return (
    <div className="Cart">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography>My Cart</Typography>
              <ShoppingCartIcon></ShoppingCartIcon>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {items.map((i) => (
        <CartItems key={i.productId} item={i} />
      ))}
      <br />
      <div>
      <h5>Total: </h5>
      <Button variant="contained">Order</Button>
      </div>
    </div>
  );
}

export default Cart;
