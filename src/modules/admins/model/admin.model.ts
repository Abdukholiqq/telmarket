import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";

class AdminModels extends Model {}

AdminModels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "admins",
    underscored: true,
  }
);

export default AdminModels;
