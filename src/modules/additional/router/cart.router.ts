import { Router } from "express";
import cartController from "../controller/cart.controller";
const router = Router();
router.get('/', cartController.allCart)
router.post('/', cartController.AddCart)
router.delete('/:id', cartController.removeCart)

export default {router}