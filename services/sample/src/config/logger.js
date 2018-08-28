import bunyan from 'bunyan';
import bunyanExpressSerializer from 'bunyan-express-serializer';
import env from '../env';

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
