"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../db/config"));
const user_model_1 = __importDefault(require("../../users/model/user.model"));
const product_model_1 = __importDefault(require("../../products/model/product.model"));
class OrderModel extends sequelize_1.Model {
}
OrderModel.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    // product_price: {type: DataTypes.INTEGER, allowNull: false},
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    sold_count: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1 },
    phone_number: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    viloyat: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    tuman: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    aholi_punkti: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    manzil: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    moljal: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
        defaultValue: "pending",
    },
}, { sequelize: config_1.default, tableName: "orders", underscored: true });
OrderModel.hasMany(product_model_1.default, { foreignKey: "id" });
// OrderModel.hasMany(ProductModel, { foreignKey: "product_price" }); 
OrderModel.hasMany(user_model_1.default, { foreignKey: "id" });
product_model_1.default.belongsTo(OrderModel);
user_model_1.default.belongsTo(OrderModel);
exports.default = OrderModel;
//# sourceMappingURL=order.model.js.map