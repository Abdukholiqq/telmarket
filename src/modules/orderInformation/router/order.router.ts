import { Router } from "express";
import orderController from "../controller/order.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";
const router = Router();

// Add new Order for Users
router.post("/:id", chackTokenMiddleware, orderController.createOrder);
// Get all orders for Users
router.get("/", chackTokenMiddleware, orderController.getOrders);
// Get selected Order for Users
router.get("/:id", chackTokenMiddleware, orderController.getOrdersById);
// Get all orders for Admin
router.get("/admin", chackTokenMiddleware, orderController.getOrdersAdmin);
// Get selected orders for Admin 
router.get("/admin/:id", chackTokenMiddleware, orderController.getOrdersByIdAdmin);
// chackOrder for admin panel
router.put("/admin/:id", chackTokenMiddleware, orderController.chackOrder);

export default { router };
