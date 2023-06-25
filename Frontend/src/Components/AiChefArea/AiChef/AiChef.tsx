import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import PromptField from "../PromptField/PromptField";
import "./AiChef.css";
import { RecipeResponse } from "../../../Services/GptService";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";
import video10 from "../../../Assets/videos/video10.mp4";

function AiChef(): JSX.Element {
  const [completion, setCompletion] = useState<RecipeResponse | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    productsService
      .getAllProducts()
      .then((responseProducts) => {
        setProducts(responseProducts);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  useEffect(() => {
    if (completion) {
      // Find the start of the JSON string
      let startOfJson = completion.products.lastIndexOf("[");
      if (startOfJson === -1) {
        console.error("Invalid JSON in completion.products");
        localStorage.removeItem("smartChef" + searchValue);
        return; // If the JSON is invalid, stop execution of this effect
      }

      // Extract the JSON string and parse it
      let productCodes: string[] = [];
      try {
        let jsonString = completion.products.slice(startOfJson);
        productCodes = JSON.parse(jsonString).map(
          (p: { productCode: string }) => p.productCode
        );
      } catch (error) {
        console.error("Invalid JSON in completion.products");
        localStorage.removeItem("smartChef" + searchValue);
        return; // If the JSON is invalid, stop execution of this effect
      }

      const filtered = products.filter((product) =>
        productCodes.includes(product.productCode)
      );
      setFilteredProducts(filtered);
    }
  }, [completion, products]);

  const handleCompletion = (completion: RecipeResponse) => {
    setCompletion(completion);
  };

  return (
    <div className="AiChef">
      <Typography variant={"h3"}>Smart Chef</Typography>
      <Typography variant={"h5"}>What would you like to eat today? </Typography>
      <PromptField onCompletion={handleCompletion} setLoading={setLoading} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {completion && completion.instructions && (
        <Box
          component="div"
          sx={{ maxWidth: "500px" }}
          m={1}
          className="completion"
        >
          {completion.instructions}
        </Box>
      )}

      <div className="ProductsList-cards scrollbar" style={{ padding: "10px" }}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div>
        {!completion && (
          <video autoPlay muted loop className="myVideo">
            <source src={video10} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
export default AiChef;
