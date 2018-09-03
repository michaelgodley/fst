import env from './env';
import log from './config/logger';
import app from './config/express';

const server = app.listen(env.express.serverHttpPort, env.express.serverHttpAddress, () => {
  log.info(`App listening on port ${env.express.serverHttpPort}`);
  log.info(`Version: ${process.version}`);
});

export default server
