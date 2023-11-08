import jwt from "../../../utils/jwt";
import CartModel from "../model/cart.model";
import { Request, Response } from "express";

const AddCart = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(' ')[1];
    const productId = +req.body.id; 
    const chekToken: any = jwt.verify(access_token);
    if (!chekToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    const addProduct = await CartModel.create({
      userId: chekToken.id,
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

const allCart =async (req:Request, res:Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(' ')[1];
    const productId = +req.body.id; 
    const chekToken: any = jwt.verify(access_token);
    if (!chekToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
  const allCart = await CartModel.findAll({where:{userId: chekToken.id}, include: [{all:true}]})
res.status(200).json({
  message:'success',
  data: allCart
})
  } catch (error) {
    
  }
}

const removeCart =async (req:Request, res:Response) => {
  const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(' ')[1];
    const productId = +req.params.id; 
    const chekToken: any = jwt.verify(access_token);
    if (!chekToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    const removeItem = await CartModel.destroy({where:{
      productId, userId: chekToken.id
    }})
    return res.status(201).json({
      message: 'success',
      data: removeItem
    })
}


export default { AddCart, removeCart, allCart };
