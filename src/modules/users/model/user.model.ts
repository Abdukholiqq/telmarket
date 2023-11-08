import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";

class UserModel extends Model{}
UserModel.init( 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING(32),
    lastname: DataTypes.STRING(32),
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
  }
); 

export default UserModel;
