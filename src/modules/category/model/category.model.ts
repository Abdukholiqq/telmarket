import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";
import ProductModel from "../../products/model/product.model";
class CategoryModel extends Model {}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: DataTypes.STRING(32),
    category_image: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "category",
    underscored: true,
  }
);

CategoryModel.hasMany(ProductModel, { foreignKey: "categoryId" });
ProductModel.belongsTo(CategoryModel);

export default CategoryModel;
