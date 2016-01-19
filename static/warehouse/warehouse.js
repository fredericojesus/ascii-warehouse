(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('warehouse', warehouse);
        
    warehouse.$inject = ['$resource'];
    function warehouse($resource) {
        var WarehouseResource = $resource('/api/products', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    data = ('[' + data + ']').replace(/}/g, '},').replace(',\n]', ']');
                    return angular.fromJson(data);
                }
            }
        });
        
        WarehouseResource.prototype.getSize = function() {
            return this.size;
        };
        
        WarehouseResource.prototype.getPrice = function() {
            return this.price;
        };
        
        WarehouseResource.prototype.getDate = function() {
            return this.date;
        };
        
        return WarehouseResource;
    }
    
})();