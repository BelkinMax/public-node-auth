const { Router } = require('express');

const router = new Router();

const AuthController = require('./authController');

//const authMiddleware = require('./middleware/authMiddleware');

const roleMiddleware = require('./middleware/roleMiddleware');

const { check } = require('express-validator');

router.post(
  '/registration',
  [check('username', 'Username cant be empty!').trim().notEmpty()],
  [
    check('password', 'Password must have between 4 and 12 chars!')
      .trim()
      .isLength({
        min: 4,
        max: 12,
      }),
  ],
  AuthController.registration
);
router.post('/login', AuthController.login);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);

module.exports = router;
