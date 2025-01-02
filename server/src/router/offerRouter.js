const offerRouter = require('express').Router();
const offerController = require('../controllers/offersController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
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
offerRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offerController.setNewOffer
);
offerRouter.put(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus
);
module.exports = offerRouter;
