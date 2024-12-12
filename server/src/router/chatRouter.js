const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');

chatRouter.post('/newMessage', chatController.addMessage);

chatRouter.get('/getChat', chatController.getChat);

chatRouter.get('/getPreview', chatController.getPreview);

chatRouter.put('/blackList', chatController.blackList);

chatRouter.put('/favorite', chatController.favoriteChat);

chatRouter.post('/createCatalog', chatController.createCatalog);

chatRouter.put('/updateNameCatalog', chatController.updateNameCatalog);

chatRouter.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

chatRouter.delete(
  '/removeChatFromCatalog/:chatId/:catalogId',
  chatController.removeChatFromCatalog
);

chatRouter.delete('/deleteCatalog/:catalogId', chatController.deleteCatalog);

chatRouter.get('/getCatalogs', chatController.getCatalogs);
module.exports = chatRouter;
