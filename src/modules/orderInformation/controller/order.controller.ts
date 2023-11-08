import { Request, Response } from "express";
import { Order } from "../../types";
import ProductModel from "../../products/model/product.model";
import OrderModel from "../model/order.model";
import jwt from "../../../utils/jwt";

const createOrder = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const chekToken: any = jwt.verify(access_token);
    const data: Order = req.body;
    const id = req.params.id;
    const productCount = await ProductModel.findOne({ where: { id } });
    if (data.sold_count > productCount?.dataValues.count) {
      return res.status(400).json({
        status: 400,
        message: `Do'konda faqat ${productCount?.dataValues.count} mahsulot qolgan`,
      });
    }

    const newData = await OrderModel.create({
      ...data,
      userId: chekToken.id,
      productId: id,
    });

    return res.status(201).json({
      status: 201,
      message: "success",
      data: newData,
    });
  } catch (error) {
    const {message} = error as Error
    console.log(message);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const chekToken: any = jwt.verify(access_token);

    const orders = await OrderModel.findAll({
      where: {
        userId: chekToken.id,
      },
      include: [{ all: true }],
    });
    res.status(200).json({
      status: 200,
      message: "success",
      data: orders,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getOrdersById = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const chekToken: any = jwt.verify(access_token);
    const id = req.params.id;

    const order = await OrderModel.findAll({
      where: {
        userId: chekToken.id,
        id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "success",
      data: order,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default { createOrder, getOrders, getOrdersById };
