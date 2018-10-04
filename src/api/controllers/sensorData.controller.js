const httpStatus = require('http-status');
const { omit } = require('lodash');
const SensorData = require('../models/sensorData.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load user and append to req.
 * @public
 */
// exports.load = async (req, res, next, id) => {
//   try {
//     const user = await User.get(id);
//     req.locals = { user };
//     return next();
//   } catch (error) {
//     return errorHandler(error, req, res);
//   }
// };


/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const sensorData = new SensorData(req.body);
    const savedSensorData = await sensorData.save();
    res.status(httpStatus.CREATED);
    res.json(savedSensorData.transform());
  } catch (error) {
    // next(User.checkDuplicateEmail(error));
  }
};

exports.getPast24Hours = async (req, res, next) => {
  const data = await SensorData.getPast24Hours(req.query);
  res.send(data);
};

exports.last = async (req, res, next) => {
  const data = await SensorData.last(req.query);
  res.send(data);
};
