import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";
import  UserModel from "../../users/model/user.model"; 
import ProductModel from "../../products/model/product.model";
class CartModel extends Model{}
CartModel.init( 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, 
    },
    productId: {
      type: DataTypes.INTEGER, 
    },
  },
  {
    sequelize,
    tableName: "carts",
    underscored: true,
  }
);
CartModel.hasMany(ProductModel, { foreignKey: "id" });
CartModel.hasMany(UserModel, { foreignKey: "id" });
ProductModel.belongsTo(CartModel);
UserModel.belongsTo(CartModel);

export default CartModel