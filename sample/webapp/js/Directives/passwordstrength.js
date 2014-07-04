app.directive('checkStrength', function () {
    return {
        replace: false,
        restrict: 'EACM',
        link: function (scope, iElement, iAttrs) {

            var strength = {
                colors: ['#F00', '#F90',  '#9F0', '#0F0'],
                passwordStatus:['  Weak','  Medium','  Strong','  VeryStrong'],
                mesureStrength: function (p) {

                    var _force = 0;                    
                    var _regex = /[$-/:-?{-~!"^_`\[\]]/g;
                                          
                    var _lowerLetters = /[a-z]+/.test(p);  
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);
                                          
                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
                    var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;   
                    //alert(_passedMatches);
                    
                    
                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                   // alert("first"+_force);
                    _force += _passedMatches * 10;
                        //alert("second"+_force); 
                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                     //alert("third"+_force);
                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;
                    
                     //alert("final"+_force);
                    
                    return _force;

                },
                getColor: function (s) {

                    var idx = 0;
                    if (s <= 10) { idx = 0; }
                    else if (s <= 20) { idx = 1; }
                    else if (s <= 30) { idx = 2; }
                    else if (s <= 40) { idx = 2; }
                    else { idx = 3; }

                    return { idx: idx + 1, col: this.colors[idx],message:this.passwordStatus[idx] };

                }
            };

            scope.$watch(iAttrs.checkStrength, function () {
                if (scope.userPassword === '') {
                    iElement.css({ "display": "none"  });
                } else {
                    var c = strength.getColor(strength.mesureStrength(scope.userPassword));
                    iElement.css({ "display": "inline" });
                      iElement.find('li')
                        .css({ "background": "#DDD" })
                        .slice(0, c.idx)
                        .css({ "background" : c.col });
                        }
                         iElement.find('span')
                        .css({ "color": c.col })
                        .text(c.message+"!!");
            });

        },
        template: '<ul id="strength"><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li></ul><span></span>'
    };

});