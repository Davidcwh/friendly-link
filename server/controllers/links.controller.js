const Link = require('../models/links.model');
const Click = require('../models/clicks.model');
const validator = require('validator');
const { generateShortCode } = require('../middlewares/uniqueUrlCode');
const shortBaseUrl = process.env.SERVER_URL;

const createShortUrl = (req, res) => {
    const { originalUrl, userId, encryption } = req.body;
    const parsedEncryption = encryption !== undefined ? JSON.parse(encryption) : undefined;

    if(!validator.isURL(originalUrl)) {
        return res.status(500).json('Invalid url given');
    }

    const hasProtocol = validator.isURL(originalUrl, { require_protocol: true});

    // Note that shorUrl is not saved in the db, only the shortCode is.
    const shortCode = generateShortCode();
    Link.create({ shortCode, originalUrl, hasProtocol, userId, encryption: parsedEncryption }, (err, data) => {
        if(err) {
            res.status(500).json('Could not save url given');
            // console.log(err.stack)
            // res.status(500).json(err.stack);
        } else {
            const shortUrl = shortBaseUrl + '/' + shortCode;
            const responseBody = userId === undefined ? { originalUrl, shortCode, shortUrl, hasProtocol } : { originalUrl, shortCode, shortUrl, hasProtocol, userId }
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

        Click.create(shortCode, (err, data) => {
            if(err) {
                console.error(err.stack)
            }
        });

        res.status(200).json({originalUrl});
    })
};

const getLinkEncryption = (req, res) => {
    const shortCode = req.params.shortcode;
    Link.getByShortCode(shortCode, (err, data) => {
        if(err) {
            res.status(500).json('Error retrieving link encryption data');
            return;
        }

        if(data.rowCount == 0) {
            res.status(404).send('No URL associated with given short code');
            return;
        }

        const cipherText = data.rows[0].ciphertext;
        const iv = data.rows[0].iv;
        const salt = data.rows[0].salt;

        return res.status(200).json({
            encryption: { cipherText, iv, salt }
        })
        
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
    getUserLinks,
    getLinkEncryption
}