"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const chackToken_1 = require("../../../utils/chackToken");
const router = (0, express_1.Router)();
router.get('/', chackToken_1.chackTokenMiddleware, user_controller_1.default.GetUser);
router.post('/register', user_controller_1.default.CreateUser);
router.post('/login', user_controller_1.default.SigninUser);
router.put('/', chackToken_1.chackTokenMiddleware, user_controller_1.default.UpdateUser);
exports.default = { router };
//# sourceMappingURL=user.router.js.map