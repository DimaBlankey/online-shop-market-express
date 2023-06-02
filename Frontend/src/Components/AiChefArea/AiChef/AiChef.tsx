import { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import PromptField from "../PromptField/PromptField";
import "./AiChef.css";
import { RecipeResponse } from "../../../Services/GptService";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import ProductCard from "../../ProductsArea/ProductCard/ProductCard";

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
      // Check if completion.products is a valid JSON
      let productCodes: string[] = [];
      try {
        productCodes = JSON.parse(completion.products).map(
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
      <Box
        component="div"
        sx={{ maxWidth: "500px" }}
        m={1}
        className="completion"
      >
        {completion?.instructions}
      </Box>
      <div className="ProductsList-cards scrollbar" style={{ padding: "10px" }}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
export default AiChef;
