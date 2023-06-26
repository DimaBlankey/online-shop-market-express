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
} from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import "./SignUp.css";
import UserModel from "../../../Models/UserModel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import HomeIcon from "@mui/icons-material/Home";

function SignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await authService.signUp(user);
      notifyService.success("Welcome!");
      const redirectToCheckout = window.location.href.includes("?checkout");
      navigate(redirectToCheckout ? "/checkout" : "/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="SignUp">
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
            // backdropFilter: "blur(20px)",
            width: "100%",
            maxWidth: "600px",
            mt: 2,

            borderColor: "gray.200",
            borderRadius: "30px",
            p: 4,
          }}
        >
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={handleSubmit(send)}>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <TextField
                      label="First Name"
                      placeholder="First Name..."
                      variant="outlined"
                      className="form-inputs"
                      {...register("firstName", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.firstName.type === "required" &&
                          "First name is required"}
                        {errors.firstName.type === "minLength" &&
                          "Name must be at least 2 characters"}
                        {errors.firstName.type === "maxLength" &&
                          "Name must be at most 50 characters"}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <TextField
                      label="Last Name"
                      placeholder="Last Name..."
                      variant="outlined"
                      className="form-inputs"
                      {...register("lastName", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.lastName.type === "required" &&
                          "Last name is required"}
                        {errors.lastName.type === "minLength" &&
                          "Name must be at least 2 characters"}
                        {errors.lastName.type === "maxLength" &&
                          "Name must be at most 50 characters"}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <TextField
                      label="City"
                      placeholder="City..."
                      variant="outlined"
                      className="form-inputs"
                      {...register("city", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.city && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.city.type === "required" && "City is required"}
                        {errors.city.type === "minLength" &&
                          "City must be at least 2 characters"}
                        {errors.city.type === "maxLength" &&
                          "City must be at most 50 characters"}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} mb={2}>
                    <TextField
                      label="Address"
                      placeholder="Address..."
                      variant="outlined"
                      className="form-inputs"
                      {...register("address", {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.address && (
                      <FormHelperText sx={{ fontSize: 12 }} error>
                        {errors.address.type === "required" &&
                          "Address  is required"}
                        {errors.address.type === "minLength" &&
                          "Address must be at least 2 characters"}
                        {errors.address.type === "maxLength" &&
                          "Address must be at most 50 characters"}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box mt={2} mb={2}>
                <TextField
                  type="text"
                  
                  label="ID"
                  placeholder="ID.."
                  variant="outlined"
                  className="form-inputs"
                  {...register("idCardNumber", {
                    required: true,
                    minLength: 9,
                    maxLength: 9,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "ID should contain only digits",
                    },
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    maxLength: 9,
                  }}
                />
                {errors.idCardNumber && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.idCardNumber.type === "required" &&
                      "ID is required"}
                    {errors.idCardNumber.type === "minLength" &&
                      "ID should be exactly 9 digits"}
                    {errors.idCardNumber.type === "maxLength" &&
                      "ID should be exactly 9 digits"}
                    {errors.idCardNumber.type === "pattern" &&
                      errors.idCardNumber.message}
                  </FormHelperText>
                )}
              </Box>
              <Box mt={2} mb={2}>
                <TextField
                  label="Email"
                  placeholder="Email..."
                  variant="outlined"
                  className="form-inputs"
                  type="email"
                  {...register("email", { required: true })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.email && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.email.type === "required" && "Email is required"}
                  </FormHelperText>
                )}
              </Box>

              <Box mt={2} mb={2}>
                <TextField
                  label="Password"
                  placeholder="Password..."
                  variant="outlined"
                  className="form-inputs"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <FiEye fontSize="small" />
                        ) : (
                          <FiEyeOff fontSize="small" />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {errors.password && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.password.type === "required" &&
                      "Password is required"}
                    {errors.password.type === "minLength" &&
                      "Password must be at least 8 characters"}
                    {errors.password.type === "maxLength" &&
                      "Password must be at most 30 characters"}
                  </FormHelperText>
                )}
              </Box>

              <Button variant="contained" type="submit" color="primary">
                Sign Me Up!
              </Button>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                You already have an account?{" "}
                <NavLink
                  to={
                    window.location.href.includes("?checkout")
                      ? "/login?checkout"
                      : "/login"
                  }
                  style={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Login
                </NavLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default SignUp;
