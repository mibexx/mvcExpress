var ViewConf = require('../../../config/views');
module.exports = function (response, template) {
    this.response = response;
    this.template = template;
    this.variables = {};
    this.tplPrefix = 'pages/';
};
module.exports.prototype = {
    type   : 'base',
    extend : function (properties) {
        var Child = module.exports;
        Child.prototype = module.exports.prototype;
        for (var key in properties) {
            Child.prototype[key] = properties[key];
        }
        return Child;
    },
    render : function (data) {
        if (this.response && this.template) {
            this.addVar('layout', ViewConf.layout);
            this.response.render(this.tplPrefix + this.template, this.getVars());
        }
    },
    addVar : function (key, val) {
        this.variables[key] = val;
    },
    getVars: function () {
        return this.variables;
    }
}