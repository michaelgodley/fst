import User from './mongoose/models/user';

const registerUser = ({
  userName = 'abc@def.com',
  email = 'abc@def.com',
  password = 'ffggfgfkfkfk',
} = {}) => ({
  userName,
  email,
  password,
  async save() {
    try {
      //const user = await (new User(this)).save();
      return {
        userName,
        email,
        password,
      };
    } catch(error) {

    }
  },
});

export { registerUser };
