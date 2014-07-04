app.directive('ngUnique', ['uniqueService',function (uniqueService) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
         //scope.showImage=false;
    	
      scope.$watch('[' + attrs.ngModel + ', ' + attrs.ngUnique + ']', function(value){
       
         ctrl.$setValidity('ngUnique', true);
      // alert(scope.form.email.$valid);
         if (scope.form.email.$valid|| scope.form.name.$valid ) {
             
              
              //scope.showImageForEmail=true;
                    
                    // alert("ddd");
               // if (!ctrl || !element.val()) return;
                 
                uniqueService.checkUniqueValue(attrs.ngUnique, value)
                    .then(function (unique) {
                        //Ensure value that being checked hasn't changed
                        //since the Ajax call was made
                         //scope.showImage=false;
                            ctrl.$setValidity('ngUnique', unique);
                        
                    }, function () {
                        //scope.showImage=false;
                        //Probably want a more robust way to handle an error
                        //For this demo we'll set unique to true though
                        ctrl.$setValidity('ngUnique',true);
                        
                    });
                }
       
       
      }, true);

    }
  }
}]);
