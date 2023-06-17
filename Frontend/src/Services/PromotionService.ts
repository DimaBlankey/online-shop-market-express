import axios from "axios";
import appConfig from "../Utils/AppConfig";
import PromotionModel from "../Models/PromotionModel";

class PromotionService {
  public async addPromotion(promotion: PromotionModel): Promise<void> {
    const response = await axios.post<PromotionModel>(
      appConfig.promotionsUrl,
      promotion
    );
  }

  public async getAllPromotions(): Promise<PromotionModel[]> {
    const response = await axios.get<PromotionModel[]>(appConfig.promotionsUrl);
    const promotions = response.data.map((promotion) => ({
      ...promotion,
      isActive: Boolean(promotion.isActive),
    }));
    return promotions;
  }

  public async promotionStatus(promotion: PromotionModel): Promise<void> {
    const response = await axios.put<PromotionModel>(
      appConfig.promotionsUrl + promotion.id,
      promotion
    );
  }

  public async deletePromotion(promotionId: number): Promise<void> {
    await axios.delete(appConfig.promotionsUrl + promotionId);
  }
}

const promotionService = new PromotionService();

export default promotionService;
