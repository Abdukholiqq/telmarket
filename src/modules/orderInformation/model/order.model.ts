import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";
import UserModel from "../../users/model/user.model";
import ProductModel from "../../products/model/product.model";
import { OrderStatus } from "../../types";

class OrderModel extends Model {}

OrderModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    product_price: {type: DataTypes.INTEGER},
    userId: { type: DataTypes.INTEGER, allowNull: false },
    sold_count: { type: DataTypes.INTEGER, defaultValue: 1 },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: true },
    viloyat: { type: DataTypes.STRING, allowNull: true },
    tuman: { type: DataTypes.STRING, allowNull: true }, 
    aholi_punkti: { type: DataTypes.STRING, allowNull: true },
    manzil: { type: DataTypes.STRING, allowNull: true },
    moljal: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'), 
      defaultValue: "pending",
  },
  },
  { sequelize, tableName: "orders", underscored: true }
);

OrderModel.hasMany(ProductModel, { foreignKey: "id"  });
// OrderModel.hasMany(ProductModel, { foreignKey: "product_price" }); 
OrderModel.hasMany(UserModel, { foreignKey: "id" });
ProductModel.belongsTo(OrderModel);
UserModel.belongsTo(OrderModel);

export default OrderModel;
