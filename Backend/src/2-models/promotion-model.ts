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

  public constructor(promotion: PromotionModel) {
    this.id = promotion.id;
    this.name = promotion.name;
    this.startDate = promotion.startDate;
    this.endDate = promotion.endDate;
    this.percentageDiscount = promotion.percentageDiscount;
    this.amountDiscount = promotion.amountDiscount;
    this.finalPriceDiscount = promotion.finalPriceDiscount;
    this.products = promotion.products;
    this.isActive = promotion.isActive;
  }

// Do Validations!  

}

export default PromotionModel;
