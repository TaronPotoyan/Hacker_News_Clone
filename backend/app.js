import express from 'express'
import router from './controller/route_Stroies.js'
import mongoose from 'mongoose';
import cors from 'cors'
import routLogin from './controller/rout_login.js'
import rout_replay from './controller/rout_replay.js'
import rout_user from './controller/rout_user.js'
import rout_jobs   from './controller/rout_job.js'
import rout_past from './controller/rout_past.js'
import rout_show from './controller/rout_show.js'

const PORT = process.env.PORT || 3000;
const app = express();

const mongoURI = 'mongodb://localhost:27017/Hack_news';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/stories', router);
app.use('/login',routLogin);
app.use('/get_replays/',rout_replay);
app.use('/users/',rout_user);
app.use('/jobs' ,rout_jobs );
app.use('/past' , rout_past);
app.use ('/show' , rout_show);

app.listen(PORT,()=> {
    console.log(`App is listen in http://localhost:${PORT}`);
})


