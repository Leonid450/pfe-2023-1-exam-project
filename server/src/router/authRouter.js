const authRouter = require('express').Router();
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const checkToken = require('../middlewares/checkToken');
authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  userController.registration
);

authRouter.post('/login', validators.validateLogin, userController.login);

authRouter.get('/getUser', checkToken.checkAuth);

module.exports = authRouter;
