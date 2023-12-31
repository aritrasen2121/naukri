import { Router } from "express";
import { logIn, signUp } from "../controllers/recruter.conn.js";


const rectuterRouter = Router();

rectuterRouter.post('/login',logIn)
rectuterRouter.post('/signup',signUp)


export default rectuterRouter