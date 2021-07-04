const linksRoutes = require('./linksRoutes');
const usersRoutes = require('./usersRoutes');
const clicksRoutes = require('./clicksRoutes');

module.exports = app => {
    linksRoutes(app),
    usersRoutes(app),
    clicksRoutes(app)
}