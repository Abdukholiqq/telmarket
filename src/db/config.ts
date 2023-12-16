import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env. DB_DATABASE,
  password:  process.env.DB_PASSWORD, 
  dialect: "postgres",
  logging: false,
}); 

 ( async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("db connection");
  } catch (error: any) {
    console.log("db error, ", error.message);
  }
})();

export default sequelize;
