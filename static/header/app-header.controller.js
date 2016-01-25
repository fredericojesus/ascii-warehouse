(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('AppHeaderController', AppHeaderController);

    AppHeaderController.$inject = ['$scope', '$interval'];
    function AppHeaderController($scope, $interval) {
        
        var randomNumber = Math.floor(Math.random()*1000);
        $scope.randomAd = '/ad/?r=' + randomNumber;
        
        //changes the header ad from 7 to 7 seconds
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
            
        }, 7000);
    }

})();