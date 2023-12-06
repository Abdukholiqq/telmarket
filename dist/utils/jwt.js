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
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// // Middleware
// export function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   // Tokenni request headeridan olib olamiz
//   const token = req.headers['authorization'];
//   if (token) {
//     // Token borligini tekshiramiz
//     jwt.verify(token, 'sir_secret_kalit', (err, decoded ) => {
//       if (err) {
//         return res.status(403).json({ message: 'Token xatosi' });
//       }
//       // Agar token to'g'ri bo'lsa, req.user ga identifikatsiya ma'lumotini o'rnating
//       req.user = decoded;
//       next();
//     });
//   } else {
//     // Agar token yo'q bo'lsa 403 - Forbidden qaytariladi
//     res.status(403).json({ message: 'Token yoki muvaffaqiyatsizlik' });
//   }
// }
//# sourceMappingURL=jwt.js.map