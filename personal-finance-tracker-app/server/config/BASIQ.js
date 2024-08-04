require("dotenv").config();

module.exports = {
  BASIQ_API_KEY: process.env.BASIQ_SECRET,
  BASIQ_API_URL: "https://au-api.basiq.io",
  BASIQ_API_VERSION: "3.0",
};
