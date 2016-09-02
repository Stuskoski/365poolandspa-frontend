(function () {
    'use strict';
    angular.module('365App')
        .controller('HomeController', HomeController)
        .config(configRoutes);


    HomeController.$inject = ['$scope', 'MovieService', '$log'];
    function HomeController($scope, MovieService, $log) {


    }

    configRoutes.$inject = ['$stateProvider'];
    function configRoutes($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home/home.html',
                controller: 'HomeController as home'
            });
    }
})();
