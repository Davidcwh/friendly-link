const { nanoid } = require('nanoid');
const { shortCodeLength } = require('../config/constants');

module.exports = {
    generateShortCode: function() {
        return nanoid(shortCodeLength);
    }
}