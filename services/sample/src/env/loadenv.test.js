import fs from 'fs';

describe('Load .env Environment Variables Exception conditions', () => {
  function throwError() {
    // eslint-disable-next-line no-unused-vars
    const envVars = require('./loadenv');
  }

  beforeEach(() => {
    fs.rename('.env', '.env.temp', err => {
      if (err) throw err;
    });
  });

  afterEach(() => {
    jest.resetModules();
    fs.rename('.env.temp', '.env', err => {
      if (err) throw err;
    });
  });

  it('should throw error for missing .env file', () => {
    expect(throwError).toThrow(/ENOENT: no such file or directory/);
  });
});
