(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('appContentController', appContentController);
        
    appContentController.$inject = ['$scope', 'warehouse', '$http'];
    function appContentController($scope, warehouse, $http) {
        // $http({method: 'GET',
        //     url: '/api/products?limit=10',
        //     transformResponse: function(data) {
        //         angular.toJson(data, true);
        //         return data;
        //     }
        // }).then(function(data) {
        //     console.log(data); 
        // });
        warehouse.query().$promise.then(function(data) {
            console.log(data);
        });
        
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