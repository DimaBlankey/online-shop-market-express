import "./OrderConfirmed.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Step, StepLabel, Stepper } from "@mui/material";
import orderService from "../../../Services/OrderService";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import OrderModel from "../../../Models/OrderModel";

const theme = createTheme();

const steps = ["Shipping address", "Payment details", "Review your order"];

function OrderConfirmed(): JSX.Element {

  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);


  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    if (user) {
      getOrderByUser();
    }

    return () => unsubscribe();
  }, [user]);

  async function getOrderByUser(): Promise<void> {
    const orderByUser = await orderService.getOrderByUser(user.id);
    const lastOrder = orderByUser[orderByUser.length - 1];
    const orderId = lastOrder.id;
    setOrderId(orderId);
  }

    return (
      <div className="OrderConfirmation">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={steps.length} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderId}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Paper>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
  
  export default OrderConfirmed;
