import express from 'express';

const router = express.Router();
router.getname = 'abc';
router.get('/health-check', (req, res, next) => {
  req.log.info(`Middleware healthcheck ${router.getname} ${req.method}`);
  next();
});

router.get('/health-check', (req, res) => {
  req.log.info(`healthcheck ${router.name}`);
  res.send('OK');
});

export default router;
