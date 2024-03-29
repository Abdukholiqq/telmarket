"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "automarket";
exports.default = {
    sign: (payload) => jsonwebtoken_1.default.sign(payload, SECRET_KEY),
    verify: (token) => jsonwebtoken_1.default.verify(token, SECRET_KEY),
};
//# sourceMappingURL=jwt.js.map