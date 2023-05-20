import { useEffect, useState } from "react";
import "./PersonalInfo.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { Card, CardContent, Fab, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { Link } from "react-router-dom";

function PersonalInfo(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Spinner></Spinner>
  }

  return (
    <div className="PersonalInfo">
      <Card sx={{ minWidth: 275 , padding: 5}}>
        <CardContent>
          <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
          <Typography variant="h4">My Info</Typography>
          <Typography variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            ID: {user.idCardNumber}
          </Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
          <Typography variant="body2">City: {user.city}</Typography>
          <Typography variant="body2">Address: {user.address}</Typography>
        </CardContent>
        <Link to={"/update-my-info"}>
        <Fab color="default" aria-label="edit">
          <EditIcon />
        </Fab>
        </Link>
      </Card>
    </div>
  );
}

export default PersonalInfo;
