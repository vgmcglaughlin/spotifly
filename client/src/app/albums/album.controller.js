(function () {
  'use strict';

  angular
    .module('app')
    .controller('AlbumController', AlbumController);

  /** @ngInject */
  function AlbumController(Spotify, $state, $stateParams, $sce) {
    var vm = this;

    if (!$stateParams.id) {
      return $state.go('main');
    }

    Spotify.getAlbumTracks($stateParams.id).then(function (results) {
      vm.tracks = results.items;
      createPlaylist();
    });

    vm.updateOrder = function () {
      vm.tracks.reverse();
      createPlaylist();
    };

    function createPlaylist() {
      var trackIds = vm.tracks.map(function (track) {
        return track.id;
      }).join(',');

      vm.playlistUri = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:Hello World:' + trackIds);
    }
  }
}());
