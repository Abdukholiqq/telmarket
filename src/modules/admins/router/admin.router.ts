 import AdminController from "../controller/admin.controller"; 

import { Router } from "express";

const router = Router();

router.post("/register", AdminController.RegisterAdmin);
router.get("/", AdminController.GetAdmin);
router.post("/login", AdminController.SigninAdmin); 
router.put("/update", AdminController.UpdateAdmin);

export default { router };
