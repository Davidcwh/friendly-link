const Click = require('../models/clicks.model');

const getTotalClickCount = (req, res) => {
    const shortCode = req.params.shortcode;
    Click.getTotalClickCount(shortCode, (err, data) => {
        if(err) {
            res.status(500).json('Error retrieving link click count');
            return;
        }

        let clickCount = 0;
        if(data.rowCount > 0) {
            clickCount = data.rows[0].count;
        }

        res.status(200).json({ clickCount });
    })
};

module.exports = {
    getTotalClickCount
}