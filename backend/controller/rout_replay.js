import express from 'express';
import rep_obj from '../service/controller_replay.js'


const rout_replay = express.Router();

rout_replay.put('/:id', rep_obj.setReply);

rout_replay.post('/:id' , rep_obj.getReplays);


export default rout_replay;