import "./Checkout.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OrderReview from "../OrderReview/OrderReview";
import PaymentForm from "../PaymentForm/PaymentForm";
import AddressForm from "../AddressForm/AddressForm";
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from "react";
import CartItemModel from "../../../Models/CartItemModel";
import { cartStore } from "../../../Redux/CartState";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

function Checkout(): JSX.Element {

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return (
          <OrderReview
            handleBack={handleBack}
            handlePlaceOrder={handlePlaceOrder}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handlePlaceOrder = () => {
    setActiveStep(activeStep + 1);
    navigate("/order-confirmed")
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="Checkout">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Checkout;
