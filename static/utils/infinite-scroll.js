(function() {
    'use strict';
    
    angular
        .module('infinite-scroll', [])
        .directive('infiniteScroll', infiniteScroll);
        
    infiniteScroll.$inject = ['$window'];
    function infiniteScroll($window) {
        return {
            scope: {
                infiniteScroll: '&'
            },
            link: function(scope, elem, attrs) {
                
                var el = elem[0];

                var checkBounds = function(event) {
                    var rectObject = el.getBoundingClientRect();                
                    if (rectObject.bottom <= window.innerHeight) {
                        scope.$apply(scope.infiniteScroll);
                    }
                };
                
                angular.element($window).bind('scroll load', checkBounds);
            }
        }
    }
        
})();