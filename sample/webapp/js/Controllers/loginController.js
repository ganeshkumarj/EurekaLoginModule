app.controller('loginController', ['$scope', '$location', 'authService', '$cookies', function($scope, $location, authService, $cookies) {

    $scope.remember = false;
    $scope.signInButtonColor = "blueHighLight";
    var signUpData = {
       userEmail :"",
       userName: "",
       userPassword:"",
       confirmPassword:""
    };
    
    
    $scope.loginData = {
        userName: "",
        password: ""
    };

    var userNameCookieValue = $cookies.userNameValue;
    var passwordCookieValue = $cookies.passwordValue;
    //alert("123"+userNameCookieValue);
    if ((userNameCookieValue != null && userNameCookieValue != "") && (passwordCookieValue != null && passwordCookieValue != "")) {
        $scope.loginData.userName = userNameCookieValue;
        $scope.loginData.password = passwordCookieValue;

        $scope.remember = true;
    }
    $scope.isLoading = false;

    $scope.message = "";
    $scope.errorDescription = "";

    $scope.login = function() {
        $scope.isLoading = true;
        $scope.info = false;
        $scope.muted = false;
        if ($scope.remember === true) {
            $cookies.userNameValue = $scope.loginData.userName;
            $cookies.passwordValue = $scope.loginData.password;
        } else {
            $cookies.userNameValue = "";
            $cookies.passwordValue = "";
        }

        authService.login($scope.loginData).then(function(response) {
            $scope.isLoading = false;
            $location.path('/');

        }, function(err) {
            $scope.isLoading = false;
            $scope.errorDescription = "Invalid";
            $scope.info = true;
            $scope.muted = true;
            //$scope.errorDescription = err.errorMessage;
            });
    };
    
    
    $scope.signUp = function() {
         $scope.isLoading = true;
        signUpData.userName=$scope.userName;
        signUpData.userEmail=$scope.userEmail;
        signUpData.userPassword=$scope.userPassword;
        signUpData.confirmPassword=$scope.confirmPassword;
        
        authService.saveRegistration(signUpData).then(function(response) {
            $scope.isLoading = false;
            $location.path('/');

        }, function(err) {
            $scope.isLoading = false;
             //$scope.errorDescription = err.errorMessage;
            });
        
    }

}]);