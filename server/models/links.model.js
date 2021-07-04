const db = require('./db');

function Link(link) {
    this.shortCode = link.shortCode;
    this.originalUrl = link.originalUrl;
    this.hasProtocol = link.hasProtocol;
    this.userId = link.userId;
}

Link.create = (link, callback) => {
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
    } else {
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
    }
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

Link.addClick = (shortCode, callback) => {
    db.query('INSERT INTO Clicks (shortCode) VALUES ($1)', [shortCode],
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
