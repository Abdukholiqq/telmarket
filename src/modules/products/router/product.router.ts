import { Router } from "express";
import productController from "../controller/product.controller";

const router = Router();
router.get("/", productController.getAllProducts);
router.get('/search' , productController.search)
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default { router };
