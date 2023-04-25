import { NavLink } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import ResponsiveAppBar from "../../ProductsArea/ProductsNavBar/ProductsNavBar";
import ProductsSearch from "../../ProductsArea/ProductsSearch/ProductsSearch";

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="Home">
      <>
        <ProductsList />
      </>
    </div>
  );
}

export default Home;
