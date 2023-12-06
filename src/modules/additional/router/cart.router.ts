import { Router } from "express";
import cartController from "../controller/cart.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";

const router = Router();
router.get('/',chackTokenMiddleware, cartController.allCart)
router.post('/',chackTokenMiddleware, cartController.AddCart)
router.delete('/:id', chackTokenMiddleware, cartController.removeCart)

export default {router}