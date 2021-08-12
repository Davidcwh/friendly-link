const clicksController = require('../controllers/clicks.controller');

module.exports = app => {
    app.get('/getTotalClickCount/:shortcode', clicksController.getTotalClickCount),
    app.get('/getClickCountByDate/:shortcode', clicksController.getClickCountByDate)
}