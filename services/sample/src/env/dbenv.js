import Joi from 'joi';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object().keys({
  DB_SQL_DATABASE: Joi.string().default('demodb'),
  DB_SQL_USERNAME: Joi.string().default('root'),
  DB_SQL_PASSWORD: Joi.string().default('r00t'),
  DB_SQL_HOST: Joi.string(),
//    .ip({ version: ['ipv4', 'ipv6'], cidr: 'optional' })
//    .default('0.0.0.0'),
  DB_SQL_DIALECT: Joi.string().default('postgres'),
  DB_SQL_POOL_MAX: Joi.number().default(5),
  DB_SQL_POOL_MIN: Joi.number().default(0),
  DB_SQL_POOL_ACQUIRE: Joi.number().default(3000),
  DB_SQL_POOL_IDLE: Joi.number().default(1000),  
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
  sql: {
    database: envVars.value.DB_SQL_DATABASE,
    username: envVars.value.DB_SQL_USERNAME,
    password: envVars.value.DB_SQL_PASSWORD,
    host: envVars.value.DB_SQL_HOST,
    dialect: envVars.value.DB_SQL_DIALECT,
    pool: {
      max: envVars.value.DB_SQL_POOL_MAX,
      min: envVars.value.DB_SQL_POOL_MIN,
      acquire: envVars.value.DB_SQL_POOL_ACQUIRE,
      idle: envVars.value.DB_SQL_POOL_IDLE,    
    },
  },
};

export default env;
