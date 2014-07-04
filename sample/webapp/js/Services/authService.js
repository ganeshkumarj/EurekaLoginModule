'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService) {

    var serviceBase = 'http://localhost:49066/DonorFundraisingSystem/service/auth/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var RegisteredMessage = "";

    var _saveRegistration = function(registration) {

        _logOut();_login
        var deferred = $q.defer();

        $http.post(serviceBase + 'signup', registration, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(response) {
             if (response.code!=200) {
               //_logOut();
               deferred.reject(response);
           } else {
               localStorageService.set('authorizationData', { token: response.object.userAccessToken, userName: loginData.userName });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
               deferred.resolve(response);
           }
       }).error(function(err, status) {
             //localStorageService.set('authorizationData', { token: response.userAccessToken, userName: loginData.userName });
            
             _logOut();
           deferred.reject(err);
        });

        return deferred.promise;

    };

    var _login = function(loginData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'signin', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(response) {

             localStorageService.set('authorizationData', { token: response.userAccessToken, userName: loginData.userName });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            if (response.errorData) {
                _logOut();
                deferred.reject(response);
            } else {
                deferred.resolve(response);
            }
            alert("SUCCESS");

        }).error(function(err, status) {
            alert("error");
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function() {

        // localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.authentication = _authentication;
     authServiceFactory.saveRegistration = _saveRegistration;

    return authServiceFactory;
}]);