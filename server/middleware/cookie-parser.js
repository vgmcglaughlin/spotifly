'use strict';

var cookieParser = require('cookie-parser');
var _ = require('lodash');

exports.init = function(app, config, logger) {

  var cfg = _.extend({}, config.get('cookieParser'), config.get('cookie-parser'));
  logger.debug('Enabled cookie parser');
  app.use(cookieParser(cfg.secret, cfg.options));
};