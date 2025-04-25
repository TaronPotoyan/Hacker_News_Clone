import mongoose from 'mongoose';
import express from 'express';
import service from '../service/controller_Story.js'
import IsPostValid from '../midlwear/Story_valid.js';

const router = express.Router();


router.get('/',service.get)
router.get('/:id' , service.getById); //stanum enq commentnery tvyal Story-ii hamar
router.post('/',IsPostValid, service.post);
router.put('/comm/:id/put',service.put_comm);
router.put('/like/:id' , service.SetScore);

export default router;
