var fs         = require('fs'),
    path       = require('path'),
    uglify     = require('uglify-js'),
    concat     = require('./jsConcat'),
    scriptsDir = [
        path.join(__dirname, '../..', 'public', 'js', 'libs'),
        path.join(__dirname, '../..', 'public', 'js', 'boostrap'),
        path.join(__dirname, '../..', 'public', 'js', 'angular'),
        path.join(__dirname, '../..', 'public', 'js', 'angular', 'model'),
        path.join(__dirname, '../..', 'public', 'js', 'angular', 'ctrl'),
        path.join(__dirname, '../..', 'public', 'js', 'custom'),
        path.join(__dirname, '../..', 'public', 'js')
    ];

var cache = concat(scriptsDir);
cache = uglify.minify(cache, {fromString: true}).code;

module.exports = function (req, res, next) {
    if (req.url === '/js/all.js') {
        res.end(cache);
    } else {
        next();
    }
};