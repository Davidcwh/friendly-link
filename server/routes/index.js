const linksRoutes = require('./linksRoutes');
const usersRoutes = require('./usersRoutes')

module.exports = app => {
    linksRoutes(app),
    usersRoutes(app)
}