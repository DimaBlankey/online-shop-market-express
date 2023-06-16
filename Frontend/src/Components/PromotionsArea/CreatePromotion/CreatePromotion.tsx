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
  Switch,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import notifyService from "../../../Services/NotifyService";
import PromotionModel from "../../../Models/PromotionModel";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import promotionService from "../../../Services/PromotionService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";

function CreatePromotion(): JSX.Element {
  const [categories, setCategories] = useState<string[]>([]);

  const [products, setProducts] = useState<ProductModel[]>([]);

  const [chooseByCategory, setChooseByCategory] = useState(false);

  const [chooseByProduct, setChooseByProduct] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [selectedProducts, setSelectedProducts] = useState<ProductModel[]>([]);

  type DiscountType =
    | "percentageDiscount"
    | "amountDiscount"
    | "finalPriceDiscount";

  const [discountType, setDiscountType] =
    useState<DiscountType>("percentageDiscount");

  useEffect(() => {
    const categorySet = new Set<string>();
    products.forEach((product) => categorySet.add(product.categoryName));
    setCategories(Array.from(categorySet));
  }, [products]);

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
    watch,
    setValue,
    setError,
    reset,
  } = useForm<PromotionModel>();
  const startDateValue = watch("startDate");

  async function send(promotion: PromotionModel) {
    if (
      (!promotion.products || promotion.products.length === 0) &&
      (!promotion.categories || promotion.categories.length === 0)
    ) {
      setError("products", {
        type: "manual",
        message: "You must select at least one category or one product",
      });
      return;
    }

    let productCodes: string[];

    promotion.startDate = dayjs(promotion.startDate).format("YYYY-MM-DD");

    promotion.endDate = dayjs(promotion.endDate).format("YYYY-MM-DD");

    if (chooseByCategory) {
      if (!promotion.categories || promotion.categories.length === 0) {
        setError("products", {
          type: "manual",
          message: "You must activate your choice",
        });
        return;
      }
      productCodes = products
        .filter((product) => selectedCategories.includes(product.categoryName))
        .map((product) => product.productCode);
    } else if (chooseByProduct) {
      if (!promotion.products || promotion.products.length === 0) {
        setError("products", {
          type: "manual",
          message: "You must activate your choice",
        });
        return;
      }
      productCodes = selectedProducts.map((product) => product.productCode);
    }

    promotion.products = JSON.stringify(productCodes);

    try {
      await promotionService.addPromotion(promotion);
      notifyService.success("Promotion has been added!");
      reset({
        name: "",
        startDate: null,
        endDate: null,
        percentageDiscount: 0,
        amountDiscount: 0,
        finalPriceDiscount: 0,
      });
      setSelectedCategories([]);
      setSelectedProducts([]);
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

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormLabel>Start Date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                            disablePast
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {errors.startDate &&
                      errors.startDate.type === "required" && (
                        <FormHelperText sx={{ fontSize: 12 }} error>
                          Start date is required
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormLabel>End Date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        rules={{
                          required: true,
                          validate: (value) =>
                            !dayjs(value).isBefore(dayjs(startDateValue)) ||
                            "End date must be after start date",
                        }}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                            disablePast
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {errors.endDate && errors.endDate.type === "required" && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        Start date is required
                      </FormHelperText>
                    )}
                    {errors.endDate && errors.endDate.type === "validate" && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.endDate.message}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Box mt={2} mb={2}>
                <FormLabel>Choose by Categories</FormLabel>
                <Switch
                  checked={chooseByCategory}
                  onChange={(event) => {
                    setChooseByCategory(event.target.checked);
                    setChooseByProduct(!event.target.checked);
                  }}
                />
                <Autocomplete
                  disabled={!chooseByCategory}
                  multiple
                  options={categories}
                  value={selectedCategories}
                  onChange={(event, newValue) => {
                    setSelectedCategories(newValue);
                    setValue("categories", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Categories"
                      placeholder="Choose..."
                    />
                  )}
                />

                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => <div {...field}></div>}
                />
              </Box>
              <Box mt={2} mb={2}>
                <FormLabel>Choose by Products</FormLabel>
                <Switch
                  checked={chooseByProduct}
                  onChange={(event) => {
                    setChooseByProduct(event.target.checked);
                    setChooseByCategory(!event.target.checked);
                  }}
                />
                <Autocomplete
                  disabled={!chooseByProduct}
                  id="CreatePromotion-product-autocomplete"
                  multiple
                  options={products}
                  getOptionLabel={(option) =>
                    `${option.name} (${option.productCode})`
                  }
                  value={selectedProducts}
                  onChange={(event, newValue) => {
                    setSelectedProducts(newValue);
                    setValue("products", newValue as unknown as string);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Select a product"
                      placeholder="Products"
                    />
                  )}
                />

                <Controller
                  name="products"
                  control={control}
                  render={({ field }) => <div {...field}></div>}
                />
              </Box>
              {errors.products && (
                <FormHelperText sx={{ fontSize: 12 }} error>
                  {errors.products.message}
                </FormHelperText>
              )}
              <FormLabel>Discount</FormLabel>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="discount-type-label">
                        Discount Type
                      </InputLabel>
                      <Select
                        labelId="discount-type-label"
                        label="Discount Type"
                        defaultValue="percentageDiscount"
                        onChange={(event) => {
                          setDiscountType(event.target.value as DiscountType);
                          setValue("percentageDiscount", 0);
                          setValue("amountDiscount", 0);
                          setValue("finalPriceDiscount", 0);
                        }}
                      >
                        <MenuItem value="percentageDiscount">
                          Percentage
                        </MenuItem>
                        <MenuItem value="amountDiscount">Amount</MenuItem>
                        <MenuItem value="finalPriceDiscount">
                          Final Price
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    {discountType === "percentageDiscount" && (
                      <Controller
                        defaultValue={0}
                        name="percentageDiscount"
                        control={control}
                        rules={{
                          required: true,
                          validate: {
                            validValue: (value) => {
                              if (value < 1 || value > 99) {
                                return "Percentage must be between 1 and 99";
                              }
                              return true;
                            },
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={field.value || ""}
                            error={!!errors[discountType]}
                            label="Discount"
                            type="number"
                            InputProps={{
                              inputProps: {
                                min: 1,
                                max: 99,
                                step: 1,
                              },
                            }}
                          />
                        )}
                      />
                    )}
                    {discountType === "amountDiscount" && (
                      <Controller
                        defaultValue={0}
                        name="amountDiscount"
                        control={control}
                        rules={{
                          required: true,
                          validate: {
                            validValue: (value) => {
                              if (value < 0.01 || value > 10000) {
                                return "Value must be between 0.01 and 10000";
                              }
                              return true;
                            },
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={field.value || ""}
                            error={!!errors[discountType]}
                            label="Discount"
                            type="number"
                            InputProps={{
                              inputProps: {
                                min: 0.01,
                                max: 10000,
                                step: 0.01,
                              },
                            }}
                          />
                        )}
                      />
                    )}
                    {discountType === "finalPriceDiscount" && (
                      <Controller
                        defaultValue={0}
                        name="finalPriceDiscount"
                        control={control}
                        rules={{
                          required: true,
                          validate: {
                            validValue: (value) => {
                              if (value < 0.01 || value > 10000) {
                                return "Value must be between 0.1 and 10000";
                              }
                              return true;
                            },
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={field.value || ""}
                            error={!!errors[discountType]}
                            label="Discount"
                            type="number"
                            InputProps={{
                              inputProps: {
                                min: 0.01,
                                max: 10000,
                                step: 0.01,
                              },
                            }}
                          />
                        )}
                      />
                    )}

                    {errors[discountType] && (
                      <FormHelperText error>
                        {errors[discountType].message}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>

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
