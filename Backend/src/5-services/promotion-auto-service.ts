import { OkPacket } from "mysql";
import dal from "../4-utils/dal";
import logger from "../4-utils/logger";

async function dailyAutoPromotionService(): Promise<void> {
    const clearPromotions = `
      UPDATE products
      SET salePrice = NULL, 
      saleStartDate = NULL, 
      saleEndDate = NULL;
    `;
    await dal.execute(clearPromotions);
  
    const updatePromotionActivation = `
      UPDATE promotions
      SET isActive = 0
      WHERE endDate < CURDATE();
    `;
    await dal.execute(updatePromotionActivation);
  
    const findRelevantPromotions = `
      SELECT id, products, percentageDiscount, amountDiscount, finalPriceDiscount, startDate, endDate
      FROM promotions
      WHERE 
      CURDATE() BETWEEN startDate AND endDate AND isActive = 1;
    `;
    const relevantPromotions = await dal.execute(findRelevantPromotions);
  
    for (let promo of relevantPromotions) {
      const productCodes = JSON.parse(promo.products);
      for (let code of productCodes) {
        let newPrice = null;
        if (promo.percentageDiscount > 0) {
          const originalPrice = (await dal.execute(`SELECT price FROM products WHERE productCode = '${code}'`))[0].price;
          newPrice = originalPrice * (1 - promo.percentageDiscount / 100);
        } else if (promo.amountDiscount > 0) {
          const originalPrice = (await dal.execute(`SELECT price FROM products WHERE productCode = '${code}'`))[0].price;
          newPrice = Math.max(0, originalPrice - promo.amountDiscount);
        } else if (promo.finalPriceDiscount > 0) {
          newPrice = promo.finalPriceDiscount;
        }  
        if (newPrice !== null) {
          const updatePrice = `
          UPDATE products
          SET salePrice = ${newPrice}, 
          saleStartDate = '${new Date(promo.startDate.getTime() - promo.startDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]}', 
          saleEndDate = '${new Date(promo.endDate.getTime() - promo.endDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]}'
          WHERE productCode = '${code}';
        `;
          await dal.execute(updatePrice);
        }
      }
    }
  }
  
  export default {
    dailyAutoPromotionService,
  };
  