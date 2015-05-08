var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

var express = require('express');
var router = express.Router();


var controllerList = {
    all: [],
    api: []
};

var controllerPath = path.join(__dirname, '..', 'application', 'controllers', 'ctrl');
var controllerFiles = fs.readdirSync(controllerPath);
controllerFiles.forEach(function(fname) {
    if (/^.*\.js$/.test(fname)) {
        ctrlName = fname.replace('.js', '');
        controllerList.all.push({
            controller : ctrlName,
            url: '/' + ctrlName.toLowerCase(),
            object: require('../application/controllers/ctrl/' + ctrlName)
        });
    }
});

var controllerPath = path.join(__dirname, '..', 'application', 'controllers', 'api');
var controllerFiles = fs.readdirSync(controllerPath);
controllerFiles.forEach(function(fname) {
    if (/^.*\.js$/.test(fname)) {
        ctrlName = fname.replace('.js', '');
        controllerList.api.push({
            controller : ctrlName,
            url: '/api/' + ctrlName.toLowerCase(),
            object: require('../application/controllers/api/' + ctrlName)
        });
    }
});


controllerList.all.forEach(function(actCtrl) {
    console.log('Controller "' + actCtrl.controller + '" Route from ' + actCtrl.url + ' loaded..');
    var object = _.extend({}, actCtrl.object);

    router.all(actCtrl.url, function(req, res, next) {
        object.run(req, res, next);
    });

    router.all(actCtrl.url + '/:action', function(req, res, next) {
        object.run(req, res, next);
    });

    if (actCtrl.controller == 'Index') {
        router.all('/', function(req, res, next) {
            object.run(req, res, next);
        });
    }
});

controllerList.api.forEach(function(actCtrl) {
    console.log('API Controller "' + actCtrl.controller + '" Route from ' + actCtrl.url + ' loaded..');
    var object = _.extend({}, actCtrl.object);

    router.get(actCtrl.url, function(req, res, next) {
        object.apiGet(req, res, next);
    });

    router.post(actCtrl.url, function(req, res, next) {
        object.apiPost(req, res, next);
    });

    router.put(actCtrl.url, function(req, res, next) {
        object.apiPut(req, res, next);
    });

    router.delete(actCtrl.url, function(req, res, next) {
        object.apiDelete(req, res, next);
    });

    router.get(actCtrl.url + '/:action', function(req, res, next) {
        object.apiGet(req, res, next);
    });

    router.post(actCtrl.url + '/:action', function(req, res, next) {
        object.apiPost(req, res, next);
    });

    router.put(actCtrl.url + '/:action', function(req, res, next) {
        object.apiPut(req, res, next);
    });

    router.delete(actCtrl.url + '/:action', function(req, res, next) {
        object.apiDelete(req, res, next);
    });
});

module.exports = router;