(function() {
'use strict';

angular.module('vrowser', [
        //'ui.bootstrap',
        'ngRoute',
        'ngSanitize',
        'ngCookies',
        'vrowser.data',
        'vrowser.filters',
        'vrowser.main.controller',
        'vrowser.term.controller',
        'vrowser.flat.controller'
    ])

    .value('version', '0.0.1')

    .constant('cfg', vrowserConfig)

    .run(startApp)

    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
     }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/_flat', {
                templateUrl: 'views/flat.html',
                controller: 'FlatCtrl'})

            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'})

            .when('/:term', {
                templateUrl: 'views/term.html',
                controller: 'TermCtrl'})

            .when('/search/:search*', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'})

            .otherwise({redirectTo: '/'});
    }])

    .factory('Works', ['$rootScope', function($rootScope) {
        var works  = new ItemList();
        var errors = new ItemList();

        $rootScope.works  = works;
        $rootScope.errors = errors;

        return {
            works:  works,
            errors: errors
        };

        function ItemList() {
            var nextId = 0;
            var byId = {};
            return {
                add: function(w) {
                    var id = ++nextId;
                    byId[id] = w;
                    return id;
                },
                has:  function(id) {
                    return byId[id] !== undefined;
                },
                remove:  function(id) {
                    var w = byId[id];
                    delete byId[id];
                    return w;
                },
                update:  function(id, w) {
                    byId[id] = w;
                },
                removeAll: function() {
                    byId = {};
                },
                any:  function() {
                    if (_.size(byId) > 0) {
                        for (var id in byId) {
                            if (byId.hasOwnProperty(id)) {
                                return byId[id];
                            }
                        }
                    }
                    return undefined;
                }
            }
        }
    }])

    // http://stackoverflow.com/a/18295416/830737
    .directive('focusOn', function() {
        return function(scope, elem, attr) {
            scope.$on('focusOn', function(e, name) {
                if(name === attr.focusOn) {
                    elem[0].focus();
                }
            });
        };
    })
    .factory('focus', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        return function(name) {
            $timeout(function (){
                $rootScope.$broadcast('focusOn', name);
            });
        }
    }])

;

startApp.$inject = ['$cookies', '$rootScope', '$location', '$window', 'cfg', 'Works'];

function startApp($cookies, $rootScope, $location, $window, cfg, Works) {
    //console.log("startApp");
    $rootScope.cfg = cfg;

    $rootScope.$on('$routeChangeStart', function(event) {
        // crear errors:
        Works.errors.removeAll();
    });

    if ($cookies.mmisw_vrowser_noga) {
        console.log("not enabling ga per cookie");
        return;
    }
    if (/localhost:/.test($window.location.host)) {
        console.log("not enabling ga on localhost");
        return;
    }
    $rootScope.$on('$routeChangeSuccess', function(event) {
        if ($window.ga) {
            $window.ga('send', 'pageview', { page: $location.path() });
        }
    });
}
})();
