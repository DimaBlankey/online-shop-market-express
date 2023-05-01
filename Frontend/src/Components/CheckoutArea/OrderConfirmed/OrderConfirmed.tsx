import "./OrderConfirmed.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Step, StepLabel, Stepper } from "@mui/material";

const theme = createTheme();

const steps = ["Shipping address", "Payment details", "Review your order"];


function OrderConfirmed(): JSX.Element {
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
                Your order number is #2001539. We have emailed your order

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
