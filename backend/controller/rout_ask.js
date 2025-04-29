import express from 'express'
import service_ask from '../service/controller_ask.js'

const rout_ask = express.Router();

rout_ask.get('/' , service_ask.GetAsk);
rout_ask.post('/', service_ask.SetAsk);

export default rout_ask;