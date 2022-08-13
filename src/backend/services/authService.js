const { User } = require('../database/models');
const jwtGenerate = require('../utils/jwt');

const authentication = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return null;
  const response = jwtGenerate(
    { id: user.id,
      email: user.email
    },
  );
  return { Token: response };
}

module.exports = { authentication };
