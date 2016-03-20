(function() {
  'use strict';

  angular
    .module('app', ['ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'spotify'
    ]);

})();

(function () {
  'use strict';

  MainController.$inject = ["Spotify"];
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

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider"];
  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html'
      });
  }

})();

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider"];
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

(function () {
  'use strict';

  AlbumController.$inject = ["Spotify", "$state", "$stateParams", "$sce"];
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

(function() {
  'use strict';

  runBlock.$inject = ["$log", "Spotify", "$state"];
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

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

(function (window) {
  'use strict';

  config.$inject = ["$logProvider", "SpotifyProvider", "$sceDelegateProvider"];
  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, SpotifyProvider, $sceDelegateProvider) {
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

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/albums/album.html","<div class=\"row\"><div class=\"small-12 columns\"><label>Reverse order <input type=\"checkbox\" ng-model=\"vm.reverseOrder\" ng-change=\"vm.updateOrder()\"></label></div></div><div class=\"row align-middle\" ng-repeat=\"track in vm.tracks | orderBy:track_number\"><div class=\"small-12 columns\"><span ng-bind=\"track.track_number\"></span> <span ng-bind=\"track.name\"></span></div></div><iframe ng-attr-src=\"{{ vm.playlistUri }}\" frameborder=\"0\" allowtransparency=\"true\"></iframe>");
$templateCache.put("app/login/login.html","<div class=\"row\"><div class=\"small-12 columns\"><a href=\"/login\" class=\"primary button\">Log in with Spotify</a></div></div>");
$templateCache.put("app/main/main.html","<div class=\"row\"><div class=\"small-12 columns\"><form novalidate=\"\" name=\"vm.searchForm\" ng-submit=\"vm.search(vm.params)\"><label>Album Name <input type=\"text\" ng-model=\"vm.params.query\" ng-change=\"vm.search(vm.params)\" ng-model-options=\"{debounce: 300}\"></label></form></div><div><div class=\"row align-middle\" ng-repeat=\"item in vm.items\" ui-sref=\"album({id: item.id})\"><div class=\"small-3 medium-2 large-1 columns\"><img ng-src=\"{{ item.images[0].url }}\"></div><div class=\"small-9 medium-10 large-11 columns\"><span ng-bind=\"item.name\"></span></div></div></div></div>");}]);
//# sourceMappingURL=../maps/scripts/app-3d8d2c3519.js.map
