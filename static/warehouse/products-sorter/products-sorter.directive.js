(function() {
    'use strict';

    angular
        .module('app')
        .directive('productsSorter', productsSorter);

    productsSorter.$inject = ['$window'];
    function productsSorter($window) {
        return {
            restrict: 'E',
            templateUrl: 'warehouse/products-sorter/products-sorter.html',
            controller: 'ProductsSorterController',
            link: productsSorterLink
        };
        
        function productsSorterLink(scope, elem, attrs, ProductsSorterController) {
            angular.element($window).bind('scroll', function() {
                var windowTop = $window.scrollY - 450;
                var sorterContainerTop = elem[0].getBoundingClientRect().top;
                
                if (windowTop > sorterContainerTop) {
                    ProductsSorterController.setFixSorter(true);
                } else {
                    ProductsSorterController.setFixSorter(false);
                }
            });
        }
    }

})();