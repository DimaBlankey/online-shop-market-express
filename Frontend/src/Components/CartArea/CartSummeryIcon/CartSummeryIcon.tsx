import { useEffect, useState } from "react";
import "./CartSummeryIcon.css";
import CartItemModel from "../../../Models/CartItemModel";
import { cartStore } from "../../../Redux/CartState";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CartSummeryIcon(): JSX.Element {
  const [items, setItems] = useState<CartItemModel[]>([]);

  useEffect(() => {
    // Check for "cart" in local storage.
    const localStorageCart = localStorage.getItem("cart");
    if (localStorageCart) {
      // If it exists, parse it and set the items state.
      setItems(JSON.parse(localStorageCart));
    } else {
      // Otherwise, get the items from the cartStore.
      setItems(cartStore.getState().items);
    }

    const unsubscribe = cartStore.subscribe(() => {
      const newItems = cartStore.getState().items;
      setItems(newItems);
      // Update the "cart" in local storage every time the cartStore updates.
      localStorage.setItem("cart", JSON.stringify(newItems));
    });

    return () => unsubscribe();
  }, []);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="CartSummeryIcon">
      {totalQuantity > 0 ? (
        <Badge badgeContent={totalQuantity} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      ) : (
        <ShoppingCartIcon />
      )}
    </div>
  );
}

export default CartSummeryIcon;
