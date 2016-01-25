(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('appHeader', appHeader);

    function appHeader() {
        return {
            restrict: 'E',
            templateUrl: 'header/app-header.html',
            controller: 'AppHeaderController'
        };
    }

})();