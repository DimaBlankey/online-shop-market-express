import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import SignUp from "../../AuthArea/SignUp/SignUp";
import Login from "../../AuthArea/Login/Login";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import AddressForm from "../../CheckoutArea/AddressForm/AddressForm";
import Checkout from "../../CheckoutArea/Checkout/Checkout";
import OrderConfirmed from "../../CheckoutArea/OrderConfirmed/OrderConfirmed";
import ProductPage from "../../ProductsArea/ProductPage/ProductPage";
import ProductModel from "../../../Models/ProductModel";
import { useParams } from "react-router-dom";
import MyAccount from "../../AccountArea/MyAccount/MyAccount";


function Routing(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  const role = authStore.getState().user?.roleId;

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {role === 1 && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productCode" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/my-account" element={<MyAccount />} />
        </>
      )}
      {role === 2 && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productCode" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/my-account" element={<MyAccount />} />
        </>
      )}

      {<></>}
      <Route path="/product/:productCode" element={<ProductPage />} />
      <Route path="/checkout" element={<Navigate to="/home" />} />
      <Route path="/order-confirmed" element={<Navigate to="/home" />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
