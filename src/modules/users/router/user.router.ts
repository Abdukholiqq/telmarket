import { Router } from "express";
import UserController from "../controller/user.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";


const router = Router()

router.get('/', chackTokenMiddleware, UserController.GetUser)
router.post('/register', UserController.CreateUser)
router.post('/login', UserController.SigninUser) 
router.put('/', chackTokenMiddleware, UserController.UpdateUser) 

export default {router}