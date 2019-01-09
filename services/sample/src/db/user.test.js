import faker from 'faker';
import { registerUser } from './user';

let fakeUser = {};

describe('DB Register User', () => {
  beforeEach(() => {
    fakeUser = {
      userName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it('Should register a user', () => {
    const user = registerUser(fakeUser);
    expect(user.userName).toEqual(fakeUser.userName);
    expect(user.email).toEqual(fakeUser.email);
    expect(user.password).toEqual(fakeUser.password);
  });
});
