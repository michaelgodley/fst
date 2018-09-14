import express from 'express';
import Joi from 'joi';
import { validate } from '../middlewares/validateHandlers';
import { findAll, findOne } from '../controllers/test.controller';

const router = express.Router();

const schema = {
  params: {
    id: Joi.number().required(),
  },
};

router.get('/test', findAll);
router.get('/test/:id', validate(schema), findOne);

export default router;
