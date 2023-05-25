import React, { useEffect, useState } from "react";
import "./AddReviewProduct.css";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import ReviewModel from "../../../Models/ReviewModel";
import reviewService from "../../../Services/ReviewService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";

function AddReviewProduct(): JSX.Element {
  const navigate = useNavigate();

  const [rank, setRank] = React.useState<number | null>(0);

  const [user, setUser] = useState<UserModel>();

  const { productCode } = useParams<{ productCode: string }>();

  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem(productCode);

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else {
      productsService
        .getOneProduct(productCode)
        .then((responseProduct) => {
          setProduct(responseProduct);
          localStorage.setItem(productCode, JSON.stringify(responseProduct));
        })
        .catch((err) => {
          notifyService.error(err);
          navigate("/home");
        });
    }
  }, [productCode, navigate]);

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ReviewModel>();

  async function send(formReview: ReviewModel) {
    try {
      // Use current user and product info in the review
      const review: ReviewModel = {
        ...formReview,
        productId: product?.id,
        userId: user?.id,
      };
      await reviewService.addProductReview(review);
      notifyService.success("Review added successfully!");
      setValue("rating", null);
      setValue("review", "");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="AddReviewProduct">
      <Container>
        <form onSubmit={handleSubmit(send)}>
          <Typography variant="h5">Add Review</Typography>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rank</Typography>
            <Controller
              name="rating"
              control={control}
              defaultValue={rank}
              rules={{
                required: "Rating is required",
                validate: (value) =>
                  (value !== null && value > 0) || "Rating is required",
              }}
              render={({ field }) => (
                <Rating
                  value={field.value}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                    setRank(newValue);
                  }}
                />
              )}
            />
            {errors.rating && (
              <FormHelperText error>{errors.rating.message}</FormHelperText>
            )}
          </Box>
          <Box>
            <Typography component="legend">Review</Typography>
            <TextField
              multiline
              rows={2}             
              placeholder="write review..."
              fullWidth
              {...register("review", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Review must be at least 5 characters long",
                },
                maxLength: {
                  value: 250,
                  message: "Review cannot exceed 250 characters",
                },
              })}
            />
            {errors.review && (
              <FormHelperText error>{errors.review.message}</FormHelperText>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddReviewProduct;
