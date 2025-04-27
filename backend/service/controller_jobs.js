import mongoose from "mongoose";
import Job from "../model/Job.js";
import User from "../model/User.js";

async function getJobs(req, res) {
    try {
        const jobs = await Job.find().populate('author');

        console.log('Jobs found:', jobs);
        return res.status(200).json(jobs);
    
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
    }
}

async function setJob(req, res) {
    const { title, password, name } = req.body;
    console.log(name);
    
    try {

        const user = await User.findOne({ password, name });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const job = new Job({ title, author: user });
  
      await job.save();
  
      res.status(201).json({ message: "Job created successfully", job });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
  


export default {
    getJobs,
    setJob
}

