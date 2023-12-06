"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controller/cart.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const router = (0, express_1.Router)();
router.get('/', chackToken_1.chackTokenMiddleware, cart_controller_1.default.allCart);
router.post('/', chackToken_1.chackTokenMiddleware, cart_controller_1.default.AddCart);
router.delete('/:id', chackToken_1.chackTokenMiddleware, cart_controller_1.default.removeCart);
exports.default = { router };
//# sourceMappingURL=cart.router.js.map