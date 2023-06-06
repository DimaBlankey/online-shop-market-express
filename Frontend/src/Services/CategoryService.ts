import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CategoryModel from "../Models/CategoryModel";

class CategoryService {
  public async getAllCategories(): Promise<CategoryModel[]> {
    const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
    const categories = response.data;
    return categories;
  }
}

const categoryService = new CategoryService();

export default categoryService;
