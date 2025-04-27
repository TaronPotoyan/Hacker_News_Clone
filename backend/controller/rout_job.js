import express from "express";
import service_job from '../service/controller_jobs.js'

const rout_job = express.Router();

rout_job.get('/',service_job.getJobs);
rout_job.post('/',service_job.setJob);

export default rout_job;

