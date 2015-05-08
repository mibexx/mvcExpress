var _ = require("underscore");
var View = require('../../views/adapter/Base');
module.exports = {
    name                 : "base",
    ctrlType             : "",
    template             : '',
    response             : null,
    request              : null,
    templateVars         : [],
    onlyLogged           : false,
    apiType              : 'ctrl',
    extend               : function (child) {
        return _.extend({}, this, child);
    },
    prepareController    : function (req, res) {
        this.template = '';
        this.templateVars = [];
        this.setResponse(res);
        this.setRequest(req);
    },
    run                  : function (req, res, next) {
        this.prepareController(req, res);
        if (!this.onlyLogged || this.isAuthorized(req)) {
            this.action(req, res, next);
        } else if (this.apiType == 'ctrl') {
            this.goToLogin(req, res, next);
        } else {
            res.status(401).json({status: 'Not authorized'});
        }
    },
    apiGet               : function (req, res, next) {
        this.apiType = 'get';
        this.run(req, res, next);
    },
    apiPost              : function (req, res, next) {
        this.apiType = 'post';
        this.run(req, res, next);
    },
    apiPut               : function (req, res, next) {
        this.apiType = 'put';
        this.run(req, res, next);
    },
    apiDelete            : function (req, res, next) {
        this.apiType = 'delete';
        this.run(req, res, next);
    },
    action               : function (req, res, next) {
        var actionMethod = 'render';
        if (req.params.action) {
            actionMethod = req.params.action;
        }
        actionMethod = actionMethod + "Action";
        if (typeof this[actionMethod] === 'function') {
            this[actionMethod](req, res, next);
        }
        else {
            res.status(404).send('Not found');
        }
    },
    renderAction         : function (req, res, next) {

    },
    setTemplate          : function (template) {
        this.template = template;
    },
    setResponse          : function (res) {
        this.response = res;
    },
    setRequest           : function (res) {
        this.request = res;
    },
    getView              : function () {
        this.addTemplateVar('req', this.request);
        this.addTemplateVar('res', this.response);
        return new (
            require("../../views/adapter/Base")
        )(this.response, this.template);
    },
    addTemplateVar       : function (key, val) {
        this.templateVars[key] = val;
    },
    renderView           : function () {
        var view = this.getView();
        this.setTemplateVarsToView(view);
        view.render();
    },
    setTemplateVarsToView: function (view) {
        for (var key in this.templateVars) {
            view.addVar(key, this.templateVars[key]);
        }
    },
    isAuthorized         : function (req) {
        if (
            req.session &&
            req.session.user &&
            req.session.user.auth === true
        ) {
            return true;
        } else {
            return false;
        }
    },
    goToLogin            : function (req, res, next) {
        res.redirect(301, '/index/login');
    },
    getView              : function () {
        this.addTemplateVar('req', this.request);
        this.addTemplateVar('res', this.response);
        this.addTemplateVar('auth', this.isAuthorized(this.request));
        var view = (
            new View(this.response, this.template)
        );
        return view;
    }
}