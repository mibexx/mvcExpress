var fs   = require('fs'),
    path = require('path');

module.exports = function (paths) {
    var concat = '';

    for (var index in paths) {
        var onePath = paths[index];
        var files = fs.readdirSync(onePath);
        files.forEach(
            function (fname) {
                if (/^.*\.js$/.test(fname)) {
                    // console.log('Concat JS File: ' + fname);
                    concat += fs.readFileSync(path.join(onePath, fname), 'utf8').toString();
                }
            }
        );
    }
    return concat;
}