require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      const JWS_SIGN_KEY = process.env.JWS_SIGN_KEY;

      if (!token) {
        return res.status(403).json({ message: 'Token does not found!' });
      }

      // Get and verify role existance
      const { roles: userRoles } = jwt.verify(token, JWS_SIGN_KEY);

      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({
          message: `Allowed roles: ${roles}. Current user roles: ${userRoles}.`,
        });
      }

      next();
    } catch (e) {
      console.error(e);
      return res.status(403).json({ message: 'Access forbidden!' });
    }
  };
};
