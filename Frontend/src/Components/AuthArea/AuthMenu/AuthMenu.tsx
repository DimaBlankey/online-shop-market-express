import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  function logout() {
    authService.logout();
    notifyService.success("Goodby!");
    navigate("/home");
  }

  return (
    <div className="AuthMenu">
      {!user && (
        <div>
          <NavLink  to="/login">
          <span>
            <AccountCircleIcon className="AccountCircleIcon" />{" "}
          </span>
          </NavLink>
          <NavLink className={"login-link"} to="/login">Login</NavLink>
          <span className={"login-link"}> | </span>
          <NavLink className={"sign-up-link"} to="/sign-up">Sign up</NavLink>
        </div>
      )}
      {user && (
        <div>
          <NavLink to="/my-account">
            <span>
              <AccountCircleIcon className="AccountCircleIcon" />
              <span className="user-name">Hello, {user.firstName} </span>
            </span>
          </NavLink>
          <NavLink to="/home" onClick={logout} className="LogoutLink">
            | Logout
          </NavLink>
          <NavLink to="/home" onClick={logout}>
            <LogoutIcon />
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
