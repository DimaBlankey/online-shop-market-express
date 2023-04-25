import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import "./ProductsList.css";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import ProductCard from "../ProductCard/ProductCard";
import ResponsiveAppBar from "../ProductsNavBar/ProductsNavBar";
import ProductsSearch from "../ProductsSearch/ProductsSearch";

function ProductsList(): JSX.Element {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className="ProductsList">
      <ResponsiveAppBar onCategoryClick={handleCategoryClick} />
      <ProductsSearch onSearch={handleSearch} />
      <div className="ProductsList-cards">
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

