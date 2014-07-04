app.controller('NavigationController', function ($scope, $location,authService) {
    $scope.isCollapsed = true;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
    });
    
    $scope.signIn=function(){
    	$scope.signInButtonColor="blueHighLight";
    	$scope.signUpButtonColor="lightBlue";
    	}
    	$scope.signUp=function(){
    	$scope.signInButtonColor="lightBlue";
    	$scope.signUpButtonColor="blueHighLight";
    	}
    	$scope.forgetPassword=function(){
        	$scope.signInButtonColor="lightBlue";
        	$scope.signUpButtonColor="lightBlue";
       }
       
        $scope.authentication = authService.authentication;
        
         $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    }
});