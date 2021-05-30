const db = require('./db');

function Link(link) {
    this.shortCode = link.shortCode;
    this.originalUrl = link.originalUrl;
    this.hasProtocol = link.hasProtocol;
}

Link.create = (link, callback) => {
    db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol) VALUES ($1, $2, $3)', [link.shortCode, link.originalUrl, link.hasProtocol], 
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};

Link.getByShortCode = (shortCode, callback) => {
    db.query('SELECT originalUrl, hasProtocol FROM Links WHERE shortCode = $1', [shortCode],
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};

module.exports = Link;
