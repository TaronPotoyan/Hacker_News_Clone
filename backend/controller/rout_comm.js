import express from 'express';
import rep_obj from '../service/controller_Comm.js'


const rout_replay = express.Router();

rout_replay.put('/', rep_obj.Replay);


export default rout_replay