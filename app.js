var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsMinifier = require('./application/core/jsMinifier');
var partials = require('express-partials');
var session = require('express-session');
var mongoose = require('mongoose');
var orm = require("orm");

var app = express();

var fs = require('fs'),
    path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'application/views/tpl/'));
app.set('view engine', 'ejs');

app.locals = require('./config/locals');


var connectionConf = require('./config/connection')('mysql');
var confDb = connectionConf.db;
if (connectionConf.debug) {
    confDb = confDb + "?debug=true";
}
var connectionStr = "mysql://" + connectionConf.user + ":" + connectionConf.pass + "@" + connectionConf.host + "/" + confDb;
var modelLoader = require('./config/models');
app.use(orm.express(connectionStr, {
    define: modelLoader
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('less-middleware')('/less', {
    dest    : '/css',
    pathRoot: path.join(__dirname, 'public')
}));
app.use(jsMinifier);
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

app.use(session({
    genid: function(req) {
        return require('crypto').randomBytes(48).toString('hex');
    },
    name: 'cosid',
    proxy: true,
    secret: app.locals.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: false
    }
}))

app.use(require('./config/middleware'));
app.use(require('./config/routes'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});


module.exports = app;
