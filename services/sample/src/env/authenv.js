import Joi from 'joi';
import { day } from '../utils/constants';

// Create Joi schema to validate env variables
const envVarsSchema = Joi.object({
  AUTH_LOCAL_USERNAMEFIELD: Joi.string().default('username'),
  AUTH_LOCAL_PASSWORDFIELD: Joi.string().default('password'),
  AUTH_LOCAL_SESSION: Joi.string().default(false),
  AUTH_LOCAL_PASSREQTOCALLBACK: Joi.boolean().default(false),
  AUTH_TOKEN_SECRETORKEY: Joi.string().default('lazydog'),
  AUTH_TOKEN_ISSUER: Joi.string().default('example.com'),
  AUTH_TOKEN_AUDIENCE: Joi.string().default('example.com'),
  AUTH_TOKEN_EXPIRESIN: Joi.number().default(day),
  AUTH_TOKEN_ALGORITHM: Joi.string()
                           .valid(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'none'])
                           .default('HS256'),
  AUTH_TOKEN_PASSREQTOCALLBACK: Joi.boolean().default(false),
  AUTH_TOKEN_COOKIE_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_COOKIE_NAME: Joi.string().default('jwt'),
  AUTH_TOKEN_HEADER_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_HEADER_NAME: Joi.string().default('x-auth-token'),
  AUTH_TOKEN_AUTH_HEADER_SCHEMA_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_AUTH_HEADER_SCHEMA_NAME: Joi.string().default('jwt'),
  AUTH_TOKEN_AUTH_BEARER_HEADER_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_URL_QUERY_PARAMETER_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_URL_QUERY_PARAMETER_NAME: Joi.string().default('auth_token'),
  AUTH_TOKEN_BODY_FIELD_ENABLED: Joi.boolean().default(true),
  AUTH_TOKEN_BODY_FIELD_NAME: Joi.string().default('auth_token'),
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
  local: {
    usernameField: envVars.AUTH_LOCAL_USERNAMEFIELD,
    passwordField: envVars.AUTH_LOCAL_PASSWORDFIELD,
    session: envVars.AUTH_LOCAL_SESSION,
    passReqToCallback: envVars.AUTH_LOCAL_PASSREQTOCALLBACK,
  },
  token: {
    secretOrKey: envVars.AUTH_TOKEN_SECRETORKEY,
    issuer: envVars.AUTH_TOKEN_ISSUER,
    audience: envVars.AUTH_TOKEN_AUDIENCE,
    expiresIn: envVars.AUTH_TOKEN_EXPIRESIN,
    algorithm: envVars.AUTH_TOKEN_ALGORITHM,
    passReqToCallback: envVars.AUTH_TOKEN_PASSREQTOCALLBACK,
    authTokenCookieEnabled: envVars.AUTH_TOKEN_COOKIE_ENABLED,
    authTokenCookieName: envVars.AUTH_TOKEN_COOKIE_NAME,
    authTokenAuthHeaderEnabled: envVars.AUTH_TOKEN_HEADER_ENABLED,
    authTokenAuthHeaderName: envVars.AUTH_TOKEN_HEADER_NAME,
    authTokenAuthHeaderSchemaEnabled: envVars.AUTH_TOKEN_AUTH_HEADER_SCHEMA_ENABLED,
    authTokenAuthHeaderSchemaName: envVars.AUTH_TOKEN_AUTH_HEADER_SCHEMA_NAME,
    authTokenAuthBearerHeaderEnabled: envVars.AUTH_TOKEN_AUTH_BEARER_HEADER_ENABLED,
    authTokenUrlQueryParameterEnabled: envVars.AUTH_TOKEN_URL_QUERY_PARAMETER_ENABLED,
    authTokenUrlQueryParameterName: envVars.AUTH_TOKEN_URL_QUERY_PARAMETER_NAME,
    authTokenBodyFieldEnabled: envVars.AUTH_TOKEN_BODY_FIELD_ENABLED,
    authTokenBodyFieldName: envVars.AUTH_TOKEN_BODY_FIELD_NAME,
  },
};

export default env;
