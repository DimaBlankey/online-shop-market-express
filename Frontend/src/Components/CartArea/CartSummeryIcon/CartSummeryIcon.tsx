import { useEffect, useState } from "react";
import "./CartSummeryIcon.css";
import CartItemModel from "../../../Models/CartItemModel";
import { cartStore } from "../../../Redux/CartState";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CartSummeryIcon(): JSX.Element {
  const [items, setItems] = useState<CartItemModel[]>([]);

  useEffect(() => {
    setItems(cartStore.getState().items);
    const unsubscribe = cartStore.subscribe(() => {
      const newItems = cartStore.getState().items;
      setItems(newItems);
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
