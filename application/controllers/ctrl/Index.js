var BaseController = require("../adapter/Base");
var crypto = require("crypto");
var orm = require("orm");
module.exports = BaseController.extend(
    {
        name        : "Index",
        renderAction: function (req, res, next) {
            this.setTemplate('index/index');
            this.addTemplateVar('title', req.app.locals.pageTitle);
            this.renderView();
        },
        loginAction : function (req, res, next) {
            this.renderAction(req, res, next);
        }
    }
);