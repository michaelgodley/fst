import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import env from '../env';
import log from './logger';

// Strategies
// Token Strategy
const fromCookie = () => {
  return function (req) {
    let token = null;
    const cookieName = env.auth.token.authTokenCookieName;
    if (req && req.cookies) {
      token = req.cookies[cookieName];
    }
    req.log.info({token: token}, `Extracted token from cookie`);
    return token;
  }
};

const extractors = [];
if(env.auth.token.authTokenCookieEnabled) {
  extractors.push(fromCookie());
}
if(env.auth.token.authTokenAuthHeaderEnabled) {
  extractors.push(ExtractJwt.fromHeader(env.auth.token.authTokenAuthHeaderName));
}
if(env.auth.token.authTokenAuthHeaderSchemaEnabled) {
  extractors.push(ExtractJwt.fromAuthHeaderWithScheme(env.auth.token.authTokenAuthHeaderSchemaName));
}
if(env.auth.token.authTokenAuthBearerHeaderEnabled) {
  extractors.push(ExtractJwt.fromAuthHeaderAsBearerToken());
}
if(env.auth.token.authTokenUrlQueryParameterEnabled) {
  extractors.push(ExtractJwt.fromUrlQueryParameter(env.auth.token.authTokenUrlQueryParameterName));
}
if(env.auth.token.authTokenBodyFieldEnabled) {
  extractors.push(ExtractJwt.fromBodyField(env.auth.token.authTokenBodyFieldName));
}

const tokenOpts = {};
tokenOpts.secretOrKey = env.auth.token.secretOrKey;
tokenOpts.issuer = env.auth.token.issuer;
tokenOpts.audience = env.auth.token.audience;
tokenOpts.passReqToCallback = env.auth.token.passReqToCallback;
tokenOpts.jwtFromRequest = ExtractJwt.fromExtractors(extractors);

const tokenStrategy = new JwtStrategy(tokenOpts, (payload, next) => {
  log.trace(`JwtStrategy for payload ${payload.user}`);
  return next(null, true);
});
passport.use('jwt', tokenStrategy);

// Local Strategy
log.debug('Setting up Local Strategy');
const localOpts = {};
localOpts.usernameField = env.auth.local.usernameField;
localOpts.passwordField = env.auth.local.passwordField;
localOpts.session = env.auth.local.session;
localOpts.passReqToCallback = env.auth.local.passReqToCallback;

const localLoginStrategy = new LocalStrategy(localOpts, (username, password, next) => {
  log.trace(`LocalStrategy Login for user: ${username}`);
  return next(null, false);
});

const localRegisterStrategy = new LocalStrategy(localOpts, (username, password, next) => {
  log.trace(`LocalStrategy Register for user: ${username}`);
  return next(null, false);
});

passport.use('local-login', localLoginStrategy);
passport.use('local-register', localRegisterStrategy);
