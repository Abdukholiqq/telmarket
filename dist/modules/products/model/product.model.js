"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../db/config"));
class ProductModel extends sequelize_1.Model {
}
ProductModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nfc: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    ekran_chastotasi: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    protsessor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    old_kamera: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orqa_kamera: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sim_karta_formati: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sim_kartalar_soni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    operatsion_system_version: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aloqa_standarti: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bluetooth_standarti: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    vazn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    batary_power: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ekran_nisbati: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ekran_texnologiyasi: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ekran_size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    doimiy_xotira: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    operativ_xotira: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    show: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    sold_out: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    MainImage: sequelize_1.DataTypes.STRING,
    BackImage: sequelize_1.DataTypes.STRING,
    categoryId: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: config_1.default,
    tableName: "products",
    underscored: true,
});
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map