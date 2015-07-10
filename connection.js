var database = require('monk')(process.env.MONGOLAB_URI);
module.exports = database;
