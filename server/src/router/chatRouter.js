const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');
const catalogController = require('../controllers/catalogController');

chatRouter.post('/newMessage', chatController.addMessage);

chatRouter.get('/getChat', chatController.getChat);

chatRouter.get('/getPreview', chatController.getPreview);

chatRouter.put('/blackList', chatController.blackList);

chatRouter.put('/favorite', chatController.favoriteChat);

chatRouter.post('/createCatalog', catalogController.createCatalog);

chatRouter.put('/updateNameCatalog', catalogController.updateNameCatalog);

chatRouter.post('/addNewChatToCatalog', catalogController.addNewChatToCatalog);

chatRouter.delete(
  '/removeChatFromCatalog/:chatId/:catalogId',
  catalogController.removeChatFromCatalog
);

chatRouter.delete('/deleteCatalog/:catalogId', catalogController.deleteCatalog);

chatRouter.get('/getCatalogs', catalogController.getCatalogs);
module.exports = chatRouter;
