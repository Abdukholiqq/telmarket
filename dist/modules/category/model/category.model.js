"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../db/config"));
const product_model_1 = __importDefault(require("../../products/model/product.model"));
class CategoryModel extends sequelize_1.Model {
}
CategoryModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: sequelize_1.DataTypes.STRING(32),
    category_image: sequelize_1.DataTypes.STRING,
}, {
    sequelize: config_1.default,
    tableName: "category",
    underscored: true,
});
CategoryModel.hasMany(product_model_1.default, { foreignKey: "categoryId" });
product_model_1.default.belongsTo(CategoryModel);
exports.default = CategoryModel;
//# sourceMappingURL=category.model.js.map