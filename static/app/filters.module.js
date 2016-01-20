(function() {
    'use strict';
    
    angular
        .module('app.filters', []).
        filter('timeago', timeago);
        
    function timeago() {
            
        return function(inputDate) {
            
            var productDate = new Date(inputDate);
            return productDate.getDate();
        }
    }
        
})();