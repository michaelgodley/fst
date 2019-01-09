import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(['development', 'production', 'test', 'demo'])
    .default('development'),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema, {
  allowUnknown: false,
  abortEarly: false,
  stripUnknown: false,
});

console.log(process.env.NODE_ENV, envVars.NODE_ENV);
// Throw exception if any errors are detected.
if (error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

// Create export object
const env = {
  nodeEnv: envVars.NODE_ENV,
  nodeVersion: envVars.NODE_VERSION,
  hostname: envVars.HOSTNAME,
  pwd: envVars.PWD,
};

export default env;
