import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  LOGGER_NAME: Joi.string()
    .alphanum()
    .default('app'),
  LOGGER_SRC: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(true),
  }),
  LOGGER_STDOUT_STREAM_NAME: Joi.string().default('console'),
  LOGGER_STDOUT_STREAM_LEVEL: Joi.string()
    .allow(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('trace'),
      otherwise: Joi.string().default('warning'),
    }),
  LOGGER_FLUENTD_STREAM_LEVEL: Joi.string()
    .allow(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('info'),
      otherwise: Joi.string().default('warning'),
    }),
  LOGGER_ROTATINGFILE_STREAM_NAME: Joi.string().default('file_rotation'),
  LOGGER_ROTATINGFILE_PATH: Joi.string().default('./logs/app.log'),
  LOGGER_ROTATINGFILE_PERIOD: Joi.string()
    .alphanum()
    .default('1d'),
  LOGGER_ROTATINGFILE_COUNT: Joi.number().default(3),
  LOGGER_ROTATINGFILE_LEVEL: Joi.string()
    .allow(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.string().default('info'),
      otherwise: Joi.string().default('warn'),
    }),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
// Throw exception if any errors are detected.

if (error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

// Create export object
const env = {
  name: envVars.LOGGER_NAME,
  src: envVars.LOGGER_SRC,
  stdoutStreamName: envVars.LOGGER_STDOUT_STREAM_NAME,
  stdoutStreamLevel: envVars.LOGGER_STDOUT_STREAM_LEVEL,
  fluentdLevel: envVars.LOGGER_FLUENTD_STREAM_LEVEL,
  rotatingFileStreamName: envVars.LOGGER_ROTATINGFILE_STREAM_NAME,
  rotatingFilePath: envVars.LOGGER_ROTATINGFILE_PATH,
  rotatingFilePeriod: envVars.LOGGER_ROTATINGFILE_PERIOD,
  rotatingFileCount: envVars.LOGGER_ROTATINGFILE_COUNT,
  rotatingFileLevel: envVars.LOGGER_ROTATINGFILE_LEVEL,
};

export default env;
