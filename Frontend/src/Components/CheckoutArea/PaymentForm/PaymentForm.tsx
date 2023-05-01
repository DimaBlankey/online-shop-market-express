import "./PaymentForm.css";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

interface PaymentFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

function PaymentForm({ handleNext, handleBack }: PaymentFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    id: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const paymentDetails = sessionStorage.getItem("paymentDetails");
    if (paymentDetails) {
      setFormData(JSON.parse(paymentDetails));
    } 
  }, []);

   const handleButtonClick = () => {
    sessionStorage.setItem("paymentDetails", JSON.stringify(formData));
    handleNext();
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormCompleted = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };


    return (
      <div className="PaymentForm">
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="id"
              label="ID"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={formData.id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="expiryDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={formData.cvv}
              onChange={handleChange}
            />
          </Grid>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{ mt: 3, ml: 1 }}
            disabled={!isFormCompleted()}
          >
            Next
          </Button>
        </Grid>
      </React.Fragment>
    </div>
    );
}

export default PaymentForm;
