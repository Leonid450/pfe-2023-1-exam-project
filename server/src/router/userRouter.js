const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');

userRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

userRouter.put(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.put('/updateUser', upload.uploadAvatar, userController.updateUser);

userRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);
module.exports = userRouter;
