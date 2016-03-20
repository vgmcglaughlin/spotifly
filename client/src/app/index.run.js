(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Spotify, $state) {
    $log.debug('runBlock end');

    Spotify.getCurrentUser().then(function (user) {
      $log.debug('current user', user);
    }).catch(function (err) {
      $log.debug('error getting current user', err);
      $state.go('login');
    });
  }
})();
