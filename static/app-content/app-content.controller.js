(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('appContentController', appContentController);
        
    appContentController.$inject = ['$scope', 'warehouse', '$http'];
    function appContentController($scope, warehouse, $http) {
        $http.get('/api/products?limit=10').then(function (response) {
            console.log(response.status);
        });
        
        // warehouse.query().$promise.then(function(wtf) {
        //     console.log(wtf);
        // });
        
        // function httpGetAsync(theUrl, callback) {
        //     var xmlHttp = new XMLHttpRequest();
        //     xmlHttp.onreadystatechange = function() { 
        //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        //             callback(xmlHttp.responseText);
        //     }
        //     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        //     xmlHttp.send(null);
        // }
        
        // httpGetAsync('/api/products?limit=10', function(response) {
        //     console.log(response);
        // });
        
    }
    
})();