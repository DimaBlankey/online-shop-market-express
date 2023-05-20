import { useEffect, useState } from "react";
import "./PersonalInfo.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { Card, CardContent, Typography } from "@mui/material";

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
        return <div>Loading...</div>;
      }

    return (
        <div className="PersonalInfo">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                ID: {user.idCardNumber}
              </Typography>
              <Typography variant="body2">
                Email: {user.email}
              </Typography>
              <Typography variant="body2">
                City: {user.city}
              </Typography>
              <Typography variant="body2">
                Address: {user.address}
              </Typography>
            </CardContent>
          </Card>
        </div>
    );
}

export default PersonalInfo;
