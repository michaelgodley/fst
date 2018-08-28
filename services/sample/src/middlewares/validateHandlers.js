import Joi from 'joi';
import HttpStatus from 'http-status';

// eslint-disable-next-line no-unused-vars
export function validateErrorHandler(err, req, res, next) {
  req.log.info('Validation Error');
  if(err.isJoi) {
    const error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus[HttpStatus.BAD_REQUEST],
      details: err.details && err.details.map(err => {
        return {
          message: err.message,
          param: err.path
        }
      }),
    };
    return res.status(HttpStatus. BAD_REQUEST).json(error);
  }
  return next(err);
}

export function validate(schema) {
  return function(req, res, next) {
    req.log.info('Validate schema');
    let toValidate = {};
    if(!schema) {
      return next();
    }
    ['params', 'body', 'query'].forEach(key => {
      if(schema[key]) {
        toValidate[key] = req[key];
      }
    });

    return Joi.validate(toValidate, schema, { abortEarly: false }, err => {
      if(err) {
        return next(err);
      }
      return next();
    });
  }
}
