"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chackTokenMiddleware = void 0;
const jwt_1 = __importDefault(require("./jwt"));
const chackTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const access_token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ").length) == 2
            ? authHeader.split(" ")[1]
            : authHeader;
        const chackToken = jwt_1.default.verify(access_token);
        console.log(chackToken);
        // if (!chackToken) {
        //   return res.status(404).json({
        //     status: 404,
        //     message: "Token Required !!!",
        //   });
        // }
        // const isAdmin = chackToken.isAdmin
        if (token) {
            // Token borligini tekshiramiz
            jwt_1.default.verify(token, "sir_secret_kalit", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Token xatosi" });
                }
                // Agar token to'g'ri bo'lsa, req.user ga identifikatsiya ma'lumotini o'rnating
                req.user = decoded;
                next();
            });
        }
        else {
            // Agar token yo'q bo'lsa 403 - Forbidden qaytariladi
            res.status(403).json({ message: "Token yoki muvaffaqiyatsizlik" });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
};
exports.chackTokenMiddleware = chackTokenMiddleware;
//# sourceMappingURL=chackTokenMiddleware.js.map