const Link = require('../models/links.model');
const validator = require('validator');
const { generateShortCode } = require('../middlewares/uniqueUrlCode');
const shortBaseUrl = process.env.SERVER_URL;

const createShortUrl = (req, res) => {
    const { originalUrl, userId } = req.body;

    if(!validator.isURL(originalUrl)) {
        return res.status(500).json('Invalid url given');
    }

    const hasProtocol = validator.isURL(originalUrl, { require_protocol: true});

    // Note that shorUrl is not saved in the db, only the shortCode is.
    const shortCode = generateShortCode();
    Link.create({ shortCode, originalUrl, hasProtocol, userId }, (err, data) => {
        if(err) {
            res.status(500).json('Could not save url given');
            // console.log(err.stack)
            // res.status(500).json(err.stack);
        } else {
            const shortUrl = shortBaseUrl + '/' + shortCode;
            const responseBody = userId === undefined ? { originalUrl, shortCode, shortUrl } : { originalUrl, shortCode, shortUrl, userId }
            res.status(201).json(responseBody);
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

        Link.addClick(shortCode, (err, data) => {
            if(err) {
                console.error(err.stack)
            }
        })
        return res.redirect(302, originalUrl);
    })
};

const getUserLinks = (req, res) => {
    const userId = req.params.userid;
    Link.getByUserId(userId, (err, data) => {
        if(err) {
            res.status(500).json('Error retrieving user links');
            return;
        }

        const results = data.rows.map((row) => {
            const shortUrl = shortBaseUrl + '/' + row.shortcode;
            return {
                shortUrl,
                ...row
            }
        })

        res.status(200).json(results);
    })
}

module.exports = {
    createShortUrl,
    getOriginalUrl,
    getUserLinks
}