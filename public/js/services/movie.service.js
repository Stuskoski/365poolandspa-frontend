(function(){
    'use strict';

    angular.module('365App')
        .service('MovieService', MovieService);

    MovieService.$inject = ['$http', '$log', '$q'];
    function MovieService($http, $log, $q){
        var baseUrl = 'http://www.omdbapi.com/?t=Frozen&r=json';
        var movie = '', chooseMyOwnMovieUrl = 'http://www.omdbapi.com/?t=' + movie + '&r=json';

        return  {
            getMovie: getMovie
        };

        /**
         * Returns the movie in the url.
         * @returns {*}
         */
        function getMovie(){
            return $http.get(baseUrl)
                .catch(failedRequest);
        }

        /** TODO
         * Create a Service method that allows
         * you to pass the name of a movie in.
         */

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