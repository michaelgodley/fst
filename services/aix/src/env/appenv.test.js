//import env from './appenv';

beforeAll(() => {
  console.log(process.env.APP_TYPE);
});

describe('App Environment Variables', () => {
  let env; 
  beforeEach(() => {
    process.env.APP_TYPE = 'web';
    env = require('./appenv');
    console.log('resetting');
  });

  afterEach(() => {
    delete require.cache[require.resolve('./appenv')]
    console.log('Deleting Cache');
    console.log(require.cache);
    //require.cache = {};
  });

  it('should expect env variable to be not null', () => {
    expect(env).not.toBeNull();
    console.log('test 1');
  });

  it('should have mandatory properties', () => {
    expect(env).toHaveProperty('appType', 'web' || 'api' || 'be' || 'db');
    console.log('test 2');
  });
});


describe('App Exceptions', () => {
  beforeEach(() => {
    process.env.APP_TYPE = 'abc';
  });

  afterEach(() => {
    delete require.cache[require.resolve('./appenv')]
    console.log('Deleting Cache');
    console.log(require.cache);
    //require.cache = {};
  });
  
  function errorAppEnv() {
    const env = require('./appenv');
  }
  
  it('should throw error for wrong APP_TYPE', () => {
    expect(errorAppEnv).toThrow();
    console.log('threw eror');
  });

});
