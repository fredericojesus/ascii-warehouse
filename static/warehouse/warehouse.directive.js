(function() {
    'use strict';

    angular
        .module('app')
        .directive('warehouse', warehouse);

    function warehouse() {
        return {
            restrict: 'EA',
            templateUrl: 'warehouse/warehouse.html',
            controller: 'warehouseController'
        };
    }

})();