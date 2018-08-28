import joi from 'joi';
import joiSemver from 'joi-extension-semver';

const Joi = joi.extend(joiSemver);

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object().keys({
  APP_TYPE: Joi.string()
    .valid(['web', 'api', 'be', 'db'])
    .default('web')
    .required(),
  NODE_ENV: Joi.string()
    .valid(['development', 'production', 'test', 'demo'])
    .default('development')
    .required(),
  PWD: Joi.string(),
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

const processVarsSchema = Joi.object().keys({
  platform: Joi.string()
    .valid('win32', 'linux')
    .required(),
  pid: Joi.number().required(),
  version: Joi.semver()
    .valid()
    .gte('10.0.0')
    .required(),
});

const processVars = Joi.validate(process, processVarsSchema, {
  allowUnknown: true,
  abortEarly: false,
  stripUnknown: true,
});

// Throw exception if any errors are detected.
if (processVars.error) {
  throw new Error(
    `Environment variable validation error: ${processVars.error.message}`,
  );
}

// Create export object
const appenv = {
  appType: envVars.value.APP_TYPE,
  nodeEnv: envVars.value.NODE_ENV,
  nodeVersion: processVars.value.version,
  pwd: envVars.value.PWD,
  platform: processVars.value.platform,
  pid: processVars.value.pid,
};

export default appenv;
