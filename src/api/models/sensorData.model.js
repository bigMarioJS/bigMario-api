const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
* User Roles
*/
// const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const sensorDataSchema = new mongoose.Schema(
  {
    environmentId: {
      type: String,
      required: false,
      trim: true,
    },
    tempatureCelsiusOne: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
    },
    tempatureCelsiusTwo: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
    },
    relativeHumidityOne: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
    },
    relativeHumidityTwo: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
    },
    recordedAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * Methods
 */
sensorDataSchema.method({
  transform() {
    const transformed = {};
    const fields = ['environmentId', 'tempatureCelsiusOne', 'tempatureCelsiusTwo', 'relativeHumidityOne', 'relativeHumidityTwo', 'createdAt', 'recordedAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  // token() {
  //   const playload = {
  //     exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
  //     iat: moment().unix(),
  //     sub: this._id,
  //   };
  //   return jwt.encode(playload, jwtSecret);
  // },

  // async passwordMatches(password) {
  //   return bcrypt.compare(password, this.password);
  // },
});

/**
 * Statics
 */
sensorDataSchema.statics = {


  getPast24Hours() {
    return this.find({ recordedAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
  },

};

/**
 * @typedef SensorData
 */
module.exports = mongoose.model('SensorData', sensorDataSchema);
