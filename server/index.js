const https = require('https')

const app = require("./server");
var privateKey = fs.readFileSync( '/etc/letsencrypt/live/frnd.link/privkey.pem' );
var certificate = fs.readFileSync( '/etc/letsencrypt/live/frnd.link/cert.pem' );

const port = 3000;

https.createServer({
    key: privateKey,
    cert: certificate
}, app.listen(port, () => {
    console.log(`App running on port ${port}.`)
}))
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// });