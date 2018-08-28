import 'jest-matcher-one-of';
import env from '.';

beforeAll(() => {});

describe('App Environment Variables', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should expect env variable to be not null or undefined', () => {
    expect(env).not.toBeNull();
    expect(env).toBeDefined();
    expect(env).not.toBeUndefined();
    expect(env.app).not.toBeNull();
    expect(env.app).toBeDefined();
    expect(env.app).not.toBeUndefined();
    expect(env.logger).not.toBeNull();
    expect(env.logger).toBeDefined();
    expect(env.logger).not.toBeUndefined();
  });

  it('should have mandatory properties', () => {
    expect(env.app).toHaveProperty('appType');
    expect(env.app).toHaveProperty('nodeEnv');
    expect(env.app).toHaveProperty('nodeVersion');
    expect(env.app).toHaveProperty('pid');
    expect(env.app).toHaveProperty('pwd');
    expect(env.app).toHaveProperty('platform');
    expect(env.logger).toHaveProperty('name');
    expect(env.logger).toHaveProperty('src');
    expect(env.logger).toHaveProperty('stdoutStreamName');
    expect(env.logger).toHaveProperty('stdoutStreamLevel');
    expect(env.logger).toHaveProperty('rotatingFileStreamName');
    expect(env.logger).toHaveProperty('rotatingFilePath');
    expect(env.logger).toHaveProperty('rotatingFilePeriod');
    expect(env.logger).toHaveProperty('rotatingFileCount');
    expect(env.logger).toHaveProperty('rotatingFileLevel');
  });

  it('should match values', () => {
    expect(env.app.appType).toEqual(expect.any(String));
    expect(env.app.appType).toBeOneOf(['web', 'api', 'be', 'db']);
    expect(env.app.nodeEnv).toBeOneOf([
      'development',
      'test',
      'demo',
      'production',
    ]);
    expect(env.app.pid).toBeGreaterThan(0);
    expect(env.logger.stdoutStreamLevel).toBeOneOf([
      'trace',
      'debug',
      'info',
      'warn',
      'error',
      'fatal',
    ]);
    expect(env.logger.rotatingFileLevel).toBeOneOf([
      'trace',
      'debug',
      'info',
      'warn',
      'error',
      'fatal',
    ]);
  });
});
