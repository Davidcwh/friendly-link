const db = require('./db');

function User(user) {
    this.userId = user.userId;
    this.email = user.email;
}

User.create = (user, callback) => {
    db.query('INSERT INTO Users (userId, email) VALUES ($1, $2)', [user.userId, user.email], 
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};

module.exports = User;
