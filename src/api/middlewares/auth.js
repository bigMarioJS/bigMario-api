const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { secret } = require('../../config/vars');



exports.authorize = () => (req, res, next) => {
  // TODO make legit
  if (req.get('x-api-key') !== secret ) {
    const apiError = new APIError({
      message: 'Unauthorized',
      status: httpStatus.UNAUTHORIZED,
      stack: undefined,
    });
    return next(apiError);
  }

  return next();
};

