const { Router } = require('express');

const router = new Router();

const AuthController = require('./authController');

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', AuthController.getUsers);

module.exports = router;
