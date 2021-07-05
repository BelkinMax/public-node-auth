require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    const JWS_SIGN_KEY = process.env.JWS_SIGN_KEY;

    if (!token) {
      return res.status(403).json({ message: 'Token does not found!' });
    }

    const decodedData = jwt.verify(token, JWS_SIGN_KEY);

    req.user = decodedData;

    next();
  } catch (e) {
    console.error(e);
    return res.status(403).json({ message: 'Access forbidden!' });
  }
};
