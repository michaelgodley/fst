import express from 'express';
import healthcheckRoute from './healthcheck.route';
import test from './test.route';
import auth from './authroute.js';

const router = express.Router();
router.use('/', healthcheckRoute);
router.use('/', test);
router.use('/', auth);

export default router;
