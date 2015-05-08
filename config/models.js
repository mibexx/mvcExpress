var fs = require('fs'),
    path = require('path');

module.exports = function (db, models, next) {
    var fts = require("orm-mysql-fts");

    db.use(fts);

    var modelPath = path.join(__dirname, '..', 'application', 'models', 'Db');
    var modelFiles = fs.readdirSync(modelPath);
    modelFiles.forEach(function (fname) {
        if (/^.*\.js$/.test(fname)) {
            modelName = fname.replace('.js', '');
            models[modelName] = require('../application/models/Db/' + modelName)(db);
            console.log('Model "' + modelName + '" is loaded..');
        }
    });

    next();
}