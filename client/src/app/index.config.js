(function (window) {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, SpotifyProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Necessary if you use the client-side login flow
    // SpotifyProvider.setClientId('id');
    // SpotifyProvider.setRedirectUri('http://localhost:5000/callback');
    // SpotifyProvider.setScope('user-read-private user-read-email');

    var hashParams = getHashParams();
    if (hashParams.access_token) {
      // If you already have an auth token
      SpotifyProvider.setAuthToken(hashParams.access_token);
    }
  }

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = window.decodeURIComponent(e[2]);
    }
    return hashParams;
  }

})(window);
