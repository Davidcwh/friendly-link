const Pool = require('pg').Pool;
const validator = require('validator');
const { generateShortCode } = require('../middlewares/uniqueUrlCode');
const { shortBaseUrl } = require('../config/constants');
require('dotenv').config();

const pgConnectInfo = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const pool = new Pool(pgConnectInfo);

const createShortUrl = (req, res) => {
    const { originalUrl } = req.body;

    if(!validator.isURL(originalUrl)) {
        return res.status(404).json('Invalid url given');
    }

    const hasProtocol = validator.isURL(originalUrl, { require_protocol: true});

    // Note that shorUrl is not saved in the db, only the shortCode is.
    const shortCode = generateShortCode();
    const shortUrl = shortBaseUrl + '/' + shortCode;
    pool.query('INSERT INTO Links (shortCode, originalURL, hasProtocol) VALUES ($1, $2, $3)', [shortCode, originalUrl, hasProtocol], 
        (error, results) => {
            if(error) {
                console.log(error);
                res.status(404).json('Could not save url given');
            } else {
                res.status(201).json({ originalUrl, shortCode, shortUrl});
            }
        }
    );
};

const getOriginalUrl = (req, res) => {
    const shortCode = req.params.shortcode;
    pool.query('SELECT originalURL, hasProtocol FROM Links WHERE shortCode = $1', [shortCode],
        (error, results) => {
            if(error) {
                res.status(404).json(error);
                return;
            }

            if(results.rowCount == 0) {
                res.status(404).send('No URL associated with given short code');
                return;
            }

            var originalURL = results.rows[0].originalurl;
            const hasProtocol = results.rows[0].hasprotocol;
            if(!hasProtocol) {
                originalURL = '//' + originalURL;
            }
            return res.redirect(originalURL);
        }
    );
};

module.exports = app => {
    app.post('/createShortUrl', createShortUrl),
    app.get('/goto/:shortcode', getOriginalUrl)
}