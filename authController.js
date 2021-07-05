require('dotenv').config();

const JWS_SIGN_KEY = process.env.JWS_SIGN_KEY;

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

const User = require('./models/User');

const Role = require('./models/Role');

const generateAccessToken = (params) => {
  const { id, roles, sign, expires } = params;

  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, sign, { expiresIn: expires });
};

class AuthController {
  async registration(req, res) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation error!', validationErrors });
      }

      const { username, password } = req.body;

      // Try find in ddbb. Return if already exists
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `Username ${username} is already exists!` });
      }

      // Get role
      const userRole = await Role.findOne({ value: 'USER' });

      // Hash password
      const hashPassword = bcrypt.hashSync(password, 7);

      // Create and save user
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();

      return res.json({ message: 'Registration completed successfully!' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Registration error!' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Try find in ddbb. Return if not exists
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `Username ${username} is not exists!` });
      }

      // Validate password
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `The password is not valid!` });
      }

      // Get jws token
      const token = generateAccessToken({
        id: user._id,
        roles: user.roles,
        sign: JWS_SIGN_KEY,
        expires: '12h',
      });

      return res.json({ token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Login error!' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new AuthController();
