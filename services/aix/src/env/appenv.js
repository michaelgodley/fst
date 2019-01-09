import Joi from 'joi';
console.log('Sourcing module');

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  APP_TYPE: Joi.string()
    .valid(['web', 'api', 'be', 'db'])
    .default('web'),
}).unknown();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema, {
  abortEarly: false,
  stripUnknown: false,
});

//console.log(process.env.APP_TYPE, envVars.APP_TYPE);
// Throw exception if any errors are detected.
if (error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

// Create export object
const env = {
  appType: envVars.APP_TYPE,
};

//console.log(envVars, env);
export default env;
