import mongoose from 'mongoose';
import env from '../env';
import { logComponent } from './logger';

const log = logComponent('mongoose');
const connUrl = `${env.mongo.protocol}://${env.mongo.host}:${env.mongo.port}/${env.mongo.dbname}`;

mongoose.connection.on('error', (err) => {
  log.error({ err:err });
});

mongoose.connection.on('connected', () => {
  log.info(`Successfully connected to MongoDB on ${connUrl}`);
});

mongoose.set('debug', (collection, method, query, doc, options) => {
  if(method === 'ensureIndex') {
    return;
  }
  
  const set = {
    collection: collection,
    method: method,
    query: query,
    doc: doc,
    options: options,
  };
  log.info({ db: set });
});

export default function() {
  log.debug({ mod: 'db' }, `MongoDB Connection ${connUrl}`);
  mongoose.connect(connUrl, { useNewUrlParser: true });
}
