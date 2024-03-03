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
const path_1 = require("path");
const product_model_1 = __importDefault(require("../model/product.model"));
const category_model_1 = __importDefault(require("../../category/model/category.model"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  istalgan odam  ko'ra olishi mumkin
        const allProducs = yield product_model_1.default.findAll({
            attributes: {
                exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
            },
        });
        return res.status(200).json({
            status: 200,
            data: allProducs,
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
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const chackproduct = yield product_model_1.default.findAll({
            where: { id }
        });
        if (chackproduct.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }
        yield product_model_1.default.update({ show: chackproduct[0].dataValues.show + 1 }, { where: { id } });
        const product = yield product_model_1.default.findAll({
            where: { id },
            attributes: {
                exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
            },
        });
        return res.status(200).json({
            status: 200,
            message: "success",
            data: product,
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
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const Products = yield product_model_1.default.findAll();
        console.log(req.params);
=======
        const Products = yield product_model_1.default.findAll({ attributes: {
                exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
            } });
>>>>>>> d3eb0f953c32be98331c533d6d0afaa3d773b4d3
        if (req.params.name) {
            let name = req.params.name.toLowerCase();
            const matched = Products.filter((product) => product.productName.toLowerCase().includes(name));
            return res.status(200).json({
                message: "success",
                data: matched,
            });
        }
        return res.status(200).json({
            message: "success",
            data: Products,
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
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const fileFront = (_a = req.files) === null || _a === void 0 ? void 0 : _a.fileFront;
        const fileBack = (_b = req.files) === null || _b === void 0 ? void 0 : _b.fileBack;
        const data = req.body;
        let { model } = data;
        if (!((_c = req.token) === null || _c === void 0 ? void 0 : _c.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your not admin",
            });
        }
        model = model.toLocaleUpperCase();
        let category = yield category_model_1.default.findAll({
            where: { category_name: model },
        });
        if ((category === null || category === void 0 ? void 0 : category.length) === 0) {
            return res.status(404).json({
                status: 404,
                message: "Model not found, Please Create Model in Category panel",
            });
        }
        let categoryId = category[0].id;
        const extFile = fileFront.name.replace(".", "");
        const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
        if (!extPattern)
            throw new TypeError("Image format is not valid");
        const extFile2 = fileBack.name.replace(".", "");
        const extPattern2 = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile2);
        if (!extPattern2)
            throw new TypeError("Image format is not valid");
        let file1 = Date.now() + "-" + fileFront.name.replace(/\s/g, "");
        let file2 = Date.now() + "-" + fileBack.name.replace(/\s/g, "");
        fileFront.mv((0, path_1.resolve)("src", "uploads", file1));
        fileBack.mv((0, path_1.resolve)("src", "uploads", file2));
        const newProduct = yield product_model_1.default.create(Object.assign(Object.assign({}, data), { MainImage: file1, BackImage: file2, categoryId: categoryId }));
        res.status(201).json({
            status: 201,
            message: "success",
            data: newProduct,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const fileFront = (_d = req.files) === null || _d === void 0 ? void 0 : _d.fileFront;
        const fileBack = (_e = req.files) === null || _e === void 0 ? void 0 : _e.fileBack;
        const id = req.params.id;
        const data = req.body;
        let { productName, model, price, color, count, nfc, ekran_chastotasi, protsessor, old_kamera, orqa_kamera, sim_karta_formati, sim_kartalar_soni, operatsion_system_version, aloqa_standarti, bluetooth_standarti, vazn, batary_power, ekran_nisbati, ekran_texnologiyasi, ekran_size, doimiy_xotira, operativ_xotira, description, } = data;
        if (!((_f = req.token) === null || _f === void 0 ? void 0 : _f.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your not admin",
            });
        }
        if (model) {
            model = model.toLocaleUpperCase();
            let category = yield category_model_1.default.findAll({
                where: { category_name: model },
            });
            if (category.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Model not found, Please Create Model in Category panel",
                });
            }
        }
        //@ts-ignore
        let file1, file2;
        if (fileFront) {
            const extFile = fileFront.name.replace(".", "");
            const extPattern = /(jpg|webp|jpeg|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            file1 = Date.now() + "-" + fileFront.name.replace(/\s/g, "");
            fileFront.mv((0, path_1.resolve)("src", "uploads", file1));
        }
        if (fileBack) {
            const extFile = fileBack.name.replace(".", "");
            const extPattern = /(jpg|webp|jpeg|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            file1 = Date.now() + "-" + fileBack.name.replace(/\s/g, "");
            fileBack.mv((0, path_1.resolve)("src", "uploads", file1));
        }
        const product = yield product_model_1.default.findAll({ where: { id } });
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }
        const updatedProduct = yield category_model_1.default.update({
            productName: productName || product[0].dataValues.productName,
            model: model || product[0].dataValues.model,
            price: price || product[0].dataValues.price,
            color: color || product[0].dataValues.color,
            count: count || product[0].dataValues.count,
            nfc: nfc || product[0].dataValues.nfc,
            ekran_chastotasi: ekran_chastotasi || product[0].dataValues.ekran_chastotasi,
            protsessor: protsessor || product[0].dataValues.protsessor,
            old_kamera: old_kamera || product[0].dataValues.old_kamera,
            orqa_kamera: orqa_kamera || product[0].dataValues.orqa_kamera,
            sim_karta_formati: sim_karta_formati || product[0].dataValues.sim_karta_formati,
            sim_kartalar_soni: sim_kartalar_soni || product[0].dataValues.sim_kartalar_soni,
            operatsion_system_version: operatsion_system_version ||
                product[0].dataValues.operatsion_system_version,
            aloqa_standarti: aloqa_standarti || product[0].dataValues.aloqa_standarti,
            bluetooth_standarti: bluetooth_standarti || product[0].dataValues.bluetooth_standarti,
            vazn: vazn || product[0].dataValues.vazn,
            batary_power: batary_power || product[0].dataValues.batary_power,
            ekran_nisbati: ekran_nisbati || product[0].dataValues.ekran_nisbati,
            ekran_texnologiyasi: ekran_texnologiyasi || product[0].dataValues.ekran_texnologiyasi,
            ekran_size: ekran_size || product[0].dataValues.ekran_size,
            doimiy_xotira: doimiy_xotira || product[0].dataValues.doimiy_xotira,
            operativ_xotira: operativ_xotira || product[0].dataValues.operativ_xotira,
            description: description || product[0].dataValues.description,
            MainImage: file1 || product[0].dataValues.MainImage,
            BackImage: file2 || product[0].dataValues.BackImage,
        }, { where: { id } });
        return res.status(201).json({
            status: 201,
            message: "updated",
            data: updatedProduct,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const id = req.params.id;
        if (!((_g = req.token) === null || _g === void 0 ? void 0 : _g.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your not admin",
            });
        }
        const deletedProduct = yield product_model_1.default.destroy({ where: { id } });
        if (deletedProduct === 0) {
            return res.status(404).json({
                status: 404,
                message: "Product not found !!!",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "deleted user",
            data: deletedProduct,
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
exports.default = {
    getAllProducts,
    getProductById,
    search,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map