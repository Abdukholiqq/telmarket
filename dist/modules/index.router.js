"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_router_1 = __importDefault(require("./admins/router/admin.router"));
const user_router_1 = __importDefault(require("./users/router/user.router"));
const category_router_1 = __importDefault(require("./category/router/category.router"));
const product_router_1 = __importDefault(require("./products/router/product.router"));
const order_router_1 = __importDefault(require("./orderInformation/router/order.router"));
const cart_router_1 = __importDefault(require("./additional/router/cart.router"));
const router = (0, express_1.Router)();
router.use("/admin", admin_router_1.default.router);
router.use("/users", user_router_1.default.router);
router.use("/category", category_router_1.default.router);
router.use("/products", product_router_1.default.router);
router.use("/orders", order_router_1.default.router);
router.use("/cart", cart_router_1.default.router);
exports.default = router;
//# sourceMappingURL=index.router.js.map