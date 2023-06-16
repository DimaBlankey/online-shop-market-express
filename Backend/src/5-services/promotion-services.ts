import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import PromotionModel from "../2-models/promotion-model";
import { ResourceNotFoundError } from "../2-models/client-errors";

async function getAllPromotions(): Promise<PromotionModel[]> {
  const sql = `
  SELECT *
  FROM promotions
  ORDER BY isActive DESC, startDate ASC;
    `;
  const promotions = await dal.execute(sql);
  return promotions;
}

async function addPromotion(
  promotion: PromotionModel
): Promise<PromotionModel> {
  // DO validations
  const sql = `
  INSERT INTO promotions VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const isActive = false;
  const result: OkPacket = await dal.execute(sql, [
    promotion.name,
    promotion.startDate,
    promotion.endDate,
    promotion.percentageDiscount,
    promotion.amountDiscount,
    promotion.finalPriceDiscount,
    promotion.products,
    isActive,
  ]);

  promotion.id = result.insertId;

  return promotion;
}

async function promotionStatus(
  promotion: PromotionModel
): Promise<PromotionModel> {
  // Do validation
  const sql = `
  UPDATE promotions SET
  isActive = ?
  WHERE id = ?
  `;
  const result: OkPacket = await dal.execute(sql, [
    promotion.isActive,
    promotion.id,
  ]);

  if (result.affectedRows === 0) {
    throw new ResourceNotFoundError(promotion.id);
  }

  return promotion;
}

async function deletePromotion(id: number): Promise<void> {

  const sqlCheck = `
  SELECT isActive FROM promotions WHERE id = ?
  `;
  const status = await dal.execute(sqlCheck, [id]);

  if (status[0].isActive === 1) {
    return;
  }

  const sql = `
  DELETE FROM promotions WHERE id = ?
  `;
  const result: OkPacket = await dal.execute(sql, [id]);
  if (result.affectedRows === 0) throw new ResourceNotFoundError(id);
}

export default {
  getAllPromotions,
  addPromotion,
  promotionStatus,
  deletePromotion,
};
