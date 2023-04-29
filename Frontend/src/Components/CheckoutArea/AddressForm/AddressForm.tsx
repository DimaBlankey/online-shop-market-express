import "./AddressForm.css";
import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";


function AddressForm(): JSX.Element {

  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

    return (
        <div className="AddressForm">
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
            value={user?.firstName || ""}
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
            value={user?.lastName || ""}
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
            value={user?.address || ""}
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
            value={user?.city || ""}
          />
        </Grid>
      </Grid>
			
        </div>
    );
}

export default AddressForm;
