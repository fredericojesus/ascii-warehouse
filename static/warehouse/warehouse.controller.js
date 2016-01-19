(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('warehouseController', warehouseController);
        
    warehouseController.$inject = ['$scope', 'warehouse', '$sce'];
    function warehouseController($scope, warehouse, $sce) {
        var limit = 9;
        var skip = 0;
        var count = 0;
        $scope.products = [];
        
        $scope.loadFaces = function() {
            warehouse.query({limit: limit, skip: skip}).$promise
                .then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var auxDate = new Date(data[i].date);
                        data[i].date = auxDate.toISOString();                                              
                        
                        count++;
                        if(count%20 == 0) {
                            var ad = {};                          
                            ad.adUrl = '/ad/?r=' + Math.floor(Math.random()*1000);
                            $scope.products.push(ad);             
                            i--;                         
                        } else {
                            $scope.products.push(data[i]);
                        }
                        
                    }                                  
                    
                    skip += 9
                }).catch(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Couldnt retrieve data from server');
                    }                  
                });    
        } 
        
        $scope.loadFaces();
        
    }
    
})();