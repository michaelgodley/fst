import faker from 'faker';
import db from '../models/index';

let fakeUser = {};
beforeAll(async () => {
  await db.User.sync({ force: true});
});

describe('DB create User', () => {
  beforeEach(async () => {
    await db.User.truncate();
    fakeUser = {
      userName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it('Should create a user', async () => {
    const user = await db.User.create({ userName: fakeUser.userName, email: fakeUser.email, password: fakeUser.password });    
    expect(user.userName).toEqual(fakeUser.userName);
    expect(user.email).toEqual(fakeUser.email);
    expect(user.password).toEqual(fakeUser.password);
  });
});

describe('DB Find User', () => {
  beforeEach(async () => {
    await db.User.truncate();
    fakeUser = {
      userName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const user = await db.User.create({ userName: fakeUser.userName, email: fakeUser.email, password: fakeUser.password });
  });

  it('Should find a user', async () => {
    const user = await db.User.findOne();
    expect(user.email).toEqual(fakeUser.email);
  });
});  
  
describe('DB filter for User', () => {
  beforeEach(async () => {
    await db.User.truncate();
    fakeUser = {
      userName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await db.User.create({ userName: fakeUser.userName, email: fakeUser.email, password: fakeUser.password });
    fakeUser = {
      userName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await db.User.create({ userName: fakeUser.userName, email: fakeUser.email, password: fakeUser.password });
  });
  
  it('Should find a specific user', async () => {
    const count = await db.User.count();
    expect(count).toEqual(2);
    const user = await db.User.findAll({ where: {userName: fakeUser.userName }});
    expect(user.length).toEqual(1);
    //expect(user.email).toEqual(fakeUser.email);
  });
});



