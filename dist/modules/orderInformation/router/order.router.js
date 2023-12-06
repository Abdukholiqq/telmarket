"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const router = (0, express_1.Router)();
// Add new Order for Users
router.post("/:id", chackToken_1.chackTokenMiddleware, order_controller_1.default.createOrder);
// Get all orders for Users
router.get("/", chackToken_1.chackTokenMiddleware, order_controller_1.default.getOrders);
// Get selected Order for Users
router.get("/:id", chackToken_1.chackTokenMiddleware, order_controller_1.default.getOrdersById);
// Get all orders for Admin
router.get("/admin", chackToken_1.chackTokenMiddleware, order_controller_1.default.getOrdersAdmin);
// Get selected orders for Admin 
router.get("/admin/:id", chackToken_1.chackTokenMiddleware, order_controller_1.default.getOrdersByIdAdmin);
// chackOrder for admin panel
router.put("/admin/:id", chackToken_1.chackTokenMiddleware, order_controller_1.default.chackOrder);
exports.default = { router };
//# sourceMappingURL=order.router.js.map