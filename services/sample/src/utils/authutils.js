import jwt from 'jsonwebtoken';
import env from '../env'
import log from '../config/logger';

export function createToken(payload, expires = env.auth.token.expiresIn) {
  log.trace({ payload: payload }, `createToken - expiring in ${expires}`);
  const token = jwt.sign(payload, env.auth.token.secretOrKey,
                         {
                           algorithm: env.auth.token.algorithm,
                           expiresIn: expires,
                           issuer: env.auth.token.issuer,
                           audience: env.auth.token.audience,
                         });
  log.info({ payload: payload, token: token});
  return token;
};
