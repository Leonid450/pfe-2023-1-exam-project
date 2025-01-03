const JWTService = require('../utils/jwt');
const TokenError = require('../errors/TokenError');
const { User } = require('../models');

module.exports.checkAccessToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = await JWTService.verifyAccessToken(accessToken);
    next();
  } catch (err) {
    next(new TokenError());
  }
};
module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { token },
    } = req;
    if (!token) {
      return next(new TokenError('need token'));
    }
    const tokenData = await JWTService.verifyRefreshToken(token);
    const userData = await User.findOne({
      where: { refreshToken: token },
    });
    if (!userData) {
      return next(new TokenError('Token not found'));
    } else req.body = tokenData;
    next();
  } catch (err) {
    next(new TokenError());
  }
};
