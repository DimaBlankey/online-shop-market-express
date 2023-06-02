import axios from "axios";
import appConfig from "../Utils/AppConfig";

export  interface RecipeResponse {
  ingredients: string;
  instructions: string;
  products: string;
}

class GptService {
  public async getRecipe(searchValue: string): Promise<RecipeResponse> {
    const response = await axios.post<RecipeResponse>(appConfig.gptUrl + searchValue);
    const recipe = response.data;
    return recipe;
  }
}

const gptService = new GptService();

export default gptService;
