import env from './nodeenv';

beforeAll(() => {
  process.env['NODE_ENV'] = 'abc';
});

describe('Node Environment Variables', () => {
  it('should set env variable to not null', () => {
    expect(env).not.toBeNull();
  });

  it('should have mandatory properties', () => {
    console.log(env);
    expect(env).toHaveProperty(
      'nodeEnv',
      'test' || 'development' || 'demo' || 'production',
    );
  });
});
