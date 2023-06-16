class PromotionModel {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    percentageDiscount: number;
    amountDiscount: number;
    finalPriceDiscount: number;
    products: string;
    isActive: boolean;

    categories: string[];

  }
  
  export default PromotionModel;
  