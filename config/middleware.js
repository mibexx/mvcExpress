module.exports = function (req, res, next) {
    req.logger = require('./middleware/logger');

    next();
}