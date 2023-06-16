class PromotionModel {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    percentageDiscount: number;
    amountDiscount: number;
    finalPriceDiscount: number;
    products: JSON;
    isActive: boolean;
  }
  
  export default PromotionModel;
  