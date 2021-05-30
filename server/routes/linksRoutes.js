const linksController = require('../controllers/links.controller');

module.exports = app => {
    app.post('/createShortUrl', linksController.createShortUrl),
    app.get('/goto/:shortcode', linksController.getOriginalUrl)
}