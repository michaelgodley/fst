import env from './env';
import log from './config/logger';
import app from './config/express';
import passport from './config/passport';
import mongoose from './config/mongo';
import User from './db/mongoose/models/user';
import db from './db';
import faker from 'faker';

mongoose();
const user1 = new User;
user1.userName = faker.name.findName();
user1.email = faker.internet.email();
user1.password = faker.internet.password();
user1.id = faker.random.uuid();
//user1.save(user1, (err) => {
//  if (err) {
//    console.log(err.message);
//  }
//});


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
