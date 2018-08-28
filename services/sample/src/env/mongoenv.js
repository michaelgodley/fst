import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  MONGO_HOST: Joi.string()
    .hostname()
    .default('mongo'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_PROTOCOL: Joi.string().default('mongodb'),
  MONGO_DBNAME: Joi.string().default('app'),
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
  host: envVars.MONGO_HOST,
  port: envVars.MONGO_PORT,
  protocol: envVars.MONGO_PROTOCOL,
  dbname: envVars.MONGO_DBNAME,
};

export default env;
