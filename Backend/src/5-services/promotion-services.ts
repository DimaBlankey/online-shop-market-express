import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import PromotionModel from "../2-models/promotion-model";

async function getAllPromotions(): Promise<PromotionModel[]> {
  const sql = `
    SELECT *
    FROM promotions
    `;
  const promotions = await dal.execute(sql);
  return promotions;
}

export default {
  getAllPromotions,
};
