import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../model/user.model.js";
import Job from "../model/job.model.js";
import Application from "../model/application.model.js";
import { startSession } from "mongoose";

export const addApplication = catchAsyncError(async (req, res, next) => {
  try {
    const { userName, userEmail, skills, experience, coverletter } = req.body;
    const jobId =req.params.id

    if (!userName || !userEmail || !skills || !experience || !coverletter)
      return next(new ErrorHandler("enter all the fields", 400));

    const user = await User.findOne({ email: userEmail });
    if (!user) return next(new ErrorHandler("usre not found", 400));

    const job = await Job.findById(jobId)
    if (!job) return next(new ErrorHandler("job not found", 400));

    let application = new Application({
      userName,
      userEmail,
      skills,
      experience,
      coverletter,
    });

    const session = await startSession();
    session.startTransaction();
    job.application.push(application);
    user.appliedJobs.push(job);
    await job.save({ session });
    await user.save({ session });
    await application.save({ session });
    session.commitTransaction();

    res.status(201).json({
      success: true,
      application,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});
