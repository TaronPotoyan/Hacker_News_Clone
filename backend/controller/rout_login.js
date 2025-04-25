import express from 'express';
import { Validation_pass, Validation_name } from '../midlwear/passwordval.js';
import userrout from '../service/controller_User.js';


const route = express.Router();

route.post('/', Validation_name, Validation_pass, userrout.GetUser);
route.post('/create', Validation_name, Validation_pass, userrout.CreatUser);


export default route;