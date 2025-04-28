import express from 'express'
import obj_past from '../service/controller_past.js'

const rout_past = express.Router();
rout_past.get('/', obj_past.past);

export default rout_past;