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
const bcrypt_1 = __importDefault(require("bcrypt"));
const path_1 = require("path");
const jwt_1 = __importDefault(require("../../../utils/jwt"));
const user_model_1 = __importDefault(require("../model/user.model"));
// get user
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findOne({ where: { id: (_a = req.token) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User Not Found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "success",
            data: user,
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
//  create user
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const file = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
        const userdata = req.body;
        let { username, lastname, password } = userdata;
        const user = yield user_model_1.default.findAll({ where: { username } });
        console.log(user.length), 'user';
        if (password.length < 8) {
            return new Error("Not only 8 symbol");
        }
        if (user.length != 0) {
            return res.status(402).json({
                status: 402,
                message: "This is user exists",
            });
        }
        password = bcrypt_1.default.hashSync(password, 10);
        if (file) {
            var { name, mv } = yield file;
            const extFile = name.replace(".", "");
            const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            name = Date.now() + "-" + name.replace(/\s/g, "");
            mv((0, path_1.resolve)("src", "uploads", name));
        }
        const newUser = yield user_model_1.default.create({
            username,
            lastname,
            password,
            avatar: name,
        });
        const TOKEN = jwt_1.default.sign({ username, id: newUser === null || newUser === void 0 ? void 0 : newUser.id });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: newUser,
            access_token: TOKEN,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error
        });
    }
});
// update user data
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
        const userdata = req.body;
        let { username, lastname, password, newPassword } = userdata;
        if ((_d = req.token) === null || _d === void 0 ? void 0 : _d.isAdmin) {
            return res.status(404).json({
                status: 404,
                message: "Your Not is User",
            });
        }
        const user = yield user_model_1.default.findOne({
            where: { id: (_e = req.token) === null || _e === void 0 ? void 0 : _e.id },
        });
        //  chack data
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        if (password.length < 8) {
            console.log("Not only 8 symbol");
            return new Error("Not only 8 symbol");
        }
        if (newPassword) {
            if (newPassword.length < 8) {
                console.log("Not only 8 symbol");
                return new Error("Not only 8 symbol");
            }
        }
        const isTrue = bcrypt_1.default.compareSync(password, user.dataValues.password);
        if (!isTrue) {
            return res.status(404).json({
                status: 404,
                message: "Username or Password incorrect",
            });
        }
        // update data  
        newPassword = bcrypt_1.default.hashSync(newPassword, 10);
        if (file) {
            var { name, mv } = yield file;
            const extFile = name.replace(".", "");
            const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
            if (!extPattern)
                throw new TypeError("Image format is not valid");
            name = Date.now() + "-" + name.replace(/\s/g, "");
            mv((0, path_1.resolve)("src", "uploads", name));
        }
        const users = yield user_model_1.default.update({
            username: username || user.dataValues.username,
            lastname: lastname || user.dataValues.lastname,
            avatar: name || user.dataValues.avatar,
            password: newPassword || user.dataValues.password,
        }, {
            where: { id: (_f = req.token) === null || _f === void 0 ? void 0 : _f.id },
        });
        // // username o'zgarishini hisobga olgan holda yangi token qaytarilyabdi
        const TOKEN = jwt_1.default.sign({ username, id: user === null || user === void 0 ? void 0 : user.id });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: users,
            access_token: TOKEN,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
});
// sig in
const SigninUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = req.body;
        let { username, password } = userdata;
        const checkUser = yield user_model_1.default.findAll({
            where: { username },
        });
        if (checkUser.length == 0) {
            return res.status(404).json({
                status: 404,
                message: "Invalid username or password",
            });
        }
        const isTrue = bcrypt_1.default.compareSync(password, checkUser[0].dataValues.password);
        if (!isTrue) {
            return res.status(404).json({
                status: 404,
                message: "Username or Password incorrect",
            });
        }
        const user = yield user_model_1.default.findAll({ where: { username } });
        const TOKEN = jwt_1.default.sign({ username, id: user[0].dataValues.id });
        return res.status(201).json({
            status: 201,
            message: "success",
            data: user,
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
// delete user in admin panel
exports.default = {
    GetUser,
    CreateUser,
    SigninUser,
    UpdateUser,
};
//# sourceMappingURL=user.controller.js.map