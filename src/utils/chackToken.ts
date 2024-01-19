import { Request, Response, NextFunction } from "express";
import  { JwtPayload } from "jsonwebtoken";
import jwt from '../utils/jwt' 

interface CustomRequest extends Request {
  token?: JwtPayload; // user xususiyati JwtPayload turida bo'ladi
}
export const chackTokenMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token: any =
      authHeader?.split(" ").length == 2
        ? authHeader.split(" ")[1]
        : authHeader;

    const chackToken: any = jwt.verify(access_token) as JwtPayload;
    req.token = chackToken;
    if (!chackToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
    });
  }
};
