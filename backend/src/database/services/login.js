const { User } = require('../models');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return null;
  return user;
}

module.exports = { login };
