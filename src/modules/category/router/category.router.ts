import { Router } from "express";
import categoryController from "../controller/category.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";

const router = Router();

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/name/:name", categoryController.getCategoryByName);
router.post("/", chackTokenMiddleware, categoryController.createCategory);
router.put("/:id", chackTokenMiddleware,  categoryController.updateCategory);
router.delete("/:id", chackTokenMiddleware, categoryController.deleteCategory);
export default { router };
