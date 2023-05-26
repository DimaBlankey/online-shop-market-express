import { Container, Grid } from "@mui/material";
import Cart from "../Cart/Cart";
import "./CartPage.css";

function CartPage(): JSX.Element {
    return (
        <div className="CartPage">
			<Container maxWidth="lg">
                        <Cart />
            </Container>
        </div>
    );
}

export default CartPage;
