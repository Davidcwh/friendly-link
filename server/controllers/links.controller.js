const Link = require('../models/links.model');
const validator = require('validator');
const { generateShortCode } = require('../middlewares/uniqueUrlCode');
const shortBaseUrl = process.env.SERVER_URL;

const createShortUrl = (req, res) => {
    const { originalUrl } = req.body;

    if(!validator.isURL(originalUrl)) {
        return res.status(500).json('Invalid url given');
    }

    const hasProtocol = validator.isURL(originalUrl, { require_protocol: true});

    // Note that shorUrl is not saved in the db, only the shortCode is.
    const shortCode = generateShortCode();
    Link.create({ shortCode, originalUrl, hasProtocol }, (err, data) => {
        if(err) {
            res.status(500).json('Could not save url given');
            // console.log(err.stack)
            // res.status(500).json(err.stack);
        } else {
            const shortUrl = shortBaseUrl + '/' + shortCode;
            res.status(201).json({ originalUrl, shortCode, shortUrl});
        }
    });
};

const getOriginalUrl = (req, res) => {
    const shortCode = req.params.shortcode;
    Link.getByShortCode(shortCode, (err, data) => {
        if(err) {
            res.status(500).json('Error retrieving original URL');
            return;
        }

        if(data.rowCount == 0) {
            res.status(404).send('No URL associated with given short code');
            return;
        }

        var originalUrl = data.rows[0].originalurl;
        const hasProtocol = data.rows[0].hasprotocol;
        if(!hasProtocol) {
            originalUrl = '//' + originalUrl;
        }
        return res.redirect(301, originalUrl);
    })
};

module.exports = {
    createShortUrl,
    getOriginalUrl
}