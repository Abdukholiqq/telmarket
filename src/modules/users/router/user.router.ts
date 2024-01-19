import { Router } from "express";
import UserController from "../controller/user.controller";
import { chackTokenMiddleware } from "../../../utils/chackToken";

const router = Router()

router.get('/', chackTokenMiddleware, UserController.GetUser)
router.get('/all', chackTokenMiddleware, UserController.GetAllUsersForAdmin)
router.get('/:id', chackTokenMiddleware, UserController.GetUsersByIdForAdmin)
router.post('/register', UserController.RegisterUser)
router.post('/login', UserController.SigninUser) 
router.put('/', chackTokenMiddleware, UserController.UpdateUser) 

export default {router}