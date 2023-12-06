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
const category_model_1 = __importDefault(require("../model/category.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        let { category_name } = req.body;
        if (!((_b = req.token) === null || _b === void 0 ? void 0 : _b.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your Not is Admin",
            });
        }
        category_name = category_name.toLocaleUpperCase();
        const checkCategory = yield category_model_1.default.findAll({
            where: { category_name },
        });
        if (checkCategory.length !== 0) {
            return res.status(404).json({
                status: 404,
                message: "This is category already exists",
            });
        }
        if (!file) {
            return res.status(404).json({
                status: 404,
                message: "Image must be uploaded !!!",
            });
        }
        let { name, mv } = yield file;
        const extFile = name.replace(".", "");
        const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
        if (!extPattern)
            throw new TypeError("Image format is not valid");
        name = Date.now() + "-" + name.replace(/\s/g, "");
        mv((0, path_1.resolve)("src", "uploads", name));
        const newCategory = yield category_model_1.default.create({
            category_name,
            category_image: name,
        });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: newCategory,
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
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  istalgan odam  ko'ra olishi mumkin
        const allCategory = yield category_model_1.default.findAll({
            attributes: ["id", "category_name", "category_image"],
            include: [{ all: true }],
        });
        return res.status(200).json({
            status: 200,
            data: allCategory,
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
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield category_model_1.default.findOne({
            where: { id },
            include: [{ all: true }],
        });
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data: category,
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
const getCategoryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.params.name;
        const category = yield category_model_1.default.findAll({
            where: { category_name: name.toLocaleUpperCase() },
            include: [{ all: true }],
        });
        if (category.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "success",
            data: category,
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
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
        let { category_name } = req.body;
        let id = req.params.id;
        if (!((_d = req.token) === null || _d === void 0 ? void 0 : _d.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your Not is Admin",
            });
        }
        category_name = category_name.toLocaleUpperCase();
        const checkCategory = yield category_model_1.default.findAll({
            where: { category_name },
        });
        if (checkCategory.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
            });
        }
        if (file) {
            var { name, mv } = yield file;
            const extFile = name.replace(".", "");
            const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            name = Date.now() + "-" + name.replace(/\s/g, "");
            mv((0, path_1.resolve)("src", "uploads", name));
        }
        const updatedCategory = yield category_model_1.default.update({
            category_name,
            category_image: name || checkCategory[0].category_image,
        }, { where: { id } });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: updatedCategory,
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
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        let id = req.params.id;
        if (!((_e = req.token) === null || _e === void 0 ? void 0 : _e.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your Not is Admin",
            });
        }
        const checkCategory = yield category_model_1.default.findAll({ where: { id } });
        if (checkCategory.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
            });
        }
        const deletedCategory = yield category_model_1.default.destroy({ where: { id } });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: deletedCategory,
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
    createCategory,
    getAllCategory,
    getCategoryById,
    getCategoryByName,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map