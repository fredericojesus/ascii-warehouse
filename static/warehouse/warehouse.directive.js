(function() {
    'use strict';

    angular
        .module('app.warehouse')
        .directive('warehouse', warehouse);

    function warehouse() {
        return {
            restrict: 'E',
            templateUrl: 'warehouse/warehouse.html',
            controller: 'WarehouseController'
        };
    }

})();