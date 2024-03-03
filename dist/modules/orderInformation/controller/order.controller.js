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
const order_model_1 = __importDefault(require("../model/order.model"));
const product_model_1 = __importDefault(require("../../products/model/product.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        const id = req.params.id;
        const productCount = yield product_model_1.default.findOne({ where: { id } });
        if (data.sold_count > (productCount === null || productCount === void 0 ? void 0 : productCount.dataValues.count)) {
            return res.status(400).json({
                status: 400,
                message: `Do'konda faqat ${productCount === null || productCount === void 0 ? void 0 : productCount.dataValues.count} mahsulot qolgan`,
            });
        }
        yield product_model_1.default.update({ sold_out: (productCount === null || productCount === void 0 ? void 0 : productCount.dataValues.sold_out) + data.sold_count }, { where: { id } });
        const newData = yield order_model_1.default.create(Object.assign(Object.assign({}, data), { product_price: productCount === null || productCount === void 0 ? void 0 : productCount.dataValues.price, userId: (_a = req.token) === null || _a === void 0 ? void 0 : _a.id, productId: id }));
        return res.status(201).json({
            status: 201,
            message: "success",
            data: newData,
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
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const orders = yield order_model_1.default.findAll({
            where: {
                userId: (_b = req.token) === null || _b === void 0 ? void 0 : _b.id,
            },
            include: [{ all: true }],
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: orders,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const getOrdersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = req.params.id;
        const order = yield order_model_1.default.findAll({
            where: {
                userId: (_c = req.token) === null || _c === void 0 ? void 0 : _c.id,
                id,
            },
            include: [{ all: true }],
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: order,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
// get all Orders for Admin
const getOrdersAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        if ((_d = req.token) === null || _d === void 0 ? void 0 : _d.isAdmin) {
            return res.status(400).json({
                status: 400,
                message: "Your not is Admin",
            });
        }
        const orders = yield order_model_1.default.findAll({
            include: [{ all: true }],
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: orders,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
// get Order with ID for Admin
const getOrdersByIdAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = req.params.id;
        if ((_e = req.token) === null || _e === void 0 ? void 0 : _e.isAdmin) {
            return res.status(400).json({
                status: 400,
                message: "Your not is Admin",
            });
        }
        const order = yield order_model_1.default.findAll({
            where: {
                id,
            },
            include: [{ all: true }],
        });
        res.status(200).json({
            status: 200,
            message: "success",
            data: order,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
// chackOrder for admin panel
const chackOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const id = req.params.id;
        const newStatus = req.body.status;
        if ((_f = req.token) === null || _f === void 0 ? void 0 : _f.isAdmin) {
            return res.status(400).json({
                status: 400,
                message: "Your not is Admin",
            });
        }
        const chackOrder = yield order_model_1.default.findOne({ where: { id } });
        if (!chackOrder) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }
        yield order_model_1.default.update({ status: newStatus }, { where: { id } });
        res.status(201).json({
            status: 201,
            message: "updated",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.default = {
    createOrder,
    getOrders,
    getOrdersById,
    getOrdersAdmin,
    getOrdersByIdAdmin,
    chackOrder,
};
//# sourceMappingURL=order.controller.js.map