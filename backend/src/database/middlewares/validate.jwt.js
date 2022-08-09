const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {  
  try {
    const token = req.headers.authorization;
  
  if (token.length === 0) return res.status(401).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.tokenData = decoded.data;
    console.log(req.tokenData);
    next();
  } catch (error) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: error });
    }
    next(error);
  }
};
