let env;

describe('Log Environment Variables when NODE_ENV=test', () => {
  beforeAll(() => {
    const envVars = require('./logenv');
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
    expect(env).toHaveProperty('name');
    expect(env).toHaveProperty('src');
    expect(env).toHaveProperty('stdoutStreamName');
    expect(env).toHaveProperty('stdoutStreamLevel');
    expect(env).toHaveProperty('rotatingFileStreamName');
    expect(env).toHaveProperty('rotatingFilePath');
    expect(env).toHaveProperty('rotatingFilePeriod');
    expect(env).toHaveProperty('rotatingFileCount');
    expect(env).toHaveProperty('rotatingFileLevel');
  });

  it('should match default values', () => {
    expect(env.stdoutStreamLevel).toEqual('warn');
    expect(env.rotatingFileLevel).toEqual('warn');
    expect(env.name).toMatch('app');
    expect(env.src).toBeFalsy();
    expect(env.stdoutStreamName).toMatch('console');
    expect(env.stdoutStreamLevel).toEqual('warn');
    expect(env.rotatingFileStreamName).toMatch('file_rotation');
    expect(env.rotatingFilePath).toMatch('./logs/app.log');
    expect(env.rotatingFilePeriod).toMatch('1d');
    expect(env.rotatingFileCount).toEqual(3);
    expect(env.rotatingFileLevel).toEqual('warn');
    expect(env.fluentdLevel).toEqual('warn');
  });
});

describe('Log Environment Variables when NODE_ENV=development', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'development';
    const envVars = require('./logenv');
    env = envVars.default;
  });

  beforeEach(() => {});

  afterEach(() => {});

  afterAll(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'test';
  });

  it('should match default values', () => {
    expect(env.stdoutStreamLevel).toEqual('trace');
    expect(env.rotatingFileLevel).toEqual('info');
    expect(env.fluentdLevel).toEqual('info');
    expect(env.src).toBeTruthy();
  });
});

describe('Log Exception conditions', () => {
  function throwError() {
    // eslint-disable-next-line no-unused-vars
    const envVars = require('./logenv');
  }

  afterEach(() => {
    jest.resetModules();
  });

  it('should throw error for LOGGER_NAME', () => {
    process.env['LOGGER_NAME'] = '£$AAAA';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_SRC', () => {
    process.env['LOGGER_SRC'] = '$';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_STDOUT_STREAM_NAME', () => {
    process.env['LOGGER_STDOUT_STREAM_NAME'] = 'abc';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_STDOUT_STREAM_LEVEL', () => {
    process.env['LOGGER_STDOUT_STREAM_LEVEL'] = 'warning';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_STREAM_NAME', () => {
    process.env['LOGGER_ROTATINGFILE_STREAM_NAME'] = 123;
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_PATH', () => {
    process.env['LOGGER_ROTATINGFILE_PATH'] = 123;
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_PERIOD', () => {
    process.env['LOGGER_ROTATINGFILE_PERIOD'] = '$1';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_COUNT', () => {
    process.env['LOGGER_ROTATINGFILE_COUNT'] = 'a';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_COUNT > 5', () => {
    process.env['LOGGER_ROTATINGFILE_COUNT'] = 6;
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_ROTATINGFILE_LEVEL', () => {
    process.env['LOGGER_ROTATINGFILE_LEVEL'] = 'warning';
    expect(throwError).toThrow(/Environment variable validation error/);
  });

  it('should throw error for LOGGER_FLUENTD_STREAM_LEVEL', () => {
    process.env['LOGGER_FLUENTD_STREAM_LEVEL'] = 'warning';
    expect(throwError).toThrow(/Environment variable validation error/);
  });
});
