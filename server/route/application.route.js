import { Router } from "express";
import { addApplication } from "../controllers/application.conn.js";

const applicationRouter = Router()

applicationRouter.post("/add/:id",addApplication)

export default applicationRouter