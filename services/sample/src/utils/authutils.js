import bcrypt from 'bcrypt';
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

export async function hash(passwd) {
  try {
    log.trace('bcrypt.hash');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwd, salt);
    log.info('password hashed');
    return password;
  } catch (err) {
    log.error({ err: err }, 'hash exception error');
    return null;
  }
}

export async function compare(candidatePassword, hashedPassword) {
  try {
    log.trace('bcrypt.compare');
    const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
    if(!isMatch) {
      log.warn(`Error invalid password match`);
      return false;
    }
    log.info('password matched');
    return true;
  } catch (err) {
    log.error({ err: err }, `compare exception error`);
    return false;
  }
}  
