import mongoose from "mongoose";
import express from 'express'
import user from '../service/controller_User.js'
import emailValidation from  '../midlwear/emailvalidation.js'

const route = express.Router();

route.post('/update/',emailValidation,user.Update_User);

export default route;