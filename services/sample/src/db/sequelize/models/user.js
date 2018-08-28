module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );

  // eslint-disable-next-line no-unused-vars
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
