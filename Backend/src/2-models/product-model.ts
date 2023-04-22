import { UploadedFile } from "express-fileupload";

class ProductModel {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  image1: UploadedFile;
  image1Url: string;
  image2: UploadedFile;
  image2Url: string;
  salePrice: number;
  saleStartDate: string;
  saleEndDate: string;
  productCode: string;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.categoryId = product.categoryId;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.image1 = product.image1;
    this.image1Url = product.image1Url;
    this.image2 = product.image2;
    this.image2Url = product.image2Url;
    this.salePrice = product.salePrice;
    this.saleStartDate = product.saleStartDate;
    this.saleEndDate = product.saleEndDate;
    this.productCode = product.productCode;
  }

//   Do Validation!

}

export default ProductModel;
