(function($) {

    var ua = navigator.userAgent,
        androidversion,
        startY,
        lastY;
    
    if( ua.indexOf("Android") >= 0 ) {
      androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
      if (androidversion <= 2.3) {
          document.addEventListener("touchstart", function(e) {
             startY = e.touches[0].clientY;
          });
          document.addEventListener("touchmove", function(e) {
              lastY = e.touches[0].clientY;
              m.app.view().ui.el.scrollTop -= (lastY - startY);
          });
      }
    }
    
}(window.$));
