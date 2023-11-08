import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { resolve } from "path";
import jwt from "../../../utils/jwt";
import UserModel from "../model/user.model";
import { UserRequestbody } from "../../types";

// get user
const GetUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const chekToken: any = jwt.verify(access_token);

    if (!chekToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }

    const user: any = await UserModel.findOne({ where: { id: chekToken.id } });
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

//  create user
const CreateUser = async (req: Request, res: Response) => {
  try {
    const file: any = req.files?.file;
    const userdata: UserRequestbody = req.body;
    let { username, lastname, password } = userdata; 
console.log(req.body);

    const user: any = await UserModel.findAll({ where: { username } });
    console.log(user.length) , 'user';

    if (password.length < 8) {
      return new Error("Not only 8 symbol");
    }
    if (user.length != 0) {
      return res.status(402).json({
        status: 402,
        message: "This is user exists",
      });
    }

    password = bcrypt.hashSync(password, 10);
    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const newUser: any = await UserModel.create({
      username,
      lastname,
      password,
      avatar: name,
    });
    console.log(newUser);
    const TOKEN: any = jwt.sign({ username, id: newUser?.id });

    return res.status(201).json({
      status: 201,
      message: "success",
      data: newUser,
      access_token: TOKEN,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error
    });
  }
};

// update user data
const UpdateUser = async (req: Request, res: Response) => {
  try { 
    const file: any = req.files?.files;
    const userdata: UserRequestbody = req.body;
    let { username, lastname, password, newPassword } = userdata;

    // find data
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];

    const chekToken: any = jwt.verify(access_token);

    if (!chekToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    if (chekToken.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is User",
      });
    }

    const user: any = await UserModel.findOne({
      where: { id: chekToken.id },
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
    const isTrue = bcrypt.compareSync(password, user.dataValues.password);
    if (!isTrue) {
      return res.status(404).json({
        status: 404,
        message: "Username or Password incorrect",
      });
    }
    // update data  

    newPassword = bcrypt.hashSync(newPassword, 10);
    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
   const users = await UserModel.update(
      {
        username: username || user.dataValues.username,
        lastname: lastname || user.dataValues.lastname,
        avatar: name || user.dataValues.avatar,
        password: newPassword || user.dataValues.password,
      },
      {
        where: { id: chekToken.id },
      }
    );
    // // username o'zgarishini hisobga olgan holda yangi token qaytarilyabdi
    const TOKEN: any = jwt.sign({ username, id: user?.id });

    return res.status(201).json({
      status: 201,
      message: "success",
      data: users,
      access_token: TOKEN,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// sig in
const SigninUser = async (req: Request, res: Response) => {
  try {
    const userdata: UserRequestbody = req.body;
    let { username, password } = userdata;

    const checkUser: any = await UserModel.findAll({
      where: { username },
    });

    if (checkUser.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Invalid username or password",
      });
    } 

    const isTrue = bcrypt.compareSync(
      password,
      checkUser[0].dataValues.password
    );

    if (!isTrue) {
      return res.status(404).json({
        status: 404,
        message: "Username or Password incorrect",
      });
    }

    const user: any = await UserModel.findAll({ where: { username } })  

    const TOKEN: any = jwt.sign({ username, id: user[0].dataValues.id });
    return res.status(201).json({
      status: 201,
      message: "success",
      data: user,
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

// delete user in admin panel


export default {
  GetUser,
  CreateUser,
  SigninUser,
  UpdateUser,
};
