var BaseController = require("../adapter/Base");
module.exports = BaseController.extend(
    {
        name        : "ApiExport",
        onlyLogged  : false,
        renderAction: function (req, res, next) {
            if (this.apiType == 'get') {
                this.sendError('No action defined');
            } else if (this.apiType == 'post') {
                this.sendError('No action defined');
            } else if (this.apiType == 'put') {
                this.sendError('No action defined');
            } else if (this.apiType == 'delete') {
                this.sendError('No action defined');
            }
        },
        timeAction  : function (req, res, next) {
            if (this.apiType == 'get') {
                this.sendJson(res, {time: new Date()});
            } else {
                this.sendError('Only get requests allowed');
            }
        },
        sendJson    : function (res, data, status) {
            if (!status) {
                status = 200;
            }
            res.status(status).json(data);
        },
        sendError   : function (res, msg) {
            this.sendJson(res, {error: msg}, 500);
        }
    }
);