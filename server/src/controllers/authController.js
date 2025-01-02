const NotUniqueEmail = require('../errors/NotUniqueEmail');
const CONSTANTS = require('../constants');
const NotFound = require('../errors/UserNotFoundError');
const userQueries = require('./queries/userQueries');
const JWTService = require('../utils/jwt');
const bd = require(CONSTANTS.MODEL_FILES_PATH);
module.exports.refresh = async (req, res, next) => {
  try {
    const { iat, exp, ...tokenData } = req.body;
    const refreshToken = await JWTService.createRefreshToken(tokenData);
    const accessToken = await JWTService.createAccessToken(tokenData);
    await userQueries.updateUser(
      { refreshToken: refreshToken },
      tokenData.userId
    );

    res
      .status(201)
      .send({ ...tokenData, tokenPair: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    const foundUser = await userQueries.findUser({ email: req.body.email });

    const isValidPassword = await foundUser.passwordCompare(req.body.password);

    if (!isValidPassword) {
      throw new NotFound('user with this data dont exist');
    }
    const tokenData = {
      firstName: foundUser.firstName,
      userId: foundUser.id,
      role: foundUser.role,
      lastName: foundUser.lastName,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
      rating: foundUser.rating,
    };
    const refreshToken = await JWTService.createRefreshToken(tokenData);
    const accessToken = await JWTService.createAccessToken(tokenData);
    await userQueries.updateUser({ refreshToken }, foundUser.id, transaction);
    transaction.commit();
    res.send({ tokenData, tokenPair: { refreshToken, accessToken } });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
module.exports.registration = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    const newUser = await userQueries.userCreation(req.body, transaction);
    const tokenData = {
      firstName: newUser.firstName,
      userId: newUser.id,
      role: newUser.role,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      displayName: newUser.displayName,
      balance: newUser.balance,
      email: newUser.email,
      rating: newUser.rating,
    };
    const refreshToken = await JWTService.createRefreshToken(tokenData);
    const accessToken = await JWTService.createAccessToken(tokenData);
    await userQueries.updateUser({ refreshToken }, newUser.id, transaction);
    transaction.commit();
    res.send({ tokenPair: { refreshToken, accessToken } });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      transaction.rollback();
      next(err);
    }
  }
};
