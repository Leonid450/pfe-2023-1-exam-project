const contestRouter = require('express').Router();
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');


contestRouter.get('/customers', contestController.getCustomersContests);


contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest
);
contestRouter.post('/dataForContest', contestController.dataForContest);

contestRouter.get('/downloadFile/:fileName', contestController.downloadFile);

contestRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

contestRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);
module.exports = contestRouter;
