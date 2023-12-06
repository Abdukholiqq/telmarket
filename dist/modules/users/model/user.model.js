"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../../db/config"));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: sequelize_1.DataTypes.STRING(32),
    lastname: sequelize_1.DataTypes.STRING(32),
    password: sequelize_1.DataTypes.STRING,
    avatar: sequelize_1.DataTypes.STRING,
}, {
    sequelize: config_1.default,
    tableName: "users",
    underscored: true,
});
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map