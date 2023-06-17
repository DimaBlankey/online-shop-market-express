import axios from "axios";
import appConfig from "../Utils/AppConfig";
import PromotionModel from "../Models/PromotionModel";
import { PromotionsActionType, promotionsStore } from "../Redux/PromotionState";

class PromotionService {
  public async addPromotion(promotion: PromotionModel): Promise<void> {
    const response = await axios.post<PromotionModel>(
      appConfig.promotionsUrl,
      promotion
    );
    const addedPromotion = response.data;
    promotionsStore.dispatch({
      type: PromotionsActionType.AddPromotion,
      payload: addedPromotion,
    });
  }

  public async getAllPromotions(): Promise<PromotionModel[]> {
    let promotions = promotionsStore.getState().promotions;

    if (promotions.length === 0) {
      const response = await axios.get<PromotionModel[]>(
        appConfig.promotionsUrl
      );
      promotions = response.data.map((promotion) => ({
        ...promotion,
        isActive: Boolean(promotion.isActive),
      }));
      promotionsStore.dispatch({
        type: PromotionsActionType.FetchPromotions,
        payload: promotions,
      });
    }
    return promotions;
  }

  public async promotionStatus(promotion: PromotionModel): Promise<void> {
    const response = await axios.put<PromotionModel>(
      appConfig.promotionsUrl + promotion.id,
      promotion
    );
    const updatedPromotion = response.data;
    promotionsStore.dispatch({
      type: PromotionsActionType.UpdatePromotion,
      payload: updatedPromotion,
    });
  }

  public async deletePromotion(promotionId: number): Promise<void> {
    await axios.delete(appConfig.promotionsUrl + promotionId);
    promotionsStore.dispatch({
      type: PromotionsActionType.DeletePromotion,
      payload: promotionId,
    });
  }
}

const promotionService = new PromotionService();

export default promotionService;
