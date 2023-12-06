import { Request, Response } from "express";
import { Order, OrderStatus } from "../../types";
import ProductModel from "../../products/model/product.model";
import OrderModel from "../model/order.model";
import { JwtPayload } from "jsonwebtoken";
import { where } from "sequelize";
interface CustomRequest extends Request {
  token?: JwtPayload;
}
//  console.log(OrderStatus);

const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    const data: Order = req.body;
    const id = req.params.id;
    const productCount = await ProductModel.findOne({ where: { id } });
    if (data.sold_count > productCount?.dataValues.count) {
      return res.status(400).json({
        status: 400,
        message: `Do'konda faqat ${productCount?.dataValues.count} mahsulot qolgan`,
      });
    }
    let product_price = productCount?.dataValues.price
await ProductModel.update({sold_out: productCount?.dataValues.sold_out + data.sold_count}, {where:{id}})
    const newData = await OrderModel.create({
      ...data,
      // product_price,
      userId: req.token?.id,
      productId: id,
    });

    return res.status(201).json({
      status: 201,
      message: "success",
      data: newData,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    const orders = await OrderModel.findAll({
      where: {
        userId: req.token?.id,
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

const getOrdersById = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findAll({
      where: {
        userId: req.token?.id,
        id,
      },
      include: [{ all: true }],
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

// get all Orders for Admin
const getOrdersAdmin = async (req: CustomRequest, res: Response) => {
  try {
    if (req.token?.isAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Your not is Admin",
      });
    }
    const orders = await OrderModel.findAll({
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

// get Order with ID for Admin
const getOrdersByIdAdmin = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    if (req.token?.isAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Your not is Admin",
      });
    }
    const order = await OrderModel.findAll({
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
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// chackOrder for admin panel
const chackOrder = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const newStatus = req.body.status;
    if (req.token?.isAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Your not is Admin",
      });
    }
    const chackOrder = await OrderModel.findOne({ where: { id } });
    if (!chackOrder) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }
    await OrderModel.update({ status: newStatus }, { where: { id } });
    res.status(201).json({
      status: 201,
      message: "updated",
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
  createOrder,
  getOrders,
  getOrdersById,
  getOrdersAdmin,
  getOrdersByIdAdmin,
  chackOrder,
};
