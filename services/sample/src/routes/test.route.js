import express from 'express';
import Joi from 'joi';
import { validate } from '../middlewares/validateHandlers';
import { findAll, findOne } from '../controllers/test.controller';

const router = express.Router();

const abc = {
  params: {
    id: Joi.number().required(),
  },
};

router.get('/test', findAll);

router.get('/test/:id', validate(abc), (req, res, next) => {
  req.log.info(`Middleware test ${req.method}`);
  next();
});

router.get('/test/:id', findOne);
//router.get('/test/:id', (req, res) => {
//  req.log.info(`test`);
//  res.send('OK');
//});

export default router;
