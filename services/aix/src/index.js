import express from 'express';
import env from './env';
import valid from './parsers/valid';

//import log from './config/logger';
//import app from './config/express';
//import db from './config/db';
//import redis from './config/redis';
//import aws from './config/aws';

// import mongoose, { Schema } from 'mongoose';

//log.info({ mod: 'main', env: env }, env);

// Express Setup
const app = express();
app.get('/', (req, res) => res.send('ok'));
//db();

app.listen(3000, () => {
  // app.listen(env.port, () => {
  //  log.info({ mod: 'main' }, `listening on port ${env.port}`);
  //  log.info(`Version: ${process.version}`);
  console.log(`listening on port 3000 ${env.node.version}`); // eslint-disable-line no-console
});
