const Pool = require('pg').Pool;
const validUrl = require('valid-url');
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
    
    if(!validUrl.isUri(originalUrl)) {
        return res.status(404).json('Invalid Url Given');
    }

    // Note that shorUrl is not saved in the db, only the shortCode is.
    const shortCode = generateShortCode();
    const shortUrl = shortBaseUrl + '/' + shortCode;
    pool.query('INSERT INTO Links (shortCode, originalURL) VALUES ($1, $2)', [shortCode, originalUrl], 
        (error, results) => {
            if(error) {
                console.log(error);
                res.status(404).json(error);
            } else {
                res.status(201).json({ originalUrl, shortCode, shortUrl});
            }
        }
    );
};

const getOriginalUrl = (req, res) => {
    const shortCode = req.params.shortcode;
    pool.query('SELECT originalURL FROM Links WHERE shortCode = $1', [shortCode],
        (error, results) => {
            if(error) {
                res.status(404).json(error);
                return;
            }

            if(results.rowCount == 0) {
                res.status(404).send('No URL associated with given short code');
                return;
            }

            const originalURL = results.rows[0].originalurl;
            return res.redirect(originalURL);
        }
    );
};

module.exports = app => {
    app.post('/createShortUrl', createShortUrl),
    app.get('/goto/:shortcode', getOriginalUrl)
}