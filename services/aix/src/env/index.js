import env from './env'; // eslint-disable-line no-unused-vars
import nodeenv from './nodeenv';
import logenv from './logenv';
import expressenv from './expressenv';

export default {
  node: nodeenv,
  logger: logenv,
  express: expressenv,
};
