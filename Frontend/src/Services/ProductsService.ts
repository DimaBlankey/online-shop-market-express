import axios from "axios";
import appConfig from "../Utils/AppConfig";
import ProductModel from "../Models/ProductModel";
import { ProductsActionType, productsStore } from "../Redux/ProductState";

class ProductsService {
  
  public async getAllProducts(): Promise<ProductModel[]> {
    let products = productsStore.getState().products;
    if (products.length === 0) {
      const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
      products = response.data;
      productsStore.dispatch({
        type: ProductsActionType.FetchProducts,
        payload: products,
      });
    }
    return products;
  }

  public async getOneProduct(productCode: string): Promise<ProductModel> {
    let products = productsStore.getState().products;
    let product = products.find((p) => p.productCode === productCode);

    if (!product) {
      const response = await axios.get<ProductModel>(
        appConfig.productsUrl + productCode
      );
      product = response.data;
    }
    return product;
  }
}

const productsService = new ProductsService();

export default productsService;
