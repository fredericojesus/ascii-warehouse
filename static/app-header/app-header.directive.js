(function() {
    'use strict';

    angular
        .module('app')
        .directive('appHeader', appHeader);

    function appHeader() {
        return {
            restrict: 'EA',
            templateUrl: 'app-header/app-header.html',
            controller: 'AppHeaderController'
        };
    }

})();