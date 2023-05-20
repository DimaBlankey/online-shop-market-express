import { useEffect, useState } from "react";
import OrderModel from "../../../Models/OrderModel";
import "./OrderHistory.css";
import orderService from "../../../Services/OrderService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

function OrderHistory(): JSX.Element {

    const [orders, setOrders] = useState<OrderModel[]>([])

    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
      setUser(authStore.getState().user);
      const unsubscribe = authStore.subscribe(() => {
        setUser(authStore.getState().user);
      });
      return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
          orderService
            .getOrderByUser(user.id)
            .then((responseOrders) => {
              setOrders(responseOrders);
            })
            .catch((err) => notifyService.error(err));
        }
      }, [user]);

    return (
      <div className="OrderHistory scrollbar">
      <Typography variant="h4">Order History</Typography>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          const productsAndQuantity = JSON.parse(order.productsAndQuantity);
    
          return (
            <Card key={index} sx={{ margin: "10px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Order #{order.id}
                </Typography>
                <Typography variant="h5" component="div">
                  Order Date: {new Date(order.dateOfPurchase).toLocaleDateString()}
                </Typography>
                <Typography variant="h5" component="div">
                  Order Total ${order.totalPrice}
                </Typography>
                <Typography variant="body2">
                  Delivery Date: {new Date(order.dateOfDelivery).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  City: {order.city}
                </Typography>
                <Typography variant="body2">
                  Address: {order.address}
                </Typography>
                <List>
                  {productsAndQuantity.map((product: any, productIndex: number) => (
                    <ListItem key={productIndex}>
                      <Typography variant="body2">
                        {product.name}, Quantity: {product.quantity}, Price: {product.price} {product.salePrice ? `(Sale Price: ${product.salePrice})` : ""}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div>No orders yet...</div>
      )}
    </div>
    
    );
}

export default OrderHistory;
