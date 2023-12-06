"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("../model/cart.model"));
const AddCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = +req.body.id;
        const addProduct = yield cart_model_1.default.create({
            userId: (_a = req.token) === null || _a === void 0 ? void 0 : _a.id,
            productId,
        });
        return res.status(201).json({
            message: "success",
            data: addProduct,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const allCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const productId = +req.body.id;
        const allCart = yield cart_model_1.default.findAll({
            where: { userId: (_b = req.token) === null || _b === void 0 ? void 0 : _b.id },
            include: [{ all: true }],
        });
        res.status(200).json({
            message: "success",
            data: allCart,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const removeCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const productId = +req.params.id;
        const removeItem = yield cart_model_1.default.destroy({
            where: {
                productId,
                userId: (_c = req.token) === null || _c === void 0 ? void 0 : _c.id,
            },
        });
        return res.status(201).json({
            message: "success",
            data: removeItem,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.default = { AddCart, removeCart, allCart };
//# sourceMappingURL=cart.controller.js.map