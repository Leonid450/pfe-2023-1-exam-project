const db = require('../models');
const _ = require('lodash');

module.exports.getOffersForModeration = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;

    const offers = await db.Offer.findAll({
      where: { moderation: 'on moderation' },
      limit,
      offset: offset ? offset : 0,

      order: [['id', 'DESC']],
    });

    res.send(offers);
  } catch {
    (err) => next(new ServerError(err));
  }
};

module.exports.setModerationStatusOfOffers = async (req, res, next) => {
  try {
    const { 0: offerId, 1: moderation } = req.body;

    const updateModStatus = await db.Offer.update(
      { moderation: moderation },
      {
        where: { id: offerId },
      }
    );
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
  } catch {
    (err) => next(new ServerError(err));
  }
};
