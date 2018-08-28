import Sequelize from 'sequelize';
import env from '../env';
import log from './logger';

const connection = new Sequelize(env.db.sql.database, env.db.sql.username, env.db.sql.password, {
  host: env.db.sql.host,
  dialect: env.db.sql.dialect,
  operatorAliases: Sequelize.Op,
  pool: {
    max: env.db.sql.pool.max,
    min: env.db.sql.pool.min,
    acquire: env.db.sql.pool.acquire,
    idle: env.db.sql.pool.idle,
  },
});

connection.authenticate()
         .then(() => {
           log.info('Connection established');
         })
         .catch(err => {
           log.warn(`Connection error: ${err.message}`);
         });

export default connection  
