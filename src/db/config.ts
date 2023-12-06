import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  username:   "postgres",
  host: "localhost",
  port: 5432,
  database: "telmarket",
  password: "20020",
  dialect: "postgres",
  logging: false
});
// console.log(DB_PORT);

export const bootstrap = async ()=> {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("db connection");
  } catch (error: any) {
    console.log("db error, ", error.message);
  }
};

export default sequelize;
