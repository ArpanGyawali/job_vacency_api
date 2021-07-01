require("dotenv").config();

module.exports = {
   DB: process.env.ATLAS_URI,
   PORT: process.env.APP_PORT,
   SECRET: process.env.APP_SECRET
};
