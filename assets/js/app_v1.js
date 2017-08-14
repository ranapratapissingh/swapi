(function() {
  'use strict';
   if(window.location.protocol == "https:"){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {
                        brw='c';
                        if('serviceWorker' in navigator) {
                                        navigator.serviceWorker.register(BASE_URL+'sw3.js');
                                }
                }
                else {
                        console.log("safari");
                }
        }
        else{
                brw='m';
                if('serviceWorker' in navigator) {
                        navigator.serviceWorker.register(BASE_URL+'firefox-worker.js');
                 }
                 else{
                        console.warn('Service workers aren\'t supported in this browser.');
                 }
		}
	 }
})();

