const User = require('./models/User');
const Role = require('./models/Role');

class AuthController {
  async registration(req, res) {
    try {
    } catch (e) {
      console.error(e);
    }
  }
  async login(req, res) {
    try {
    } catch (e) {
      console.error(e);
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
