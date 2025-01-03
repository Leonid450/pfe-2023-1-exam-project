const CONSTANTS = require('../constants');
const db = require(CONSTANTS.MODEL_FILES_PATH);
const userQueries = require('./queries/userQueries');
const contestQueries = require('./queries/contestQueries');
const controller = require('../socketInit');
module.exports.setNewOffer = async (req, res, next) => {
  let transaction;
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    transaction = await db.sequelize.transaction();
    const result = await contestQueries.createOffer(obj, transaction);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    transaction.commit();
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    transaction.rollback();
    next(e);
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  if (arrayRoomsId.length > 0) {
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        arrayRoomsId,
        'Someone of yours offers was rejected',
        contestId
      );
  }
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      transaction.commit();
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getOffersForModeration = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    const offers = await db.Offer.findAll({
      where: { moderation: 'on moderation' },
      limit: limit,
      offset: offset ? offset : 0,

      order: [['id', 'DESC']],
    });

    res.send(offers);
  } catch (err) {
    next(err);
  }
};

module.exports.setModerationStatusOfOffers = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { 0: offerId, 1: moderation } = req.body;
    await db.Offer.update(
      { moderation: moderation },
      {
        where: { id: offerId },
      },
      transaction
    );
    transaction.commit();
    const offerChecked = await db.Offer.findAll({
      where: { id: offerId },
      attributes: ['id', 'moderation'],

      include: [
        {
          model: db.User,
          required: true,
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
    });

    res.send(offerChecked);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
