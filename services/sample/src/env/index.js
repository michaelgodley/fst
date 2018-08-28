//import dotenv from './loadenv'; // eslint-disable-line no-unused-vars
import './loadenv';
import appenv from './appenv';
import logenv from './logenv';
import expressenv from './expressenv';
import dbenv from './dbenv';

const env = {
  app: appenv,
  logger: logenv,
  express: expressenv,
  db: dbenv,
};

export default env;
