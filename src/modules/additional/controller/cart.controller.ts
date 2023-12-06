import { Request, Response } from "express";
import jwt from "../../../utils/jwt";
import CartModel from "../model/cart.model";
import { JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
  token?: JwtPayload;
}

const AddCart = async (req: CustomRequest, res: Response) => {
  try {
    const productId = +req.body.id;

    const addProduct = await CartModel.create({
      userId: req.token?.id,
      productId,
    });
    return res.status(201).json({
      message: "success",
      data: addProduct,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const allCart = async (req: CustomRequest, res: Response) => {
  try {
    const productId = +req.body.id;

    const allCart = await CartModel.findAll({
      where: { userId: req.token?.id },
      include: [{ all: true }],
    });
    res.status(200).json({
      message: "success",
      data: allCart,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const removeCart = async (req: CustomRequest, res: Response) => {
  try {
    const productId = +req.params.id;
    const removeItem = await CartModel.destroy({
      where: {
        productId,
        userId: req.token?.id,
      },
    });
    return res.status(201).json({
      message: "success",
      data: removeItem,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default { AddCart, removeCart, allCart };
