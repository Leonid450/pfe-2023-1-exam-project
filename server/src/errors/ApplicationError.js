const logger = require('../../src/lib/logger/logger');
class ApplicationError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again';
    this.code = status || 500;
    const stack = this.stack;

    logger(this.message, this.code, stack);
  }
}

module.exports = ApplicationError;
