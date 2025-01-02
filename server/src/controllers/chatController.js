const CONSTANTS = require('../constants');
const db = require(CONSTANTS.MODEL_FILES_PATH);
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    let newChat = { dataValues: { id: req.body.chatId } };
    if (!req.body.chatId) {
      newChat = await db.Conversation.create(transaction);
      const participant1 = await db.User.findByPk(req.tokenData.userId);
      const participant2 = await db.User.findByPk(req.body.recipient);
      await newChat.addUser([participant1, participant2], transaction);
    }

    const chat = await db.Conversation.findOne({
      where: { id: newChat.dataValues.id },
      include: [
        {
          model: db.User,
          attributes: ['id'],
          through: {
            attributes: ['blackList', 'favoriteList'],
          },
        },
      ],
    });

    const message = await db.Message.create(
      {
        userId: req.tokenData.userId,
        body: req.body.messageBody,
        conversationId: chat.dataValues.id,
      },
      transaction
    );
    transaction.commit();

    const black = [];
    chat.dataValues.Users.forEach((user) => {
      black.push(user.dataValues.users_to_conversation.dataValues.blackList);
      chat.dataValues.blackList = black;
      if (user.id === req.tokenData.userId) {
        const { favoriteList } =
          user.dataValues.users_to_conversation.dataValues;
        chat.dataValues = {
          favoriteList,
          ...chat.dataValues,
        };
      }
    });
    message.dataValues.participants = participants;

    const interlocutorId = req.body.recipient;

    const preview = {
      id: chat.dataValues.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createdAt: message.dataValues.createdAt,
      participants: participants,
      blackList: chat.dataValues.blackList,
      favoriteList: chat.dataValues.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message: message,
      preview: {
        id: chat.dataValues.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createdAt: message.dataValues.createdAt,
        participants: participants,
        blackList: chat.dataValues.blackList,
        favoriteList: chat.dataValues.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.query.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const messages = await db.Message.findAll({
      where: { conversationId: req.query.chatId },
      limit: 100,
      order: [['id', 'asc']],
    });

    const interlocutor = await userQueries.findUser({
      id: req.query.interlocutorId,
    });

    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversationsOfUser = await db.Conversation.findAll({
      include: [
        {
          model: db.User,
          required: true,
          where: { id: req.tokenData.userId },
          attributes: ['id'],
          through: {
            attributes: ['blackList', 'favoriteList'],
          },
        },
      ],
    });

    const chatId = conversationsOfUser?.map((conv) => conv.dataValues.id);
    const conversations = await db.Conversation.findAll({
      where: { id: chatId },
      attributes: ['id'],
      order: [[db.Message, 'id', 'desc']],
      include: [
        {
          model: db.Message,
          attributes: { exclude: ['conversationId'] },
        },
      ],
    });
    const usersInChat = await db.Conversation.findAll({
      where: { id: chatId },
      order: [[db.User, 'id', 'asc']],
      attributes: ['id'],
      include: [
        {
          model: db.User,
          attributes: ['id'],
          through: {
            attributes: ['blackList', 'favoriteList'],
          },
          order: [['id', 'asc']],
        },
      ],
    });

    const interlocutorsId = [];
    usersInChat.forEach((conversation) => {
      conversation.dataValues.Users.forEach((user) => {
        if (user.id !== req.tokenData.userId) {
          interlocutorsId.push(user.dataValues.id);
        }
      });
    });
    const interlocutors = _.uniq(interlocutorsId);

    const senders = await db.User.findAll({
      where: { id: interlocutors },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    conversations.forEach((conversation) => {
      usersInChat.forEach((con) => {
        if (con.dataValues.id === conversation.dataValues.id) {
          const blackList = [];
          con.dataValues.Users.forEach((user) => {
            blackList.push(
              user.dataValues.users_to_conversation.dataValues.blackList
            );
            conversation.dataValues.blackList = blackList;

            if (user.dataValues.id !== req.tokenData.userId) {
              conversation.dataValues.participants = [
                req.tokenData.userId,
                user.dataValues.id,
              ];
              conversation.dataValues.participants.sort(
                (participant1, participant2) => participant1 - participant2
              );
              senders.forEach((sender) => {
                if (user.dataValues.id === sender.dataValues.id) {
                  conversation.dataValues.interlocutor = {
                    id: sender.dataValues.id,
                    firstName: sender.dataValues.firstName,
                    lastName: sender.dataValues.lastName,
                    displayName: sender.dataValues.displayName,
                    avatar: sender.dataValues.avatar,
                  };
                }
              });
            } else {
              const { favoriteList } =
                user.dataValues.users_to_conversation.dataValues;
              conversation.dataValues = {
                favoriteList,
                ...conversation.dataValues,
              };

              conversation.dataValues.sender =
                conversation.dataValues.Messages[0].userId;
              conversation.dataValues.text =
                conversation.dataValues.Messages[0].body;
              conversation.dataValues.createdAt =
                conversation.dataValues.Messages[0].createdAt;
            }
          });
          delete conversation.dataValues.Messages;
        }
      });
    });

    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    await db.Users_to_conversation.update(
      {
        blackList: req.body.blackListFlag,
      },
      {
        where: {
          conversationId: req.body.chatId,
          userId: req.tokenData.userId,
        },
      },
      transaction
    );
    transaction.commit();
    const chatB = await db.Users_to_conversation.findAll({
      where: { conversationId: req.body.chatId },
      order: [['userId', 'asc']],
      attributes: ['userId', 'blackList'],
    });
    const changeBlackList = {};
    const blackList = [];
    changeBlackList.participants = req.body.participants;
    chatB.forEach((utc) => {
      blackList.push(utc.dataValues.blackList);
      changeBlackList.blackList = blackList;
    });
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, changeBlackList);
    res.send(changeBlackList);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const chatF = await db.Users_to_conversation.update(
      {
        favoriteList: req.body.favoriteFlag,
      },
      {
        where: {
          conversationId: req.body.chatId,
          userId: req.tokenData.userId,
        },
        returning: true,
      },
      transaction
    );
    transaction.commit();
    res.send(chatF);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
