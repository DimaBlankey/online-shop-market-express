import { useEffect, useState } from "react";
import "./CreatePromotion.css";
import {
    Button,
    FormControl,
    TextField,
    Typography,
    FormHelperText,
    Box,
    InputAdornment,
    IconButton,
    Grid,
    FormLabel,
  } from "@mui/material";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import notifyService from "../../../Services/NotifyService";
import PromotionModel from "../../../Models/PromotionModel";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import promotionService from "../../../Services/PromotionService";

function CreatePromotion(): JSX.Element {

    // const [categories, setCategories] = useState<CategoryModel[]>([]);

    // useEffect(() => {
    //   categoryService
    //     .getAllCategories()
    //     .then((responseCategories) => setCategories(responseCategories))
    //     .catch((err) => notifyService.error(err));
    // }, []);

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productsService
          .getAllProducts()
          .then((responseProducts) => {
            setProducts(responseProducts);
          })
          .catch((err) => notifyService.error(err));
      }, []);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<PromotionModel>();
      const navigate = useNavigate();

      async function send(promotion: PromotionModel) {
        try {
          await promotionService.addPromotion(promotion);
          notifyService.success("Promotion has been added!");
        } catch (err: any) {
          notifyService.error(err);
        }
      }
    

    return (
        <div className="CreatePromotion">
			<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="slide-down"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "100%",
            maxWidth: "450px",
            mt: 2,
            borderColor: "gray.200",
            borderRadius: "30px",
            p: 4,
          }}
        >
          <Typography variant="h5">Add Promotion</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>     
              <Box mt={2} mb={2}>
                <FormLabel>Promotion Name</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Name..."
                  variant="outlined"
                  className="form-inputs"
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                  })}
                />
                {errors.name && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.name.type === "required" && "name is required"}
                    {errors.name.type === "minLength" &&
                      "name must be at least 3 characters"}
                    {errors.name.type === "maxLength" &&
                      "name must be at most 100 characters"}
                  </FormHelperText>
                )}
              </Box>

              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Promotion
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
        </div>
    );
}

export default CreatePromotion;
