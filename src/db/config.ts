import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  host: "localhost",
  port: 5432,
  database: "telmarket",
  password: "20020",
  dialect: "postgres",
  logging: false
});
!(async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("db connection");
  } catch (error: any) {
    console.log("db error, ", error.message);
  }
})();

export default sequelize;
