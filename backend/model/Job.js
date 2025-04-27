import mongoose from 'mongoose';
import User from './User.js';  

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});


const Job = mongoose.model('Job', jobSchema);

export default Job;

