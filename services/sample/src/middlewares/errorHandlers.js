import HttpStatus from 'http-status';

export function notFoundErrorHandler(req, res, next) {
  req.log.trace(`404 Error: ${req.url}`);
  const err = new Error(`Resource Not Found: ${req.url}`);
  err.status = 404;
  next(err);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  req.log.warn({ req: req }, `Error Code: ${err.status} ${err.message}`);
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      code: err.status,
      message: HttpStatus[err.status || HttpStatus.INTERNAL_SERVER_ERROR],
    },
  });
}
