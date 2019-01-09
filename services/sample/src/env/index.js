//import dotenv from './loadenv'; // eslint-disable-line no-unused-vars
import './loadenv';
import appenv from './appenv';
import logenv from './logenv';
import expressenv from './expressenv';
import dbenv from './dbenv';
import mongoenv from './mongoenv'; 
import authenv from './authenv';

const env = {
  app: appenv,
  logger: logenv,
  express: expressenv,
  db: dbenv,
  mongo: mongoenv,
  auth: authenv,
};

export default env;
