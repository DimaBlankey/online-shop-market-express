import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import logger from "../4-utils/logger";
import CategoryModel from "../2-models/category-model";

async function getAllCategories(): Promise<CategoryModel[]> {
  const sql = `
    SELECT * 
    FROM categories
    `;
  const categories = await dal.execute(sql);
  return categories;
}

export default {
  getAllCategories,
};
