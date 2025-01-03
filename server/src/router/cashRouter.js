const cashRouter = require('express').Router();
const cashController = require('../controllers/cashController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');

cashRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  cashController.cashout
);

cashRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  cashController.payment
);
module.exports = cashRouter;
