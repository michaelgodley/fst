import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object().keys({
  EXPRESS_STATUS_MONITOR_PATH: Joi.string().default('/express/status'),
  EXPRESS_API_ENABLED: Joi.boolean().default(true),
  EXPRESS_APP_ENABLED: Joi.boolean().default(false),
  EXPRESS_APP_UPLOAD_DIR: Joi.string().default('/uploads'),
  EXPRESS_SERVER_HTTP_ENABLED: Joi.boolean().default(true),
  EXPRESS_SERVER_HTTP_PORT: Joi.number().default(3000),
  EXPRESS_SERVER_HTTP_ADDRESS: Joi.string()
    .ip({ version: ['ipv4', 'ipv6'], cidr: 'optional' })
    .default('0.0.0.0'),
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
  statusMonitorPath: envVars.value.EXPRESS_STATUS_MONITOR_PATH,
  apiEnabled: envVars.value.EXPRESS_API_ENABLED,
  webappEnabled: envVars.value.EXPRESS_APP_ENABLED,
  uploadDir: envVars.value.EXPRESS_APP_UPLOAD_DIR,
  serverHttpEnabled: envVars.value.EXPRESS_SERVER_HTTP_ENABLED,
  serverHttpPort: envVars.value.EXPRESS_SERVER_HTTP_PORT,
  serverHttpAddress: envVars.value.EXPRESS_SERVER_HTTP_ADDRESS,
};

export default env;
