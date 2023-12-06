"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", admin_controller_1.default.RegisterAdmin);
router.post("/login", admin_controller_1.default.SigninAdmin);
router.get("/", chackToken_1.chackTokenMiddleware, admin_controller_1.default.GetAdmin);
router.put("/", chackToken_1.chackTokenMiddleware, admin_controller_1.default.UpdateAdmin);
exports.default = { router };
//# sourceMappingURL=admin.router.js.map