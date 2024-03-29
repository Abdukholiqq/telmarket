"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chackTokenMiddleware = void 0;
const jwt_1 = __importDefault(require("../utils/jwt"));
const chackTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const access_token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ").length) == 2
            ? authHeader.split(" ")[1]
            : authHeader;
        const chackToken = jwt_1.default.verify(access_token);
        req.token = chackToken;
        if (!chackToken) {
            return res.status(404).json({
                status: 404,
                message: "Token Required !!!",
            });
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
//# sourceMappingURL=chackToken.js.map