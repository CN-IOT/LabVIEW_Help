function initPage()
{
   if( typeof (fcBrowserName) != "undefined" ) {
      if( fcBrowserName == cBrowserIE ) {
   	adjustScroll();
      }
   }
}