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
  EXPRESS_COOKIE_DOMAIN: Joi.string().default('example.com'),
  // EXPRESS_COOKIE_EXPIRES:
  // EXPRESS_COOKIE_MAXAGE:
  EXPRESS_COOKIE_HTTPONLY: Joi.boolean().default(true),
  EXPRESS_COOKIE_PATH: Joi.string().default('/'),
  EXPRESS_COOKIE_SECURE: Joi.boolean().default(true),
  EXPRESS_COOKIE_SIGNED: Joi.boolean().default(true),
  EXPRESS_COOKIE_SAMESITE: Joi.boolean().default(true),
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
  cookie: {
    domain: envVars.EXPRESS_COOKIE_DOMAIN,
    // expires: envVars.EXPRESS_COOKIE_EXPIRES,
    // maxAge: envVars.EXPRESS_COOKIE_MAXAGE,
    httpOnly: envVars.EXPRESS_COOKIE_HTTPONLY,
    path: envVars.EXPRESS_COOKIE_PATH,
    secure: envVars.EXPRESS_COOKIE_SECURE,
    signed: envVars.EXPRESS_COOKIE_SIGNED,
    sameSite: envVars.EXPRESS_COOKIE_SAMESITE,
  },
};

export default env;
