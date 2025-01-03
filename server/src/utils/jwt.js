const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const CONSTANTS = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: CONSTANTS.ACCESS_TOKEN_SECRET,
    expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
  },
  refresh: {
    secret: CONSTANTS.REFRESH_TOKEN_SECRET,
    expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
  },
};

/**
 *  function for token creation
 * @param {object} payload
 * @param {object} option
 * @param {string} option.secret
 * @param {string | number} option.expiresIn
 * @returns {Promise<string>}
 */
const createToken = (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, {
    expiresIn,
  });

/**
 * function for token check
 * @param {string} token
 * @param {object} option
 * @param {string} option.secret
 * @returns {object}
 */
const verifyToken = (token, { secret }) => jwtVerify(token, secret);

module.exports.createAccessToken = (payload) =>
  createToken(payload, tokenConfig.access);

module.exports.verifyAccessToken = (token) =>
  verifyToken(token, tokenConfig.access);

module.exports.createRefreshToken = (payload) =>
  createToken(payload, tokenConfig.refresh);

module.exports.verifyRefreshToken = (token) =>
  verifyToken(token, tokenConfig.refresh);
