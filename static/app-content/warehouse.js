(function() {
    
    angular
        .module('app')
        .factory('warehouse', warehouse);
        
    warehouse.$inject = ['$resource', '$http'];
    function warehouse($resource, $http) {
        var WareHouseResource = $resource('/api/products', {
            query: {
                method: 'GET',
                isArray: false,
                transformResponse: $http.defaults.transformResponse.concat(function(data, header) {
                    angular.forEach(data.items, function(item, idx) {
                        data.items[idx] = new WareHouseResource(item);
                    });
                    return data;
                })
            }
        });
        
        WareHouseResource.prototype.getSize = function() {
            return this.size;
        };
        
        WareHouseResource.prototype.getPrice = function() {
            return this.price;
        };
        
        WareHouseResource.prototype.getDate = function() {
            return this.date;
        };
        
        return WareHouseResource;
    }
})();