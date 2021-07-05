const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('./models/User');

const Role = require('./models/Role');

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
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Login error!' });
    }
  }
  async getUsers(req, res) {
    try {
      await res.json('Hello World!');
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new AuthController();
