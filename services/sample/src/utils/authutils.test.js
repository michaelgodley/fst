import { createToken } from './authutils';

describe('Create a Token with payload', () => {
  afterEach(() => {
  });

  it('should generate a token', () => {
    const token = createToken({ user: 'abc' });
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    expect(token).toBeDefined();
  });
});

describe('Create a token with exceptions', () => {
  function throwError() {
    // eslint-disable-next-line no-unused-vars
    createToken(null);
  }

  it('should throw error for null payload', () => {
    expect(throwError).toThrow(/Expected "payload" to be a plain object./);
  });
});
