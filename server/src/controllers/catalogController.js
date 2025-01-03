const CONSTANTS = require('../constants');
const db = require(CONSTANTS.MODEL_FILES_PATH);

module.exports.createCatalog = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const catalog = await db.Catalog.create(
      {
        userId: req.tokenData.userId,
        catalogName: req.body.catalogName,
        conversationId: req.body.chatId,
      },
      transaction
    );

    const chat = await db.Conversation.findOne({
      where: { id: req.body.chatId },
    });
    if (catalog) {
      await chat.addCatalog(catalog);
      const chatsInCatalog = await db.Catalog.findOne({
        where: { id: catalog.dataValues.id },
        include: [
          {
            model: db.Conversation,
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return chatsInCatalog;
    }
    transaction.commit();
    res.send(chatsInCatalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const catalog = await db.Catalog.findByPk(req.body.catalogId);
    const updateNameCatalog = await catalog.update(
      {
        catalogName: req.body.catalogName,
      },
      transaction
    );
    transaction.commit();
    res.send(updateNameCatalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const chat = await db.Conversation.findByPk(req.body.chatId);
    const catalog = await db.Catalog.findByPk(req.body.catalogId);

    const addCatalog = await catalog.addConversation(chat, transaction);
    transaction.commit();
    res.send(addCatalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const chat = await db.Conversation.findByPk(req.params.chatId);
    const catalog = await db.Catalog.findByPk(req.params.catalogId);

    await catalog.removeConversation(chat, transaction);
    transaction.commit();
    const catalogReduced = await db.Catalog.findOne({
      where: { id: req.params.catalogId },
      include: [
        {
          model: db.Conversation,
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.send(catalogReduced);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    await db.Catalog.destroy({
      where: { id: req.params.catalogId },
      transaction,
    });
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalog.findAll({
      where: { userId: req.tokenData.userId },
      include: [
        {
          model: db.Conversation,
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
