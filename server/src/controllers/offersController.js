const db = require('../models');

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
  try {
    const { 0: offerId, 1: moderation } = req.body;
    await db.Offer.update(
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
  } catch (err) {
    next(err);
  }
};
