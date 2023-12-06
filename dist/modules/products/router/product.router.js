"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const router = (0, express_1.Router)();
router.get("/", product_controller_1.default.getAllProducts);
router.get('/search', product_controller_1.default.search);
router.get("/:id", product_controller_1.default.getProductById);
router.post("/", chackToken_1.chackTokenMiddleware, product_controller_1.default.createProduct);
router.patch("/:id", chackToken_1.chackTokenMiddleware, product_controller_1.default.updateProduct);
router.delete("/:id", chackToken_1.chackTokenMiddleware, product_controller_1.default.deleteProduct);
exports.default = { router };
//# sourceMappingURL=product.router.js.map