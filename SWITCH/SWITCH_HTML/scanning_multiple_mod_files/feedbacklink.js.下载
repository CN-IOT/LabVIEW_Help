//Calls to other javascripts go here

//Check the LV Version. Other products will need to update this call to reference their own javascript file that contains the product version, or hardcode the version in the BuildFeedbackURL function of this script. The benefit of having a central javascript is that you only have to change it in one place.
document.write("<scr"+"ipt src=\"variables.js\"></"+"script>");


//***************************************
// Need to think about how we send version info. 
// In addition, it might be worth it to just track CHM version, maybe with partnum.
// Or, should we hit a URL like somehandler.php?product=someDNAForNI-DAQ&version=7.0.0
//****************************************

//if version is something wonky, then the string is blank so we don't garble the URL
if(typeof(version)!="string") {
   var version="";
}

//determines if the help file is localized; we rely on the STD_ENG variable to tell us this. You can put this variable in the HTML file, or like this template, you can store all localizable variables in a separate javascript.
function NotLocalized() {
   if(typeof(L_helpType) == "string") {
      L_helpType = L_helpType.toUpperCase();
      var index = L_helpType.indexOf("_");
      var type = L_helpType.substring(0, index);
      var lang = L_helpType.substring(index+1);
      if (lang=="ENG") {
         return true;
      }
   }
   return false;
}

//determines if the file comes from a chm or an html file (mac and linux operate off of html files). We use this function in the ParsePath function below.
function FBL_isCHM(EntireURL) {
   return (EntireURL.indexOf("::/") >= 0);
}

//parses the entire path name down into the chm and filename or html file name (html filename for linux and mac). LabVIEW has uncompiled help in mac and linux, and since the directory structure is different, we have to determine the CHM/project name and HTML file differently. Kyle Schwamkrug wrote this function, so he knows much more about it than I do. What I can tell you is that we're taking the entire location of the file on the computer, like "C:\Program Files\..." and parsing it down to what we want.
function ParsePath()
{
   var EntireURL=location.pathname;
   var temp = new Array();
   //Why call toLowerCase()? Because the extension of the CHM could be .CHM/.Chm/etc.
   var DotCHMPos=EntireURL.toLowerCase().lastIndexOf(".chm");
   var helpPath;
   
   if(DotCHMPos>=0) {
      var CHMFileName;
      //IE6 escapes '\' as "%5C". So, unescaping first. We call escape again later anyway.
      var BeforeDotCHM = unescape(EntireURL.substr(0,DotCHMPos));
	  var DotCHMAndAfter = EntireURL.substr(DotCHMPos);
      
	  if(FBL_isCHM(EntireURL)) {
         CHMFileName = BeforeDotCHM.substr(BeforeDotCHM.lastIndexOf("\\")+1);
      }
      else {
         CHMFileName = BeforeDotCHM.substr(BeforeDotCHM.lastIndexOf("/")+1);
      }
      
      helpPath = CHMFileName+DotCHMAndAfter;      
   }
   else {
      helpPath=EntireURL;
   }
   return helpPath;
    
}
	
//This function encodes special characters for the transfer on the web, because some characters have specific meanings in a URL. This function is called in the BuildFeedbackURL function below.
function URLencode(string) {
   //Need a homegrown simple replace() function because regular expressions don't work in IE 5 (LV does not support IE 5, so we didn't worry about this).
   //Both IE and Firefox escape() take care of " and ', so we probably don't need them done explicitly
   return escape(string).
             replace(/\+/g, '%2B').
                replace(/\"/g,'%22').
                   replace(/\'/g, '%27').
				   	replace(/\\/g, '%5C').
                     replace(/\//g,'%2F');
}	
	
//Builds the feedback link and escapes it using the URLencode funtion.
//handlerURL is what the ni info code will need to be.
function BuildFeedbackURL() {	
   var FileName=ParsePath();
   var handlerURL = "http://digital.ni.com/applications/psc.nsf/docdetails?OpenForm&node=seminar_US"
   //ProductDNA is defined in variables.js 
   //version is defined in variables.js
   var VersionDNA=version;
   
   var link_string = handlerURL + "&" + ProductDNA + "&" + "version="+URLencode(VersionDNA) + "&" + "file="+URLencode(FileName);
   return link_string;
}


//opens a new window so that the feedback web page does not open in the CHM/uncompiled topic. We also set a few default characteristics of the window. This function is called in the link that is put on the page, itself. Look at the Print_Link function. See the javascript:WWW?  that is where this function executes. It is on the HTML page itself.
function WWW(url) 
	{
	var urlWindow;
	urlWindow=window.open(url, "New", "directories=yes,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes");
	}

//Prints the link on the page; if the link is in a localized help file and/or the boolean is false, the link does not print.
function Print_Link(Print_Link){
   var WWW_Doc_Feedback = BuildFeedbackURL();
   var techSupport = "http://www.ni.com/support";
   if (NotLocalized()){
     var Link_Text = '<hr><p class="body"><img src="feedback.png" alt="Submit Feedback"/>&nbsp;&nbsp;<a href="javascript:WWW(\''+WWW_Doc_Feedback+'\')">'+"Submit feedback"+'</a>'+" on this topic."+'<br><br><img src="support.png" alt="Contact Technical Support"/>&nbsp;&nbsp;'+"Visit "+'<a href="javascript:WWW(\''+techSupport+'\')">'+"ni.com/support"+'</a>'+" for technical support."+'</p>'
     document.writeln(Link_Text);
   }
}