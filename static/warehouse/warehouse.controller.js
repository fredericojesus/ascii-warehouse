(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('warehouseController', WarehouseController);
        
    WarehouseController.$inject = ['$scope', 'warehouse', '$sce', '$window'];
    function WarehouseController($scope, warehouse, $sce, $window) {
        var limit = 9;
        var skip = 0;
        var sort = '';
        var count = 0;
        var randomAdNumber = 0;
        $scope.products = [];
        $scope.productsCache = [];
        $scope.isGettingProducts = false;
        $scope.selectedButton = 'id';
        // $scope.fixSorter = false;
        $scope.getProductsFromCache = getProductsFromCache;
        $scope.sortProducts = sortProducts;
                  
        getProducts($scope.products, true);                          
        
        function sortProducts(s) {
            if (s === sort)
                return;        
            
            sort = $scope.selectedButton = s;
            skip = count = 0;               
            $scope.products = $scope.productsCache = [];
            
            getProducts($scope.products, true);
        } 
        
        function getProductsFromCache() {
            if ($scope.isGettingProducts) {              
                return;      
            }                      
            
            var productsCacheLength = $scope.productsCache.length;
            for (var i = 0; i < productsCacheLength; i++) {
                $scope.products.push($scope.productsCache[0]);
                $scope.productsCache.shift();             
            }
            
            getProducts($scope.productsCache);          
        }
        
        function getProducts(productsArray, fillCache) {         
            $scope.isGettingProducts = true;                    
            
            warehouse.query({limit: limit, skip: skip, sort: sort}).$promise
                .then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var auxDate = new Date(data[i].date);
                        data[i].date = auxDate.toISOString();                                              
                                  
                        count++;                                           
                        //insert an ad if already showed 20 products and decrement the iterator in order to not skip one product
                        if(count%20 == 0) {
                            var ad = {};
                            randomAdNumber = getNewRandomAdNumber(randomAdNumber);
                            ad.adUrl = '/ad/?r=' + randomAdNumber;               
                            productsArray.push(ad);                                        
                            i--;
                        } else {                          
                            data[i].count = count;
                            productsArray.push(data[i]);
                        }          
                    }         
                    
                    skip += limit;
                    
                    if (fillCache)
                        getProducts($scope.productsCache);
                    else
                        $scope.isGettingProducts = false;
                    
                }).catch(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Couldnt retrieve data from server');
                    }
                });
        }
    }
    
    //returns a number different than the one that is received in order to not show the same ad twice in a row
    function getNewRandomAdNumber(randomAdNumber) {
        var newRandomAdNumber;
        while(true) {
            newRandomAdNumber = Math.floor(Math.random()*1000);
            if (newRandomAdNumber === randomAdNumber) {
                continue;   
            }
            break;
        }
        return newRandomAdNumber;
    }
    
})();