import bunyan from 'bunyan';
import bunyanExpressSerializer from 'bunyan-express-serializer';
import env from '../env';

function mongoSerializer(data) {
  const query = JSON.stringify(data.query);
  const options = JSON.stringify(data.options || {});
  // return `db.${data.collection}.${data.method}(${query}, ${options});`;
  return {
    doc: data.doc,
    collection: data.collection,
    method: data.method,
    query: query,
    options: options,
  };
}

const log = bunyan.createLogger({
  name: env.logger.name,
  src: env.logger.src,
  streams: [
    {
      name: env.logger.stdoutStreamName,
      level: env.logger.streamLevel,
      stream: process.stdout,
    },
    {
      name: env.logger.rotatingFileStreamName,
      level: env.logger.rotatingFileLevel,
      type: 'rotating-file',
      path: env.logger.rotatingFilePath,
      period: env.logger.rotatingFilePeriod,
      count: env.logger.rotatingFileCount,
    },
  ],
  serializers: {
    req: bunyanExpressSerializer,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
    db: mongoSerializer,
    env: env => {
      return {
        mongoHost: env.logger.rotatingFilePath,
        mongoPort: env.logger.rotatingFileLevel,
      };
    },
  },
});

log.info('Logger Initialised');

export default log;

export function logComponent(componentName) {
  return log.child({ component: componentName });
}
