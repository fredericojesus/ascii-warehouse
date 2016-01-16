(function() {
    
    angular
        .module('app')
        .factory('warehouse', warehouse);
        
    warehouse.$inject = ['$resource'];
    function warehouse($resource) {
        var WareHouseResource = $resource('/api/products?limit=10', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    data = ('[' + data + ']').replace(/}/g, '},').replace(',]', ']');
                    return angular.fromJson(data);
                }
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