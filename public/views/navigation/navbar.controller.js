(function () {
    'use strict';
    angular.module('365App')
        .controller('NavController', NavController)
        .config(configRoutes);


    /**
     * The parent navbar controller.
     *
     * Handles the sidebar navigation
     * link clicks to redirect the route
     * to the appropriate controller.
     *
     * @type {string[]}
     */
    NavController.$inject = ['$location', 'LoginService'];
    function NavController($location, LoginService) {
        var nav = this;
        //nav.userAuthenticated = LoginService.isUserAuthenticated();
        //nav.userRole = LoginService.getUserRole();


        //if(!nav.userAuthenticated){
        //    $location.path('/');
        //}


        nav.pullStatsPage = function(){
            $location.path('stats');
        };

        nav.pullLoggingPage = function(){
            $location.path('logging');
        };

        nav.pullModifyDatabasePage = function(){
            $location.path('modifyDB');
        };

        nav.pullViewCustomersPage = function(){
            $location.path('viewCustomers');
        };

        nav.pullUploadTextFilePage = function(){
            $location.path('customer-file');
        };

        nav.pullUploadWebFormPage = function(){
            $location.path('customer-form');
        };

        nav.pullEmailPage = function(){
            $location.path('email');
        };

        nav.pullSettingsPage = function(){
            $location.path('settings');
        };

        nav.logout = function(){
            $location.path('/');
            //LoginService.setUserDeauthenticated();
        };


        /**
         * Removes all the highlighted links
         * and uses the ng-clicks to select
         * the correct one with right ID.
         *
         * The choice is highlighted so the user
         * can see where they are.
         *
         * Only the parents are highlights, the children
         * remain unhighlighted when clicked.
         *
         * @param id
         */
        nav.setLinkActive = function(id){
            var wrappedStats = angular.element(document.querySelector( '#side-nav-bar-stats' ));
            var wrappedDatabase = angular.element(document.querySelector( '#side-nav-bar-database' ));
            var wrappedDatabaseUser = angular.element(document.querySelector( '#side-nav-bar-database-user' ));
            var wrappedUploadCustomers = angular.element(document.querySelector( '#side-nav-bar-upload-customers' ));
            var wrappedLogging = angular.element(document.querySelector( '#side-nav-bar-logging' ));
            var wrappedSettings = angular.element(document.querySelector( '#side-nav-bar-settings' ));
            var wrappedEmail = angular.element(document.querySelector( '#side-nav-bar-email' ));



            wrappedStats.removeClass("custom-active-nav-link");
            wrappedDatabase.removeClass("custom-active-nav-link");
            wrappedDatabaseUser.removeClass("custom-active-nav-link");
            wrappedUploadCustomers.removeClass("custom-active-nav-link");
            wrappedLogging.removeClass("custom-active-nav-link");
            wrappedSettings.removeClass("custom-active-nav-link");
            wrappedEmail.removeClass("custom-active-nav-link");

            var wrappedHighlightClass = angular.element(document.querySelector( '#'+id ));

            wrappedHighlightClass.addClass("custom-active-nav-link");

        };

    }



    configRoutes.$inject = ['$stateProvider'];
    function configRoutes($stateProvider) {
        $stateProvider
            .state('nav', {
                abstract: true,
                templateUrl: 'views/navigation/navbar.html',
                controller: 'NavController as nav'
            });
    }
})();
