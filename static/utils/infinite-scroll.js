(function() {
    'use strict';
    
    angular
        .module('infinite-scroll', [])
        .directive('infiniteScroll', infiniteScroll);
        
    infiniteScroll.$inject = ['$window', '$document'];
    function infiniteScroll($window, $document) {
        return {
            scope: {
                infiniteScroll: '&'
            },
            link: function(scope, elem, attrs) {
                
                // angular.element($window).bind('scroll', function() {
                //     var windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
                //     var body = document.body, html = document.documentElement;
                //     var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
                //     var windowBottom = windowHeight + window.pageYOffset;
                //     if (windowBottom >= docHeight) {
                //         scope.$apply(scope.infiniteScroll);
                //         // console.log($document[0].title)
                //     }
                // });
                
                var raw = elem[0];

                var checkBounds = function(evt) {
                    var rectObject = raw.getBoundingClientRect();                
                    if (rectObject.bottom <= window.innerHeight) {
                        scope.$apply(scope.infiniteScroll);
                    }
                };
                
                angular.element($window).bind('scroll load', checkBounds);
            }
        }
    }
        
})();