var config = require('../index')();
module.exports = {
    logging   : config.logging,
    logEntries: [],
    writeLog  : function (msg) {
        this.logEntries.push(msg);
        if (this.logging) {
            console.log(msg);
        }
    },
    getLogs   : function () {
        return this.logEntries;
    }
}