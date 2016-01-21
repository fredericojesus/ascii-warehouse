(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductsSorterController', ProductsSorterController);

    ProductsSorterController.$inject = ['$scope'];
    function ProductsSorterController($scope) {
        
        $scope.fixSorter = false;
        
        this.setFixSorter = function(fixSorter) {
            $scope.fixSorter = fixSorter;
        }   
    }

})();