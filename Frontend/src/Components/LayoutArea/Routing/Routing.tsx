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
          <Route path="/checkout" element={<Checkout />} />
        </>
      )}
      {role === 2 && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </>
      )}

      {<></>}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
