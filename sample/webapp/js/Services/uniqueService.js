app.factory('uniqueService', ['$http', '$q', function($http, $q) {
    var serviceBase = 'http://localhost:49066/DonorFundraisingSystem/service/auth/';
    uniqueServiceFactory = {};

    uniqueServiceFactory.checkUniqueValue = function(fieldName, value) {
        var deferred = $q.defer();
        var data = {};
        data.fieldName = fieldName;
        data.fieldValue = value;

        $http.post(serviceBase + 'unique', data).success(function(response) {

            deferred.resolve(response);

        }).error(function(err, status) {

            deferred.reject(err);
        });

        return deferred.promise;
    };

    return uniqueServiceFactory;

}]);