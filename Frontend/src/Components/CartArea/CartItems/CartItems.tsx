import React, { useEffect, useState } from "react";
import CartItemModel from "../../../Models/CartItemModel";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "./CartItems.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

interface CartItemsProps {
  item: CartItemModel;
}

function CartItems({ item }: CartItemsProps): JSX.Element {

  


  return (
    <Card className="CartItems" sx={{ display: "flex", marginBottom: 2 }}>
      <Grid container>
        <Grid item xs={9}>
          <CardContent>
            <span hidden>{item.productId}</span>
            <Typography variant="h6" component="div">
              {item.productName}
            </Typography>
            <Typography
            variant="body2"
            color="text.secondary"
            >
              Code: {item.productCode}
            </Typography>
            <div>
              {item.salePrice ? (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textDecoration: "line-through", marginLeft: 8 }}
                  >
                    ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.salePrice}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  ${item.price}
                </Typography>
              )}
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ marginLeft: 8 }}
              >
                Total Price: ${item.totalPrice}
              </Typography>
            </div>

            <div>
              <IconButton
                size="small"
                onClick={() => console.log("Decrease quantity")}
              >
                <Remove />
              </IconButton>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ display: "inline" }}
              >
                {item.quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => console.log("Increase quantity")}
              >
                <Add />
              </IconButton>
            </div>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            height="150"
            image={item.image1Url}
            alt={item.productName}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default CartItems;
