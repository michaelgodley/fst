import env from './env';
import log from './config/logger';
import app from './config/express';
import db from './db';

db.User.findAll().then(users => {
  //log.info({ users: users });
  //log.info(users);
});

//import redis from './config/redis';
//import aws from './config/aws';
// import mongoose, { Schema } from 'mongoose';

//app.listen(3000, () => {
app.listen(env.express.serverHttpPort, env.express.serverHttpAddress, () => {
  log.info(`App listening on port ${env.express.serverHttpPort}`);
  log.info(`Version: ${process.version}`);
});
