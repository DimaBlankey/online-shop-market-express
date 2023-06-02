import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">
        <HomeIcon />
      </NavLink>
      <NavLink to="/home" className={"HomeLink"}>
        Home
      </NavLink>
      <NavLink to={"/ai-powered-personal-chef"}>
      <SmartToyIcon className="SmartToyIcon"></SmartToyIcon>
      Smart Chef
      </NavLink>
    </div>
  );
}

export default Menu;
