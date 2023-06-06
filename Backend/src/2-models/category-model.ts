class CategoryModel {
  id: number;
  categoryName: string;

  public constructor(category: CategoryModel) {
    this.id = category.id;
    this.categoryName = category.categoryName;
  }
}

export default CategoryModel;
