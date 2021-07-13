const app = require("./config/app");
const serverless = require('serverless-http')

module.exports.run = serverless(app);