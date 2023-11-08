import { Router } from "express";
import categoryController from "../controller/category.controller";

const router = Router();

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/name/:name", categoryController.getCategoryByName);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
export default { router };
