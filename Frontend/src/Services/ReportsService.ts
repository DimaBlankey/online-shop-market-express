import axios from "axios";
import appConfig from "../Utils/AppConfig";

class ReportsService {
  public async getProductsSold(
    beginDate: string,
    endDate: string
  ): Promise<string> {
    const response = await axios.get<string>(
      appConfig.reportsUrl + `${beginDate}/${endDate}`
    );
    const productsSold = response.data;
    return productsSold;
  }
}

const reportsService = new ReportsService();

export default reportsService;
