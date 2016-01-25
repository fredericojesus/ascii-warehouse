(function() {
    'use strict';
    
    angular
        .module('app.products')
        .factory('products', products);
        
    products.$inject = ['$q'];
    function products($q) {
        
        return {
            get: getProducts
        };
        
        function getProducts(callbackDone, limit, skip, sort) {
            var defer = $q.defer();
            var count = 0;
            
            var url = '/api/products?limit=' + limit + '&skip=' + skip + '&sort=' + sort;
            oboe(url)
                .start(start)
                .fail(fail)
                .done(done);
            
            function start(status, headers) {
                //started streaming
            }
            
            function fail(error) {
                defer.reject(error);
            }
            
            function done(parsedJSON) {
                if (typeof callbackDone === 'function') {
                    callbackDone(parsedJSON);
                    count++;
                }
                
                //if we reached the last product resolve promise and clear oboe memory
                if (count === limit) {
                    defer.resolve();
                    return oboe.drop;
                }
            }
            
            return defer.promise;
        }
    }
    
})();
