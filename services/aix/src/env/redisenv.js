import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  REDIS_HOST: Joi.string()
    .hostname()
    .default('redis'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string(),
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
  host: envVars.REDIS_HOST,
  port: envVars.REDIS_PORT,
  password: envVars.REDIS_PASSWORD,
};

export default env;
