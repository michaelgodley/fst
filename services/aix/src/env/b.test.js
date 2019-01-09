const a = require('./appenv');

describe('App Environment Variables', () => {
  it('should expect env variable to be not null', () => {
    //const env = require('./appenv');
    expect(a).not.toBeNull();
  });
});
