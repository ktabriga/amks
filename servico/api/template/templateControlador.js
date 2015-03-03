'use strict';

var router = require('express').Router(),
  path = require('path');

module.exports = function () {

  router.get('/templates/:template', function (req, res) {
    var template = req.params.template;

    res.render(template);
  });

  router.get('/templates/:dir/:template', function (req, res) {
    var template = req.params.template,
      dir = req.params.dir;

    res.render( path.join(dir, template));
  });

  router.get('/', function (req, res) {
    res.render('index');
  });

  return router;
};