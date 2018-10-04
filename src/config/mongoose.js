const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/

console.log(`mongodb+srv://${mongo.user}:${mongo.password}@${mongo.uri}`)
exports.connect = () => {
  mongoose.connect(
    `mongodb+srv://${mongo.user}:${mongo.password}@${mongo.uri}`,
    {
      dbName: mongo.dbName,
      useNewUrlParser: true
    }
  );
  return mongoose.connection;
};
