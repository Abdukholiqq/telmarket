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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../../../utils/jwt"));
const admin_model_1 = __importDefault(require("../model/admin.model"));
const RegisterAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        const adminData = req.body;
        let { username, lastname, password } = adminData;
        const admin = yield admin_model_1.default.findAll({ where: { username } });
        if (password.length < 8) {
            console.log("Not only 8 symbol");
            return new Error("Not only 8 symbol");
        }
        if (admin.length !== 0) {
            return res.status(402).json({
                status: 402,
                message: "This is admin exists",
            });
        }
        password = bcrypt_1.default.hashSync(password, 10);
        // bu yerda admin rasm yuklamagan vaqtida xatolikni oldini olish maqsadida ushbu code yozildi
        if (file) {
            var { name, mv } = yield file;
            const extFile = name.replace(".", "");
            const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            name = Date.now() + "-" + name.replace(/\s/g, "");
            mv((0, path_1.resolve)("src", "uploads", name));
        }
        const register = yield admin_model_1.default.create({
            username,
            lastname,
            password,
            avatar: name,
        });
        const TOKEN = jwt_1.default.sign({
            username,
            id: register.dataValues.id,
            isAdmin: true,
        });
        res.status(201).json({
            status: 201,
            message: "success",
            data: register,
            access_token: TOKEN,
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
const GetAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.token) === null || _b === void 0 ? void 0 : _b.isAdmin)) {
            return res.status(404).json({
                status: 404,
                message: "Your not admin",
            });
        }
        const admin = yield admin_model_1.default.findAll({
            where: { id: req.token.id },
        });
        if (!admin) {
            return res.status(402).json({
                status: 402,
                message: "This is admin exists",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: admin,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 201,
            message: error.message,
        });
    }
});
const SigninAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /////
        const adminData = req.body;
        const { username, password } = adminData;
        /////
        const admin = yield admin_model_1.default.findOne({ where: { username } });
        if (password.length < 8) {
            console.log("Not only 8 symbol");
            return new Error("Not only 8 symbol");
        }
        if (!admin) {
            return res.status(402).json({
                status: 402,
                message: "This is admin exists",
            });
        }
        const isTrue = yield bcrypt_1.default.compare(password, admin.dataValues.password);
        if (!isTrue) {
            return res.status(404).json({
                status: 404,
                message: "Username or Password incorrect",
            });
        }
        const TOKEN = jwt_1.default.sign({
            username,
            id: admin.dataValues.id,
            isAdmin: true,
        });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: admin,
            access_token: TOKEN,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
const UpdateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
        let data = req.body;
        let { username, lastname, password, newPassword } = data;
        const admin = yield admin_model_1.default.findAll({
            where: { id: (_d = req.token) === null || _d === void 0 ? void 0 : _d.id },
        });
        if (password.length < 8) {
            console.log("Not only 8 symbol");
            return new Error("Not only 8 symbol");
        }
        if (newPassword.length < 8) {
            console.log("Not only 8 symbol");
            return new Error("Not only 8 symbol");
        }
        if (!admin) {
            return res.status(402).json({
                status: 402,
                message: "This is admin not exists",
            });
        }
        const isTrue = bcrypt_1.default.compareSync(password, admin.password);
        if (!isTrue) {
            res.status(404).json({
                status: 404,
                message: "Username or Password incorrect",
            });
        }
        newPassword = bcrypt_1.default.hashSync(newPassword, 10);
        if (file) {
            var { name, mv } = yield file;
            const extFile = name.replace(".", "");
            const extPattern = /(jpg|jpeg|png|webp|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            name = Date.now() + "-" + name.replace(/\s/g, "");
            mv((0, path_1.resolve)("src", "uploads", name));
        }
        const updeted = yield admin_model_1.default.update({
            username: username || admin[0].username,
            lastname: lastname || admin[0].lastname,
            avatar: name || admin[0].avatar,
            password: newPassword || admin[0].password,
        }, { where: { id: (_e = req.token) === null || _e === void 0 ? void 0 : _e.id } });
        const TOKEN = jwt_1.default.sign({ username, id: (_f = req.token) === null || _f === void 0 ? void 0 : _f.id, isAdmin: true });
        res.status(201).json({
            status: 201,
            message: "success",
            data: updeted,
            access_token: TOKEN,
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
    RegisterAdmin,
    SigninAdmin,
    GetAdmin,
    UpdateAdmin,
};
//# sourceMappingURL=admin.controller.js.map