const offerRouter = require('express').Router();
const offerController = require('../controllers/offersController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

offerRouter.get(
  '/offersList',
  basicMiddlewares.onlyForModerator,
  offerController.getOffersForModeration
);
offerRouter.post(
  '/checked',
  basicMiddlewares.onlyForModerator,
  offerController.setModerationStatusOfOffers
);
module.exports = offerRouter;
