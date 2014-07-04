var app = angular.module('demoApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap','ngCookies']);


app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
       templateUrl: "imageload.html",
       controller:'CarouselDemoCtrl'
    });
    
    $routeProvider.when("/signIn", {
       templateUrl: "signin.html",
       controller:'loginController'
    });
    
     $routeProvider.when("/signUp", {
    templateUrl: "signup.html",
     controller:'loginController'
    
      });
      
       $routeProvider.when('/forgetPassword', {
    templateUrl: 'forget.html'
      });
      
      $routeProvider.otherwise({ redirectTo: "/home" });

});


app.config(function($httpProvider){
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
});