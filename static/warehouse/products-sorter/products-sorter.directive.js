(function() {
    'use strict';

    angular
        .module('app.products-sorter')
        .directive('productsSorter', productsSorter);

    productsSorter.$inject = [];
    function productsSorter() {
        return {
            restrict: 'E',
            templateUrl: 'warehouse/products-sorter/products-sorter.html'
        };
        
    }

})();