(function() {
    'use strict';
    
    angular
        .module('time-ago', [])
        .filter('timeAgo', timeAgo);
        
    function timeAgo() {
            
        return function(inputDate) {
            
            var currentDate = new Date();
            var productDate = new Date(inputDate);
            
            var difMiliseconds = currentDate.getTime() - productDate.getTime();
            var difDays = difMiliseconds / (1000*60*60*24);
            
            if (difDays > 7) {
                //return normal date
                return productDate.toLocaleDateString();
            } else if (difDays < 7 && difDays > 1) {
                //return days ago
                return difDays > 1.5 ? Math.round(difDays) + ' days ago' : 1 + ' day ago';
            } else {
                var difHours = difMiliseconds / (1000*60*60);
                if (difHours > 1) {
                    //return hours ago
                    return difHours > 1.5 ? Math.round(difHours) + ' hours ago' : 1 + ' hour ago';
                } else {
                    var difMinutes = difMiliseconds / (1000*60);
                    if (difMinutes > 1) {
                        //return minutes ago
                        return difMinutes > 1.5 ? Math.round(difMinutes) + ' minutes ago' : 1 + ' minute ago';
                    } else {
                        var difSeconds = difMiliseconds / (1000);
                        //return seconds ago
                        return difSeconds > 1.5 ? Math.round(difSeconds) + ' seconds ago' : 1 + ' second ago';
                    }
                }
            }
        }
    }
        
})();