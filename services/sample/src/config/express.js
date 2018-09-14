import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import compression from 'compression';
import requestId from 'express-request-id';
import helmet from 'helmet';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';
import env from '../env';
import log from './logger';
import { reqLogger, resLogger } from '../middlewares/expressLogHandlers';
import {
  notFoundErrorHandler,
  errorHandler,
} from '../middlewares/errorHandlers';
import { validateErrorHandler } from '../middlewares/validateHandlers';
import routes from '../routes';

// Express Setup
const app = express();

// Set options
app.set('x-powered-by', false);
app.set('etag', true); // other values 'weak', 'strong'
app.set('trust proxy', 1); // 1 hop

// RequestId & Logging Middlewares
app.use(
  requestId({
    uuidVersion: 'v4',
    setHeader: true,
    headerName: 'X-Request-Id',
    attributeName: 'id',
  }),
);
app.use(reqLogger);
app.use(resLogger);

// Parsers & Compression & Validitors Middlewares
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(methodOverride());
app.use(compression());

// Security Middlewares - Set various HTTP headers
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
const csp = {
  directives: {
    defaultSrc: ["'self'", '*.evenkeel.io'],
    styleSrc: ["'unsafe-inline'", '*.evenkeel.io'],
    //    scriptSrc: ['*.evenkeel.io'],
    //    imgSrc: ['*.evenkeel.io'],
    //    connectSrc: ["'self'", '*.evenkeel.io'],
    //    fontSrc: [],
    //    objectSrc: [],
    //    mediaSrc: [],
    //    frameSrc: [],
    reportUri: '/report-violation',
  },
};
app.use(helmet.contentSecurityPolicy(csp));
app.use(bodyParser.json({ type: ['json', 'application/csp-report'] }));
app.post('/report-violation', (req, res) => {
  if (req.body) {
    req.log.warn('CSP Violation: ', req.body);
  } else {
    req.log.warn('CSP Violation: No data received');
  }
  res.status(204).end();
});

// Enable CORS Middlewares
const corsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsConfig));

// Monitoring
app.use(expressStatusMonitor({ path: env.express.statusMonitorPath }));

// Mount routes
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('ok');
});

// eslint-disable-next-line no-unused-vars
app.get('/error', (req, res) => {
  throw Error('testerror');
});

// Error Handler Middlewares
app.use(notFoundErrorHandler);
app.use(validateErrorHandler);
app.use(errorHandler);

log.info('Express Initialised');
export default app;
