(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppHeaderController', AppHeaderController);

    function AppHeaderController($scope, $interval) {
        
        var randomNumber = Math.floor(Math.random()*1000);
        $scope.randomAd = '/ad/?r=' + randomNumber;
        
        $interval(function() {
            
            var newRandomNumber;
            while(true) {
                newRandomNumber = Math.floor(Math.random()*1000);
                if (newRandomNumber === randomNumber) {
                    continue;   
                }
                break;
            }
            
            randomNumber = newRandomNumber;
            $scope.randomAd = '/ad/?r=' + randomNumber;
            
        }, 20000);
    }

})();