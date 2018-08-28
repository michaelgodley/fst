import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object().keys({
  LOGGER_NAME: Joi.string()
    .alphanum()
    .default('app'),
  LOGGER_SRC: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  LOGGER_STDOUT_STREAM_NAME: Joi.string().default('console'),
  LOGGER_STDOUT_STREAM_LEVEL: Joi.string()
    .valid(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('trace'),
      otherwise: Joi.string().default('warn'),
    }),
  LOGGER_ROTATINGFILE_STREAM_NAME: Joi.string().default('file_rotation'),
  LOGGER_ROTATINGFILE_PATH: Joi.string().default('./logs/app.log'),
  LOGGER_ROTATINGFILE_PERIOD: Joi.string()
    .alphanum()
    .default('1d'),
  LOGGER_ROTATINGFILE_COUNT: Joi.number()
    .less(5)
    .default(3),
  LOGGER_ROTATINGFILE_LEVEL: Joi.string()
    .valid(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('info'),
      otherwise: Joi.string().default('warn'),
    }),
  LOGGER_FLUENTD_STREAM_LEVEL: Joi.string()
    .valid(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('info'),
      otherwise: Joi.string().default('warn'),
    }),
});

const envVars = Joi.validate(process.env, envVarsSchema, {
  allowUnknown: true,
  abortEarly: false,
  stripUnknown: true,
});

// Throw exception if any errors are detected.
if (envVars.error) {
  throw new Error(
    `Environment variable validation error: ${envVars.error.message}`,
  );
}

// Create export object
const env = {
  name: envVars.value.LOGGER_NAME,
  src: envVars.value.LOGGER_SRC,
  stdoutStreamName: envVars.value.LOGGER_STDOUT_STREAM_NAME,
  stdoutStreamLevel: envVars.value.LOGGER_STDOUT_STREAM_LEVEL,
  rotatingFileStreamName: envVars.value.LOGGER_ROTATINGFILE_STREAM_NAME,
  rotatingFilePath: envVars.value.LOGGER_ROTATINGFILE_PATH,
  rotatingFilePeriod: envVars.value.LOGGER_ROTATINGFILE_PERIOD,
  rotatingFileCount: envVars.value.LOGGER_ROTATINGFILE_COUNT,
  rotatingFileLevel: envVars.value.LOGGER_ROTATINGFILE_LEVEL,
  fluentdLevel: envVars.value.LOGGER_FLUENTD_STREAM_LEVEL,
};

export default env;
