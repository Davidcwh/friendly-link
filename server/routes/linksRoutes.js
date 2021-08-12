const linksController = require('../controllers/links.controller');

module.exports = app => {
    app.post('/createShortUrl', linksController.createShortUrl),
    app.get('/getOriginalUrl/:shortcode', linksController.getOriginalUrl),
    app.get('/getUserLinks/:userid', linksController.getUserLinks),
    app.get('/getLinkEncryption/:shortcode', linksController.getLinkEncryption)
}