'use strict';

var server = require('blueoak-server');

server.init(function(err) {
  if (err) {
    console.warn(err);
  } else {
    console.log('started');
  }
});

