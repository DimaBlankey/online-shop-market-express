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

  useEffect(() => {
    productsService
      .getAllProducts()
      .then((responseProducts) => {
        setProducts(responseProducts);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  return (
    <div className="ProductsList">
      <div className="ProductsList-cards">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
