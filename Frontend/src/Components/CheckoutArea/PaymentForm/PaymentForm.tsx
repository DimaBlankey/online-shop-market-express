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

    if (name === "expiryDate" && value.length === 2 && formData.expiryDate.length === 1) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value + "/" }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

  let errorMessage = "";

  switch (name) {
    case "id":
      if (!validateId(value)) {
        errorMessage = "ID must be 9 digits.";
      }
      break;
    case "cardNumber":
      if (!validateCardNumber(value)) {
        errorMessage =
          "Card number must be in the format: 1234-1234-1234-1234.";
      }
      break;
    case "expiryDate":
      if (!validateExpiryDate(value)) {
        errorMessage = "Expiry date must be in the format: MM/YY";
      }
      break;
    case "cvv":
      if (!validateCvv(value)) {
        errorMessage = "CVV must be 3 or 4 digits.";
      }
      break;
    default:
      break;
  }

  setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const isFormCompleted = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const [errors, setErrors] = useState({
    id: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const validateId = (id: string) => {
    const idRegex = /^\d{9}$/;
    return idRegex.test(id);
  };
  
  const validateCardNumber = (cardNumber: string) => {
    const cardNumberRegex = /^[\d-]+$/;
    return cardNumberRegex.test(cardNumber);
  };
  
  const validateExpiryDate = (expiryDate: string) => {
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    return expiryDateRegex.test(expiryDate);
  };
  
  const validateCvv = (cvv: string) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
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
              // autoComplete="cc-name"
              variant="standard"
              value={formData.id}
              onChange={handleChange}
              error={Boolean(errors.id)}
              helperText={errors.id}
              inputProps={{ maxLength: 9 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="cardNumber"
              label="Card number"
              fullWidth
              // autoComplete="cc-number"
              variant="standard"
              value={formData.cardNumber}
              onChange={handleChange}
              error={Boolean(errors.cardNumber)}
              helperText={errors.cardNumber}
              inputProps={{ maxLength: 19 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="expiryDate"
              label="Expiry date"
              fullWidth
              // autoComplete="cc-exp"
              variant="standard"
              value={formData.expiryDate}
              onChange={handleChange}
              error={Boolean(errors.expiryDate)}
              helperText={errors.expiryDate}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="cvv"
              label="CVV"
              // helperText="Last three digits on signature strip"
              fullWidth
              // autoComplete="cc-csc"
              variant="standard"
              value={formData.cvv}
              onChange={handleChange}
              error={Boolean(errors.cvv)}
              helperText={errors.cvv ||"Last three digits on signature strip"}
              inputProps={{ maxLength: 4 }}
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
