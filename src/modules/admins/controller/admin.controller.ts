import { Request, Response } from "express";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "../../../utils/jwt";
import { AdminRequestbody } from "../../types";
import AdminModels from "../model/admin.model";
import { JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
  token?: JwtPayload; 
}

const RegisterAdmin = async (req: Request, res: Response) => {
  try {
    const file: any = req.files?.file;

    const adminData: AdminRequestbody = req.body;
    let {username, lastname, password} = adminData

    const admin: any = await AdminModels.findAll({ where: { username } });
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
    password = bcrypt.hashSync(password, 10);
    // bu yerda admin rasm yuklamagan vaqtida xatolikni oldini olish maqsadida ushbu code yozildi
    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const register: any = await AdminModels.create({
      username,
      lastname,
      password,
      avatar: name,
    });

    const TOKEN: any = jwt.sign({
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAdmin = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your not admin",
      });
    }
    const admin: any = await AdminModels.findAll({
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
  } catch (error: any) {
    return res.status(500).json({
      status: 201,
      message: error.message,
    });
  }
};

const SigninAdmin = async (req: Request, res: Response) => {
  try {
    /////
    const adminData: AdminRequestbody = req.body;
     const {username, password}= adminData
    /////
    const admin: any = await AdminModels.findOne({ where: { username } });

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

    const isTrue = await bcrypt.compare(password, admin.dataValues.password);
    if (!isTrue) {
      return res.status(404).json({
        status: 404,
        message: "Username or Password incorrect",
      });
    }

    const TOKEN = jwt.sign({
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
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdateAdmin = async (req: CustomRequest, res: Response) => {
  try {
    const file: any = req.files?.file;
    let  data: AdminRequestbody = req.body;
    let {username, lastname, password, newPassword} = data

    const admin: any = await AdminModels.findAll({
      where: { id: req.token?.id },
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
    const isTrue = bcrypt.compareSync(password, admin.password);
    if (!isTrue) {
      res.status(404).json({
        status: 404,
        message: "Username or Password incorrect",
      });
    }

    newPassword = bcrypt.hashSync(newPassword, 10);

    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|png|webp|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }

    const updeted: any = await AdminModels.update(
      {
        username: username || admin[0].username,
        lastname: lastname || admin[0].lastname,
        avatar: name || admin[0].avatar,
        password: newPassword || admin[0].password,
      },
      { where: { id: req.token?.id } }
    );
    const TOKEN = jwt.sign({ username, id: updeted?.id, isAdmin: true });
    res.status(201).json({
      status: 201,
      message: "success",
      data: updeted,
      access_token: TOKEN,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default {
  RegisterAdmin,
  SigninAdmin,
  GetAdmin,
  UpdateAdmin,
};
