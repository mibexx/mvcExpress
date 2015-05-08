var secrets = require('./secrets');

var config = {
    mongodb: {
        host: secrets.mongodb.host,
        port: secrets.mongodb.port,
        db  : secrets.mongodb.dbname,
        user: secrets.mongodb.username,
        pass: secrets.mongodb.password
    },
    mysql: {
        host: secrets.mysql.host,
        port: secrets.mysql.port,
        db:   secrets.mysql.dbname,
        user: secrets.mysql.username,
        pass: secrets.mysql.password,
        debug: true
    }
}

module.exports = function (mode) {
    return config[mode || process.argv[2] || 'staging'] || config.staging;
}