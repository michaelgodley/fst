import express from 'express';
import healthcheckRoute from './healthcheck.route';
import test from './test.route';

const router = express.Router();
router.use('/', healthcheckRoute);
router.use('/', test);

export default router;
