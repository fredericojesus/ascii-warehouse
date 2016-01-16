(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppHeaderController', AppHeaderController);

    function AppHeaderController($scope) {
        $scope.randomCat = '/ad/?r=' + Math.floor(Math.random()*1000);
    }

})();