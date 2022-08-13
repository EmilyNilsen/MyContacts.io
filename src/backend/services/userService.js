const { User } = require('../database/models');

const creteNewUser = async ({ email, password }) => {
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return null;
  return await User.create({ email: email, password: password });
}

module.exports = { creteNewUser };
