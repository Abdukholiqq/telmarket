import UserController from "../controller/user.controller";
import { Router } from "express";

const router = Router()

router.get('/', UserController.GetUser)
router.post('/register', UserController.CreateUser)
router.post('/login', UserController.SigninUser) 
router.put('/', UserController.UpdateUser) 

export default {router}