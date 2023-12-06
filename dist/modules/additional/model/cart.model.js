"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../db/config"));
const user_model_1 = __importDefault(require("../../users/model/user.model"));
const product_model_1 = __importDefault(require("../../products/model/product.model"));
class CartModel extends sequelize_1.Model {
}
CartModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: config_1.default,
    tableName: "carts",
    underscored: true,
});
CartModel.hasMany(product_model_1.default, { foreignKey: "id" });
CartModel.hasMany(user_model_1.default, { foreignKey: "id" });
product_model_1.default.belongsTo(CartModel);
user_model_1.default.belongsTo(CartModel);
exports.default = CartModel;
//# sourceMappingURL=cart.model.js.map