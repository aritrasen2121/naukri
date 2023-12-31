import { Router } from "express";
import { addJob, getJobByRecruter, getJobByUser, getJobDetailsById, getJobs,  } from "../controllers/job.conn.js";

const jobRouter = Router();

jobRouter.get("/",getJobs)
jobRouter.get("/recruter/:id",getJobByRecruter)
jobRouter.get("/user/:id",getJobByUser)
jobRouter.get("/details/:id",getJobDetailsById)
jobRouter.post('/add/:id',addJob)


export default jobRouter