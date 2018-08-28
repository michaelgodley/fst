import 'jest-matcher-one-of';
let env;

describe('Express Environment Variables', () => {
  beforeAll(() => {
    const envVars = require('./expressenv');
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
    expect(env).toHaveProperty('statusMonitorPath');
    expect(env).toHaveProperty('apiEnabled');
    expect(env).toHaveProperty('webappEnabled');
    expect(env).toHaveProperty('uploadDir');
    expect(env).toHaveProperty('serverHttpEnabled');
    expect(env).toHaveProperty('serverHttpPort');
    expect(env).toHaveProperty('serverHttpAddress');
  });

  it('should match default values', () => {
    expect(env.statusMonitorPath).toMatch('/express/status');
    expect(env.apiEnabled).toBeTruthy();
    expect(env.webappEnabled).toBeFalsy();
    expect(env.uploadDir).toMatch('/uploads');
    expect(env.serverHttpEnabled).toBeTruthy();
    expect(env.serverHttpPort).toEqual(3000);
    expect(env.serverHttpAddress).toEqual('0.0.0.0');
  });
});

describe('App Environment Variables Exception conditions', () => {
  function throwError() {
    // eslint-disable-next-line no-unused-vars
    const envVars = require('./expressenv');
  }

  afterEach(() => {
    jest.resetModules();
  });

  //it('should throw error for EXPRESS_STATUS_MONITOR_PATH', () => {
  //  process.env['EXPRESS_STATUS_MONITOR_PATH'] = 123;
  //  expect(throwError).toThrow(/Environment variable validation error/);
  //});

  it('should throw error for EXPRESS_API_ENABLED', () => {
    process.env['EXPRESS_API_ENABLED'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for EXPRESS_APP_ENABLED', () => {
    process.env['EXPRESS_APP_ENABLED'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for EXPRESS_APP_UPLOAD_DIR', () => {
    process.env['EXPRESS_APP_UPLOAD_DIR'] = 123;
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for EXPRESS_SERVER_HTTP_ENABLED', () => {
    process.env['EXPRESS_SERVER_HTTP_ENABLED'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for EXPRESS_SERVER_HTTP_PORT', () => {
    process.env['EXPRESS_SERVER_HTTP_PORT'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for EXPRESS_SERVER_HTTP_ADDRESS', () => {
    process.env['EXPRESS_SERVER_HTTP_ADDRESS'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });
});
