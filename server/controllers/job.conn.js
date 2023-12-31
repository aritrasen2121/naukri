import { startSession } from "mongoose";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Job from "../model/job.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Recruter from "../model/recruter.model.js";
import User from "../model/user.model.js";

export const getJobs = catchAsyncError(async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

export const getJobByRecruter = catchAsyncError(async (req, res, next) => {
  try {
    const recruterId = req.params.id;

    const recruter = await Recruter.findById(recruterId);
    if (!recruter) return next(new ErrorHandler("recruter not found", 400));

    let jobs;
    jobs = await Recruter.findById(recruterId).populate("postedJobs");

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

export const getJobByUser = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("user not found", 400));

    let jobs;
    jobs = await User.findById(userId).populate("appliedJobs")

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

export const addJob = catchAsyncError(async (req, res, next) => {
  try {
    const { title, description, location, company, salary } = req.body;
    const recruterId = req.params.id;

    if (!title || !description || !location || !company || !salary)
      return next(new ErrorHandler("enter all the fields", 400));

    const recruter = await Recruter.findById(recruterId);
    if (!recruter) return next(new ErrorHandler("recruter not found", 400));

    let job = new Job({
      title,
      description,
      location,
      company,
      salary,
    });

    const session = await startSession();
    session.startTransaction();
    recruter.postedJobs.push(job);
    await recruter.save({ session });
    await job.save({ session });
    session.commitTransaction();

    res.status(201).json({
      success: true,
      job,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

export const getJobDetailsById = catchAsyncError(async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) return next(new ErrorHandler("job not found", 400));

    let jobs;
    jobs = await Job.findById(jobId).populate("application");

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});
