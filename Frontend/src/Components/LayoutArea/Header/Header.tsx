import { Link } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import CartSummeryIcon from "../../CartArea/CartSummeryIcon/CartSummeryIcon";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <Menu />
      <div className="cart-icon-summery">
      <Link to={"/cart"}>
      <CartSummeryIcon />
      </Link>
      </div>
      <AuthMenu />
    </div>
  );
}

export default Header;
