(function() {
    'use strict';

    angular
        .module('app.products-sorter')
        .directive('productsSorter', productsSorter);

    productsSorter.$inject = ['$window'];
    function productsSorter($window) {
        return {
            restrict: 'E',
            templateUrl: 'warehouse/products-sorter/products-sorter.html'
        };
        
    }

})();