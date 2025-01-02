const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

userRouter.put(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.put('/updateUser', upload.uploadAvatar, userController.updateUser);

module.exports = userRouter;
