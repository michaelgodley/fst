import 'jest-matcher-one-of';
let env;

describe('App Environment Variables when NODE_ENV=test', () => {
  beforeAll(() => {
    process.env['APP_TYPE'] = 'web';
    const envVars = require('./appenv');
    env = envVars.default;
  });

  beforeEach(() => {});

  afterEach(() => {});

  afterAll(() => {
    jest.resetModules();
  });

  it('should expect env variable not to be null or undefined', () => {
    expect(env).not.toBeNull();
    expect(env).not.toBeUndefined();
    expect(env).toBeDefined();
  });

  it('should have mandatory properties', () => {
    expect(env).toHaveProperty('nodeEnv');
    expect(env).toHaveProperty('appType');
    expect(env).toHaveProperty('nodeVersion');
    expect(env).toHaveProperty('pwd');
    expect(env).toHaveProperty('platform');
    expect(env).toHaveProperty('pid');
  });

  it('should match default values', () => {
    expect(env.appType).toBeOneOf(['web', 'api', 'be', 'db']);
    expect(env.nodeEnv).toBeOneOf([
      'development',
      'test',
      'demo',
      'production',
    ]);
    expect(env.pid).toBeGreaterThan(0);
    expect(env.platform).toBeOneOf(['linux', 'win32']);
    expect(env.pwd).toEqual(expect.any(String));
    expect(env.nodeVersion).toEqual(expect.any(String));
  });
});

describe('App Environment Variables Exception conditions', () => {
  function throwError() {
    // eslint-disable-next-line no-unused-vars
    const envVars = require('./appenv');
  }

  afterEach(() => {
    jest.resetModules();
  });

  it('should throw error for APP_TYPE', () => {
    process.env['APP_TYPE'] = '£$AAAA';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for NODE_ENV', () => {
    process.env['NODE_ENV'] = 'abc';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for PWD', () => {
    process.env['PWD'] = 123;
    expect(throwError).toThrow(/Environment variable validation error/);
  });
});
