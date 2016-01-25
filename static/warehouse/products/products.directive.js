(function() {
    'use strict';

    angular
        .module('app.products')
        .directive('products', products);

    function products() {
        return {
            restrict: 'E',
            templateUrl: 'warehouse/products/product.html'          
        };
    }

})();