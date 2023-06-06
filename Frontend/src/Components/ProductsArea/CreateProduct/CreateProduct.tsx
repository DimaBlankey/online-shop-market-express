import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";

function CreateProduct(): JSX.Element {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((responseCategories) => setCategories(responseCategories))
      .catch((err) => notifyService.error(err));
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductModel>();
  const navigate = useNavigate();

  async function send(product: ProductModel) {
    try {
      product.image1 = (product.image1 as unknown as FileList)[0];
      product.image2 = (product.image2 as unknown as FileList)[0];
      await productsService.addProduct(product);
      notifyService.success("Product has been added!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  const [image1, setImage1] = useState<File | null>(null);

  const [image2, setImage2] = useState<File | null>(null);

  const handleImage1Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(event.target.files[0]);
    }
  };

  const handleImage2Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage2(event.target.files[0]);
    }
  };

  function navigateBack() {
    navigate("/home");
  }

  return (
    <div className="CreateProduct">
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
          <Typography variant="h5">Add Product</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <Box mt={2} mb={2}>
                <FormLabel>Product Code</FormLabel>
                <TextField
                  fullWidth
                  autoFocus
                  placeholder="Code..."
                  variant="outlined"
                  className="form-inputs"
                  {...register("productCode", {
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
              <Box mt={2} mb={2}>
                <FormLabel>Product Name</FormLabel>
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
              <Box mt={2} mb={2}>
                <FormLabel>Description</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Description..."
                  variant="outlined"
                  multiline
                  rows={4}
                  className="form-inputs"
                  {...register("description", {
                    required: true,
                    minLength: 10,
                    maxLength: 1000,
                  })}
                />
                {errors.description && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.description.type === "required" &&
                      "Description is required"}
                    {errors.description.type === "minLength" &&
                      "Description must be at least 10 characters"}
                    {errors.description.type === "maxLength" &&
                      "Description must be at most 1000 characters"}
                  </FormHelperText>
                )}
              </Box>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue=""
                  {...register("categoryId", {required: true,})}
                  variant="outlined"
                >
                  <MenuItem value="" disabled>
                    Choose...
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoryId && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.categoryId.type === "required" &&
                      "Category is required"}
                  </FormHelperText>
                )}
              </FormControl>
              <Box mt={2} mb={2}>
                <FormLabel>Price</FormLabel>
                <TextField
                  fullWidth
                  placeholder="$"
                  type="text"
                  variant="outlined"
                  className="form-inputs"
                  {...register("price", {
                    required: true,
                    pattern: /^[0-9]+([.][0-9]+)?$/,
                    min: 0,
                    max: 10000,
                  })}
                />
                {errors.price && errors.price.type === "required" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price is required
                  </FormHelperText>
                )}
                {errors.price && errors.price.type === "pattern" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Please enter a valid number
                  </FormHelperText>
                )}

                {errors.price && errors.price.type === "min" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price must be a positive number
                  </FormHelperText>
                )}
                {errors.price && errors.price.type === "max" && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    Price must be up to 10,000
                  </FormHelperText>
                )}
              </Box>
              <Box mt={2} mb={2}>
                <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
                  <FormLabel>Upload Main Image</FormLabel>
                  <OutlinedInput
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    {...register("image1", { required: true })}
                    onChange={handleImage1Upload}
                  />
                  {errors.image1 && errors.image1.type === "required" && (
                    <FormHelperText sx={{ fontSize: 12 }} error>
                      Image is required
                    </FormHelperText>
                  )}
                </FormControl>
                {image1 && (
                  <Box
                    mt={2}
                    mb={2}
                    maxWidth="90%"
                    maxHeight="300px"
                    overflow="hidden"
                  >
                    <img
                      src={URL.createObjectURL(image1)}
                      alt="uploaded"
                      style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
                  </Box>
                )}
              </Box>
              <Box mt={2} mb={2}>
                <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
                  <FormLabel>Upload Second Image</FormLabel>
                  <OutlinedInput
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    {...register("image2")}
                    onChange={handleImage2Upload}
                  />
                </FormControl>
                {image2 && (
                  <Box
                    mt={2}
                    mb={2}
                    maxWidth="90%"
                    maxHeight="300px"
                    overflow="hidden"
                  >
                    <img
                      src={URL.createObjectURL(image2)}
                      alt="uploaded"
                      style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
                  </Box>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Product
              </Button>
              <Button
                variant="contained"
                type="reset"
                color="inherit"
                onClick={navigateBack}
              >
                Cancel
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default CreateProduct;
