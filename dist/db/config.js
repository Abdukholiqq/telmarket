"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const sequelize = new sequelize_1.Sequelize({
    username: "postgres",
    host: "localhost",
    port: 5432,
    database: "telmarket",
    password: "20020",
    dialect: "postgres",
    logging: false
});
// console.log(DB_PORT);
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield sequelize.sync({ alter: true });
        console.log("db connection");
    }
    catch (error) {
        console.log("db error, ", error.message);
    }
});
exports.bootstrap = bootstrap;
exports.default = sequelize;
//# sourceMappingURL=config.js.map