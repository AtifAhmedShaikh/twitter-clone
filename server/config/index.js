const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const mongooseDBConnectString = process.env.DATABASECONNECTIONSTRING;
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
const accessRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const appPath = process.env.APP_PATH;
module.exports = {
  PORT,
  mongooseDBConnectString,
  accessTokenSecretKey,
  accessRefreshTokenSecret,
  appPath,
};
