 import AdminController from "../controller/admin.controller"; 
 import { chackTokenMiddleware } from "../../../utils/chackToken";

import { Router } from "express";

const router = Router();

router.post("/register", AdminController.RegisterAdmin);
router.post("/login", AdminController.SigninAdmin); 
router.get("/", chackTokenMiddleware, AdminController.GetAdmin);
router.put("/", chackTokenMiddleware, AdminController.UpdateAdmin);

export default { router };
