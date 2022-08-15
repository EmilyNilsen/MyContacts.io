const jwt = require('jsonwebtoken');
const defaultApiReturn = require('../utils/defaultApiReturn');

module.exports = async (req, res, next) => {  
  try {
    const token = req.headers.authorization;
  
    if (token.length === 0) {
      return res.status(401).json(defaultApiReturn({ error: { message: 'Token não encontrado' } }));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.tokenData = decoded.data;
    next();
  } catch (error) {
    console.error(error.message);
    if (error.name.includes('Token')) {
      return res.status(401).json(defaultApiReturn({ error: { message: error } }));
    }
    next(error);
  }
};
