import "./UpdateUserInfo.css";
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
import UserModel from "../../../Models/UserModel";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import HomeIcon from "@mui/icons-material/Home";
import { authStore } from "../../../Redux/AuthState";
import userService from "../../../Services/UserService";

function UpdateUserInfo(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

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
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserModel>();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      try {
        setValue("id", user.id);
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("city", user.city);
        setValue("address", user.address);
        setValue("email", user.email);
        setValue("idCardNumber", user.idCardNumber);
      } catch (error) {
        notifyService.error(error);
      }
    }
  }, [user]);

  async function send(user: UserModel) {
    try {
      await userService.updateUser(user);
      notifyService.success("Info Updated!");
      navigate("/my-account");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  function navigateBack() {
    navigate("/my-account");
  }

  return (
    <div className="UpdateUserInfo">
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
          <Typography variant="h5">My Info</Typography>
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

              {/* Change it to number!!!! An add Validaion!!! */}
              <Box mt={2} mb={2}>
                <TextField
                  label="ID"
                  placeholder="ID.."
                  variant="outlined"
                  className="form-inputs"
                  {...register("idCardNumber", {
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
                {errors.idCardNumber && (
                  <FormHelperText sx={{ fontSize: 12 }} error>
                    {errors.idCardNumber.type === "required" &&
                      "ID is required"}
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

              <Button variant="contained" type="submit" color="primary"  sx={{ mt: 3, mb: 2 }}>
                Update
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

export default UpdateUserInfo;
