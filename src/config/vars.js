// const path = require('path');

// // import .env variables
// require('dotenv-safe').load({
//   path: path.join(__dirname, '../../.env'),
//   sample: path.join(__dirname, '../../.env.example'),
// });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.BIGMARIO_API_PORT,
  mongo: {
    uri: process.env.BIGMARIO_API_MONGO_URI,
    password: process.env.BIGMARIO_API_MONGO_PASSWORD,
    user: process.env.BIGMARIO_API_MONGO_USER,
    dbName: process.env.BIGMARIO_API_MONGO_DB_NAME
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
