'use strict';

//Setting up route
angular.module('mean.links').config(['$stateProvider',
    function($stateProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all links', {
                url: '/links',
                templateUrl: 'public/links/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create link', {
                url: '/links/create',
                templateUrl: 'public/links/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit link', {
                url: '/links/:linkId/edit',
                templateUrl: 'public/links/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('link by id', {
                url: '/links/:linkId',
                templateUrl: 'public/links/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
