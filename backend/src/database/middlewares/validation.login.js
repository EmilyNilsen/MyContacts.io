const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (email !== undefined && email.length <= 0) {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    if (!email) return res.status(400).json({ message: '"email" is required' });
    next();
  } catch (e) {
    next(e);
  }
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body;
    if (password !== undefined && password.length <= 0) {
      return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }
    if (!password) return res.status(400).json({ message: '"password" is required' });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
