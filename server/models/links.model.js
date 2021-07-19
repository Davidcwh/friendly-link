const db = require('./db');

function Link(link) {
    this.shortCode = link.shortCode;
    this.originalUrl = link.originalUrl;
    this.hasProtocol = link.hasProtocol;
    this.userId = link.userId;
    this.dateCreated = link.dateCreated;
    this.encryption = link.encryption;
}

Link.create = (link, callback) => {
    // non-user link
    if(link.userId === undefined) {
        db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol) VALUES ($1, $2, $3)', 
            [link.shortCode, link.originalUrl, link.hasProtocol], 
            (error, results) => {
                if(error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
            }
        );
    } else if(link.encryption === undefined) { // user link that is not locked
        db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId) VALUES ($1, $2, $3, $4)', 
            [link.shortCode, link.originalUrl, link.hasProtocol, link.userId], 
            (error, results) => {
                if(error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
            }
        );
    } else { // user link that is locked
        db.query('INSERT INTO Links (shortCode, originalUrl, hasProtocol, userId, cipherText, iv, salt) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [link.shortCode, link.originalUrl, link.hasProtocol, link.userId, link.encryption.cipherText, link.encryption.iv, link.encryption.salt], 
            (error, results) => {
                if(error) {
                    callback(error, null);
                } else {
                    callback(null, results);
                }
            }
        );
    }
};

Link.getByShortCode = (shortCode, callback) => {
    db.query('SELECT originalUrl, hasProtocol, cipherText, iv, salt FROM Links WHERE shortCode = $1', [shortCode],
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};

Link.getByUserId = (userId, callback) => {
    db.query('SELECT originalUrl, shortCode, dateCreated::text FROM Links WHERE userId = $1', [userId],
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
