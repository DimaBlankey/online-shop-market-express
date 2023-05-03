import "./OrderReview.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { cartStore } from "../../../Redux/CartState";
import CartItemModel from "../../../Models/CartItemModel";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import cartService from "../../../Services/CartService";
import notifyService from "../../../Services/NotifyService";
import { Button } from "@mui/material";
import orderService from "../../../Services/OrderService";
import OrderModel from "../../../Models/OrderModel";

interface OrderReviewProps {
  handleBack: () => void;
  handlePlaceOrder: () => void;
}

function OrderReview({
  handleBack,
  handlePlaceOrder,
}: OrderReviewProps): JSX.Element {
  // Get User For user Info
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  // Get items from cart
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
    }
  }, [user]);

  // Get checkout Info from session Storage
  const checkoutDetails = sessionStorage.getItem("checkoutDetails");
  const shipment = JSON.parse(checkoutDetails);
  // Get payment -card number - last 4 digits
  const paymentDetails = sessionStorage.getItem("paymentDetails");
  const payment = JSON.parse(paymentDetails);
  const creditCardNum = payment.cardNumber.slice(-4);
  // Get delivery Date
  const  deliveryDate = sessionStorage.getItem("deliveryDate");

  // Handle Saving the order in database and moving forward
  const handlePlaceOrderClick = () => {
    if (!user) {
      notifyService.error("User information is missing");
      return;
    }
    const order: OrderModel = {
      userId: user.id,
      cartId: user.cartId,
      totalPrice: +items
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2),
      city: shipment.city,
      address: shipment.address1,
      productsAndQuantity: JSON.stringify(
        items.map((item) => ({
          id: item.productId,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          salePrice: item.salePrice,
          productCode: item.productCode,
          image1Url: item.image1Url,
        }))
      ),
      id: 0,
      dateOfDelivery: deliveryDate,
      dateOfPurchase: "",
      creditCardNum: creditCardNum,
    };

    placeOrder(order);
  };

  async function placeOrder(order: OrderModel) {
    try {
      await orderService.addOrder(order);
      handlePlaceOrder();
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="OrderReview">
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {items?.map((item) => (
            <ListItem key={item.productCode} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={item.productName} />
              <Typography variant="body2">{item.quantity}X  {item.price}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              $
              {items.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping Address
            </Typography>
            <Typography gutterBottom>
              {shipment?.firstName} {shipment?.lastName}
            </Typography>
            <Typography gutterBottom>
              {shipment?.address1} ,{shipment?.city}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Delivery Date 
            </Typography>
            <Typography gutterBottom>
              {deliveryDate}
            </Typography>
          </Grid>
        </Grid>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePlaceOrderClick}
          sx={{ mt: 3, ml: 1 }}
        >
          Place Order
        </Button>
      </React.Fragment>
    </div>
  );
}

export default OrderReview;