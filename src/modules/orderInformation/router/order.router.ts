import { Router } from "express";
import orderController from "../controller/order.controller";
const router = Router();

router.post("/:id", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrdersById);

export default { router };
