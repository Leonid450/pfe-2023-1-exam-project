const CONSTANTS = require('../constants');
const db = require(CONSTANTS.MODEL_FILES_PATH);
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const UtilFunctions = require('../utils/functions');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;

    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError('cannot get contest preferences'));
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      tokenData: { role, userId },
    } = req;

    let contestInfo = await db.Contest.findOne({
      where: { id: contestId },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where:
            role === CONSTANTS.CREATOR
              ? { userId, moderation: 'allowed' }
              : { moderation: 'allowed' },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(e);
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  const {
    params: { contestId },
    tokenData: { userId },
  } = req;

  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const updatedContest = await contestQueries.updateContest(
      req.body,
      {
        id: contestId,
        userId,
      },
      transaction
    );
    transaction.commit();
    res.send(updatedContest);
  } catch (e) {
    transaction.rollback();
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  const {
    query: { limit, offset, status },
  } = req;
  try {
    const contests = await db.Contest.findAll({
      where: { status, userId: req.tokenData.userId },
      limit,
      offset: offset ? offset : 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offer,
          where: { moderation: 'allowed' },
          required: false,
          attributes: ['id'],
        },
      ],
    });
    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }
    res.send({ contests, haveMore });
  } catch (err) {
    next(err);
  }
};

module.exports.getContests = async (req, res, next) => {
  const {
    query: {
      typeIndex,
      contestId,
      industry,
      awardSort,
      limit,
      offset,
      ownEntries,
    },
  } = req;
  try {
    const predicates = UtilFunctions.createWhereForAllContests(
      typeIndex,
      contestId,
      industry,
      awardSort
    );

    const isOwnEntries = ownEntries === 'true' ? true : false;

    const contests = await db.Contest.findAll({
      where: predicates.where,
      order: predicates.order,
      limit: limit,
      offset: offset ? offset : 0,
      include: [
        {
          model: db.Offer,
          required: isOwnEntries,
          where: isOwnEntries ? { userId: req.tokenData.userId } : {},
          attributes: ['id'],
        },
      ],
    });
    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }
    res.send({ contests, haveMore });
  } catch (err) {
    next(err);
  }
};
