"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controller/category.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.default.getAllCategory);
router.get("/:id", category_controller_1.default.getCategoryById);
router.get("/name/:name", category_controller_1.default.getCategoryByName);
router.post("/", chackToken_1.chackTokenMiddleware, category_controller_1.default.createCategory);
router.put("/:id", chackToken_1.chackTokenMiddleware, category_controller_1.default.updateCategory);
router.delete("/:id", chackToken_1.chackTokenMiddleware, category_controller_1.default.deleteCategory);
exports.default = { router };
//# sourceMappingURL=category.router.js.map