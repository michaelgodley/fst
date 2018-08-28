import log from '../config/logger';

export function reqLogger(req, res, next) {
  req.log = log.child({ reqId: req.id }, true);
  req.log.info({ req: req }, 'Request');
  next();
}

export function resLogger(req, res, next) {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    req.log.info({ res: res }, 'Response');
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
}
