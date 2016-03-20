(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('album', {
        url: '/albums/:id',
        templateUrl: 'app/albums/album.html',
        controller: 'AlbumController',
        controllerAs: 'vm'
      });
  }

})();
