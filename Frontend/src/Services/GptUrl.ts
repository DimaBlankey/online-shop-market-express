import axios from "axios";
import appConfig from "../Utils/AppConfig";

class GptService {
  public async getRecipe(searchValue: string): Promise<string> {
    const response = await axios.post<string>(appConfig.gptUrl + searchValue);
    const recipe = response.data;
    return recipe;
  }
}

const gptService = new GptService();

export default gptService;
