var config = {
    staging: {
        mode: 'staging',
        port: 7071,
        logging: true
    },
    production: {
        mode: 'production',
        port: 7070,
        logging: false
    }
}

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'staging'] || config.staging;
}