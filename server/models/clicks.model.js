const db = require('./db');

function Click(click) {
    this.shortCode = click.shortCode;
    this.clickId = click.clickId;
    this.clickDate = click.clickDate;
}

Click.create = (shortCode, callback) => {
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

Click.getTotalClickCount = (shortCode, callback) => {
    db.query('SELECT count(*) FROM Clicks WHERE shortCode = $1', [shortCode],
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};



module.exports = Click;
