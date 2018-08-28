import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import connection from '../../../config/db';
import log from '../../../config/logger'

const basename = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = connection['import'](path.join(__dirname, file));
    models[model.name] = model;
    log.info(`Adding model ${model.name}`);
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = connection;
models.Sequelize = Sequelize;
log.info('Models Created');

export default models
