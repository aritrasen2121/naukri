import { Router } from "express";
import { logIn, signUp } from "../controllers/user.conn.js";

const userRouter = Router();

userRouter.post('/login',logIn)
userRouter.post('/signup',signUp)

export default userRouter;
