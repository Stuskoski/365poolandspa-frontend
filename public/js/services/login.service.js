(function(){
    'use strict';

    angular.module('365App')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http', '$log', '$q'];
    function LoginService($http, $log, $q){

        var baseUrl = 'http://172.19.23.205:8080/login/getUser';
        var userAuthenticated = false;
        var userName = "";
        var userRole = "";


        userAuthenticated = localStorage.getItem("userAuthenticated");
        userName = localStorage.getItem("userName");
        userRole = localStorage.getItem("userRole");

        return  {
            getUser : getUser,
            isUserAuthenticated : isUserAuthenticated,
            setUserAuthenticated : setUserAuthenticated,
            setUserDeauthenticated : setUserDeauthenticated,
            setUserRole : setUserRole,
            getUserRole : getUserRole,
            setUserName : setUserName,
            getUserName : getUserName,
            saveCredentials : saveCredentials
        };

        /**
         * Returns the movie in the url.
         * @returns {*}
         */
        function getUser(user, headers){
            //console.log(response.headers('X-CSRF-TOKEN'));

            return $http({
                'url' : baseUrl,
                'method' : 'POST',
                'headers': headers,
                'data' : user
            }).catch(failedRequest);

            /*return $http.post(baseUrl, user)
                .catch(failedRequest);*/
        }


        /**
         *Getters and setters for user authentication
         *
         * @returns {boolean}
         */
        function isUserAuthenticated(){
            return userAuthenticated;
        }
        function setUserAuthenticated(){
            userAuthenticated = true;
        }
        function setUserDeauthenticated(){
            userAuthenticated = false;
        }


        /**
         * Getters and setters for user role
         *
         * @param role
         */
        function setUserRole(role){
            userRole = role;
        }
        function getUserRole(){
            return userRole;
        }


        /**
         * Getters and setters for user name
         *
         */

        function setUserName(name){
            userName = name;
        }
        function getUserName(){
            return userName;
        }


        /**
         * Save credentials on page refresh
         *
         */
        function saveCredentials(){
            localStorage.setItem("userAuthenticated", userAuthenticated);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userRole", userRole);
        }




        /**
         * Logs the error and passes it down to be handled elsewhere.
         * @returns {Promise}
         */
        function failedRequest(response) {
            $log.debug(response.data);
            return $q.reject(response);
        }
    }

})();