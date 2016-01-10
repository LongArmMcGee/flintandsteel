/* global angular */
// This directive is used to bring focus to an input element when is becomes visible

// angular.module('flintAndSteel')
// .directive('autoFocus', function($timeout) {
//     return {
//         restrict: 'AC',
//         link: function(_scope, _element) {
//             $timeout(function(){
//                 _element[0].focus();
//                 console.log("test");
//             }, 0);
//         }
//     };
// });

angular.module('flintAndSteel')
.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        scope: {
            updatesSelected: "=updatesSelected"
        },
        link: function(_scope, _element) {
            _scope.$watch('_scope.updatesSelected',function(){
                console.log("test watch");
                if(_scope.updatesSelected || (typeof _scope.updatesSelected === 'undefined'){
                    _element[0].focus();
                    console.log("test if block");
                }
            }, 250)
        }
    };
});