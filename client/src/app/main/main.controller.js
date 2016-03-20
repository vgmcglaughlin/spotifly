(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Spotify) {
    var vm = this;

    vm.params = {
      type: 'album' // album, artist, playlist, or track
    };

    vm.search = function (params) {
      Spotify.search(params.query, params.type).then(function (results) {
        vm.items = results.albums.items;
      });
    };
  }
}());
