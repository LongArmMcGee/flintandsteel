/* global angular */
// This directive is used to bring focus to an input element when is becomes visible

angular.module('flintAndSteel')
.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
                console.log("test");
            }, 0);
        }
    };
});