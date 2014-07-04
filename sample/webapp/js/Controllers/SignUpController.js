app.controller('SignUpController', ['$scope', '$location', 'authService', '$cookies', function($scope, $location, authService, $cookies) {

       

    //$scope.isLoading = false;

   // $scope.message = "";
  //  $scope.errorDescription = "";

    $scope.signUp = function() {
        alert($scope.userName);
        /*$scope.isLoading = true;
        authService.saveRegistration().then(function(response) {
            $scope.isLoading = false;
            $location.path('/orders');

        }, function(err) {
            $scope.isLoading = false;
            $scope.errorDescription = "Invalid";
            $scope.info = true;
            $scope.muted = true;
            //$scope.errorDescription = err.errorMessage;
            });*/
    };

 
}]);