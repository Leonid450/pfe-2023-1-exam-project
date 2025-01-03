const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const validators = require('../middlewares/validators');
const checkToken = require('../middlewares/checkToken');
authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  authController.registration
);

authRouter.post('/login', validators.validateLogin, authController.login);

authRouter.post(
  '/refresh',
  checkToken.checkRefreshToken,
  authController.refresh
);
module.exports = authRouter;
