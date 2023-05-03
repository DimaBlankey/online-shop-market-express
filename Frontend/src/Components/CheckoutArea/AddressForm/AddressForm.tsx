import "./AddressForm.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { Button } from "@mui/material";
import { cartStore } from "../../../Redux/CartState";
import CartItemModel from "../../../Models/CartItemModel";
import { useNavigate } from "react-router-dom";
import cartService from "../../../Services/CartService";
import notifyService from "../../../Services/NotifyService";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Label } from "@mui/icons-material";
import { TextFieldProps } from "@mui/material";
import dayjs from "dayjs";

interface AddressFormProps {
  handleNext: () => void;
}

function AddressForm({ handleNext }: AddressFormProps): JSX.Element {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel>();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
  });

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    const checkoutDetails = sessionStorage.getItem("checkoutDetails");
    if (checkoutDetails) {
      setFormData(JSON.parse(checkoutDetails));
    } else if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address1: user.address || "",
        city: user.city || "",
      });
    }

    return () => unsubscribe();
  }, [user]);

  const handleButtonClick = () => {
    sessionStorage.setItem("checkoutDetails", JSON.stringify(formData));
    handleNext();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormCompleted = () => {
    return Object.values(formData).every((value) => value.trim() !== "") && value !== null;;
  };

  return (
    <div className="AddressForm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="address1"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={formData.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Choose Delivery Date*"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                sessionStorage.setItem("deliveryDate", newValue?.format("YYYY-MM-DD"));

              }}
              disablePast
            />
          </Grid>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{ mt: 3, ml: 10 }}
            disabled={!isFormCompleted()}
          >
            Next
          </Button>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}

export default AddressForm;
