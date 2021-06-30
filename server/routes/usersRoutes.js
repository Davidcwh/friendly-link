const usersController = require('../controllers/users.controller');

module.exports = app => {
    app.post('/createUser', usersController.createUser)
    // app.get('/goto/:shortcode', linksController.getOriginalUrl)
}
