class ProductModel {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    image1: File;
    image1Url: string;
    image2: File;
    image2Url: string;
    salePrice: number;
    saleStartDate: string;
    saleEndDate: string;
    productCode: string;

    // extended:
    categoryName: string
}

export default ProductModel

