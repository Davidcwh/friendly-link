const Pool = require('pg').Pool;
const config = require('../config/db.config');

module.exports = new Pool(config);