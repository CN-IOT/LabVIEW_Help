var initPageFunctions = new Array;

function initPageDyn() {
   for (i=0;i<initPageFunctions.length;i++) {
      initPageFunctions[i]();
   }
}

function registerForInitPage(functionToRegister) {
   if (typeof(functionToRegister) == "function") {
      initPageFunctions[initPageFunctions.length]=functionToRegister;
   }
   else if (window.initPageDebugAlerts) {
      window.alert("Cannot register variable that does not point to a function.");
   }
}

function resetURL() {
/*else {
         currentURL = new String(window.location);
	 if (top.location.href.indexOf("lvdaqmx.chm/_main.html") == -1) {
	   var chmIndex = currentURL.lastIndexOf(".chm/");
	   var chmDir = currentURL.substr(0, chmIndex);
	   chmDir = chmDir.substr(chmDir.lastIndexOf("/")+1);
	   if (chmDir == "lvdaqmx") {
	      chmDir = "";
	   }
	   else {
	      chmDir = "../"+chmDir+".chm/";
	   }
	   var helpPath = currentURL.substr(chmIndex);
	   helpPath = helpPath.substr(helpPath.indexOf("/")+1);
	   while(helpPath.indexOf("/") != -1) {
	      beforeSlash = helpPath.substr(0, helpPath.indexOf("/"));
	      afterSlash = helpPath.substr(helpPath.indexOf("/")+1);
	      helpPath = beforeSlash+"%2F"+afterSlash;
	   }
	   newURL = "../lvdaqmx.chm/_main.html?" + escape(chmDir + helpPath);
	   top.location.replace(newURL);
         }
      }*/
}