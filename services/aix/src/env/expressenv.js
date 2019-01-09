import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  EXPRESS_STATUS_MONITOR_PATH: Joi.string().default('/express/status'),
  EXPRESS_API_ENABLED: Joi.boolean().default(true),
  EXPRESS_APP_ENABLED: Joi.boolean().default(false),
  EXPRESS_APP_UPLOAD_DIR: Joi.string().default('/uploads'),
  EXPRESS_SERVER_HTTP_ENABLED: Joi.boolean().default(true),
  EXPRESS_SERVER_HTTP_PORT: Joi.number().default(3000),
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
  statusMonitorPath: envVars.EXPRESS_STATUS_MONITOR_PATH,
  api: {
    enabled: envVars.EXPRESS_API_ENABLED,
  },
  webapp: {
    enabled: envVars.EXPRESS_APP_ENABLED,
    uploadDir: envVars.EXPRESS_APP_UPLOAD_DIR,
  },
  server: {
    http: {
      enabled: envVars.EXPRESS_SERVER_HTTP_ENABLED,
      port: envVars.EXPRESS_SERVER_HTTP_PORT,
    },
  },
};

export default env;
