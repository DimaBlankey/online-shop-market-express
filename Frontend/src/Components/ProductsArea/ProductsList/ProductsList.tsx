import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import "./ProductsList.css";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import ProductCard from "../ProductCard/ProductCard";
import ResponsiveAppBar from "../ProductsNavBar/ProductsNavBar";
import ProductsSearch from "../ProductsSearch/ProductsSearch";
import { Padding } from "@mui/icons-material";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { Container } from "@mui/material";
import AdminMenu from "../../LayoutArea/AdminMenu/AdminMenu";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

function ProductsList(): JSX.Element {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<UserModel>();
  const role = authStore.getState().user?.roleId;
  
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    productsService
      .getAllProducts()
      .then((responseProducts) => {
        setProducts(responseProducts);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("All Products");
  };

  if(!products){
    return <Spinner></Spinner>
  }

  return (
    <div className="ProductsList">
      {role === 1 && (
      <AdminMenu />
      )}
      <ResponsiveAppBar onCategoryClick={handleCategoryClick} />
      <ProductsSearch onSearch={handleSearch} />
      <div className="ProductsList-cards scrollbar" style={{
          padding: "10px"
        }}>
      {products
  .filter(
    (p) =>
      (selectedCategory === "All Products" || p.categoryName === selectedCategory) &&
      (searchQuery === "" ||
        (p.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()))
  )
  .map((p) => (
    <ProductCard key={p.id} product={p} />
  ))}
      </div>
    </div>
  );
}

export default ProductsList;

