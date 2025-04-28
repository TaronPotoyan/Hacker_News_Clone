import express from 'express'
import getShow from '../service/controller_show.js';

const rout_show = express.Router();

rout_show.get('/' ,getShow);


export default rout_show;

