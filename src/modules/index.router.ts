import { Router } from "express";

import adminRouter from "./admins/router/admin.router";
import userRouter from "./users/router/user.router";
import categoryRouter from "./category/router/category.router";
import productRouter from "./products/router/product.router";
import orderRouter from "./orderInformation/router/order.router";
import cartRouter from "./additional/router/cart.router"; 

const router = Router();

router.use("/admin", adminRouter.router);
router.use("/users", userRouter.router);
router.use("/category", categoryRouter.router);
router.use("/products", productRouter.router);
router.use("/orders", orderRouter.router);
router.use("/cart", cartRouter.router);

export default router;
