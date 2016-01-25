(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('WarehouseController', WarehouseController);
        
    WarehouseController.$inject = ['$scope', 'products'];
    function WarehouseController($scope, products) {
        var limit = 9;
        var skip = 0;
        var count = 0;
        var randomAdNumber = 0;
        $scope.finished = false;
        $scope.sort = 'id';
        $scope.isGettingProducts = false;
        
        //Arrays of products
        $scope.products = [];
        $scope.productsBuffer = [];
        
        //Functions
        $scope.loadProductsFromBuffer = loadProductsFromBuffer;
        $scope.sortProducts = sortProducts;
                  
        //Start fetching products          
        loadProducts($scope.products);                          
        
        /**
         * Function called by infinite scroll in order to load more products from buffer,
         * when the buffer is empty, load more products into buffer
         * @return
         */
        function loadProductsFromBuffer() {
            //prevents scroll spamming
            if ($scope.isGettingProducts) {
                return;
            }                      
            
            unloadBuffer();
            
            if (!$scope.finished) {
                //loads more products into buffer
                loadProducts($scope.productsBuffer);
            }
        }
        
        /**
         * Function that resets products arrays, 
         * skip and count and starts fetching products with the desirable sort
         * @param {string} sort
         * @return
         */
        function sortProducts(sort) {
            if (sort === $scope.sort) {
                return;
            }
            
            $scope.sort = sort;
            skip = count = 0;
            $scope.products = $scope.productsBuffer = [];
            $scope.finished = false;
            
            loadProducts($scope.products);
        }             
        
        /**
         * Fetch products using Oboe.js to parse data as JSON objects into an array
         * @param {array} productsArray - products will be inserted in this array
         * @return
         */
        function loadProducts(productsArray) {
            $scope.isGettingProducts = true;

            products.get(done, limit, skip, $scope.sort)
                .then(success)
                .catch(error);
                
            //oboe.js: this function is called everytime a product is streamed    
            function done(product) {
                //in order to simulate the end of the catalogue, once we get a repeated product we unload the buffer and stop fetching more products
                checkFinish(product);
                
                count++;
                //if already fetched 20 products insert an ad
                if(count%20 == 0) {
                    var ad = {};
                    randomAdNumber = getNewRandomAdNumber(randomAdNumber);
                    ad.adUrl = '/ad/?r=' + randomAdNumber;               
                    productsArray.push(ad);
                    count++;                                        
                }
                productsArray.push(product);
            }
                
            //stream finished    
            function success(products) {
                skip += limit;
                
                //if it's the first time getting products, load buffer
                if (skip === limit) {
                    loadProducts($scope.productsBuffer);
                } else {
                    $scope.isGettingProducts = false;
                }
            }
        
            function error(err) {
                console.log(err || 'Couldnt retrieve data from server');
            }
        }
        
        function unloadBuffer() {
            var productsBufferLength = $scope.productsBuffer.length;
            for (var i = 0; i < productsBufferLength; i++) {
                $scope.products.push($scope.productsBuffer[0]);
                $scope.productsBuffer.shift();
            }
        }
        
        /**
         * If product exists unload buffer and stop fetching more products
         * @param {object} product
         * @return
         */
        function checkFinish(product) {
            if ($scope.finished) {
                return;
            }
            if (productExists(product)) {
                $scope.finished = true;
                unloadBuffer();
            }
        }
        
        /**
         * Checks if a product already exists
         * @param {object} product
         * @return {boolean} true if product exists
         */
        function productExists(product) {
            var index = $scope.products.map(function(p) {
                if (p.face) return p.face;   
            }).indexOf(product.face);
            
            return index > -1;
        }
    }
    
    /**
     * Returns a number different than the one that is received in order to not show the same ad twice in a row
     * @param {number} randomAdNumber
     * @return {number} new random number
     */
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