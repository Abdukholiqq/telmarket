import { Router } from "express";
import productController from "../controller/product.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";

const router = Router();
router.get("/", productController.getAllProducts);
router.get('/search' , productController.search)
router.get("/:id", productController.getProductById);
router.post("/", chackTokenMiddleware, productController.createProduct);
router.patch("/:id", chackTokenMiddleware, productController.updateProduct);
router.delete("/:id", chackTokenMiddleware, productController.deleteProduct);

export default { router };
