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
      let product = response.data;
    }
    return product;
  }

  public async addProduct(product: ProductModel): Promise<void> {
    var bodyFormData = new FormData();
    Object.entries(product).forEach(([key, value]: [string, any]) => {
      if (value?.$d) {
        value = value.$d.toJSON();
      }
      bodyFormData.append(key, value);
    });

    const response = await axios({
      method: "post",
      url: appConfig.productsUrl,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const addedProduct = response.data;
    productsStore.dispatch({
      type: ProductsActionType.AddProducts,
      payload: addedProduct,
    });
  }

  public async updateProduct(product: ProductModel): Promise<void> {
    var bodyFormData = new FormData();
    Object.entries(product).forEach(([key, value]: [string, any]) => {
      if (value?.$d) {
        value = value.$d.toJSON();
      }
      bodyFormData.append(key, value);
    });

    const response = await axios({
      method: "put",
      url: appConfig.productsUrl + product.productCode,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updatedProduct = response.data;
    productsStore.dispatch({
      type: ProductsActionType.UpdateProducts,
      payload: updatedProduct,
    });
  }



  public async deleteProduct(productCode: string): Promise<void> {
    await axios.delete(appConfig.productsUrl + productCode);
    productsStore.dispatch({
      type: ProductsActionType.DeleteProducts,
      payload: productCode,
    });
  }
}

const productsService = new ProductsService();

export default productsService;
