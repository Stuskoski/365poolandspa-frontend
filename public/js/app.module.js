(function () {
    'use strict';
    angular.module('365App', [
        'ui.router',
        'ngTable',
        'ngDialog',
        'ui.bootstrap'
    ])
        .controller('ApplicationController', ApplicationController)
        .config(configRoutes);



    ApplicationController.$inject = ['$location'];
    function ApplicationController($locationProvider) {
        var app = this;


        //http://365poolandspa.com/
        app.pageURL = "http://365poolandspa.com/";

    }

    configRoutes.$inject = ['$urlRouterProvider'];
    function configRoutes($urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');
    }
})();
