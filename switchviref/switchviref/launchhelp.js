////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implement the following three functions however you see fit. 
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Kyle's original JavaScript includes handleMissingHelpAsstOnPageLoad(), which is called when the page loads if Helpasst.dll // is not present. We do not require this functionality because the help still appears and the error message is more alarming // than helpful.
// 
// function handleMissingHelpAsstOnPageLoad() {
// alert ("Helpasst.dll not found. Reinstall NI-DAQmx.");
// }
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*function handleMissingHelpAsstOnPageLoad() {
   alert ("Helpasst.dll not found. Reinstall NI-DAQmx.");
}*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// handleMissingHelpAsstOnLinkActivate() is called when someone clicks a link if helpasst.dll is not present. Modify this 
// function if you want to handle the error one way when the page loads and handle it a different way when someone clicks a link.
//
// For example, you could use the alert() function when the page loads, but do a redirect when someone clicks a link.
//
// Do not modify this function if you want the same error handling both when the page loads and when someone clicks a link.  
// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleMissingHelpAsstOnLinkActivate() {
   alert ("This link requires a file that is not installed. Reinstall LabWindows/CVI.");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// handleMissingHelpFile() is called when helpasst DLL can't find the CHM you tried to link to. Again, you 
// could just use alert() to make a pop-up, or you could redirect people to a different page.
// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleMissingHelpFile(CHMName) {
   alert ("Failed to launch " + CHMName + ". Reinstall LabWindows/CVI.");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Do not modify any of the following
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*****************************************************************************************************************************
LaunchHelp(CHMPath, isTopLevel)
Launches the specified CHM file and topic in a separate window. This function first looks in the current directory for the CHM.
If it does not find the specified CHM there, this function checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help
for the location. 

CHMPath - String containing a CHM/topic combination, separated by "::/". This is the same format that the window.showHelp() method 
and plain "<a href" links use. Do not include any sort of linking protocols, such as "mk:@MSITStore:", or absolute paths. The effects of doing 
so are undefined.

Note: I do not know what happens with the topic name if it includes a directory path (/tasks/generated/thermocouples.html) or 
an anchor (sensors.html#thermocouples)

isTopLevel - OPTIONAL. Specifies to make the new window always stay on top of the old CHM window. This parameter defaults to false 
if you do not pass anything else in.

Example:
Use a <a href="javascript:LaunchHelp('daqhelp.chm::/thermocouples.html')">thermocouple</a> to measure temperature.
Use a <a href="javascript:LaunchHelp('daqhelp.chm::/thermocouples.html, true)">thermocouple</a> to measure temperature. --Window stays on top.

******************************************************************************************************************************

LaunchHelp(CHMName, helpTopic, isTopLevel)
Launches the specified CHM file and topic in a separate window. This function first looks in the current directory for the CHM.
If it does not find the specified CHM there, this function checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help
for the location. 

CHMName - The filename of the CHM. Do not include any sort of linking protocols, such as "mk:@MSITStore:", or absolute paths. 
The effects of doing so are undefined.
Note: Passing the CHM name and help topic in separately allows you to pass variables in, which can be useful if localized versions of files have 
different filenames. Localization can just translate the variable.

helpTopic - The topic filename. 

Note: I do not know what happens with the topic name if it includes a directory path (/tasks/generated/thermocouples.html) or 
an anchor (sensors.html#thermocouples)

isTopLevel - OPTIONAL. Specifies to make the new window always stay on top of the old CHM window. This parameter defaults to false 
if you do not pass anything else in.

Examples:
Use a <a href="javascript:LaunchHelp('daqhelp.chm', 'thermocouples.html')">thermocouple</a> to measure temperature.
Use a <a href="javascript:LaunchHelp('daqhelp.chm', 'thermocouples.html', true)">thermocouple</a> to measure temperature. --Window stays on top.

Examples using a variable for CHMName - Keeps the <a> tag from changing:
English:
helpfiles_eng.js:
var daqhelp = "daqhelp.chm";

Help Topic:
Use a <a href="javascript:LaunchHelp(daqhelp, 'thermocouples.html')">thermocouple</a> to measure temperature.

German:
helpfiles_deu.js:
var daqhelp = "daqhelp_deu.chm";

Help Topic: 
Ein <a href="javascript:LaunchHelp(daqhelp, 'thermocouples.html')">thermocouple</a> fur temperatur gemeasuren.

*****************************************************************************************************************************/

function LaunchHelp() {
   var isTopLevel = false;
   var len = arguments.length;
   var inputfiles = [];
   var chmDelimiter = "::/"; // normally not here
   var launcher;			// normally not here
   var launcherSuccess = false; // normally not here

   if (typeof(arguments[len-1]) == "boolean")
   {
      isTopLevel = arguments[len-1];
   }

   if (typeof(arguments[1]) != "string") {
      inputfiles = arguments[0].split(chmDelimiter);
      if(inputfiles.length>1) {
         for (var i=2; i<inputfiles.length; i++) {
            inputfiles[1]=inputfiles[1]+"::\/"+inputfiles[i];
         }
      }
      
   }
   else {
      inputfiles[0] = arguments[0];
      inputfiles[1] = arguments[1];
   }
    
  /* Kyle's file calls the following function before LaunchHelp
var chmDelimiter = "::/";
var launcher;
var launcherSuccess = false; */

/*try { // Can I put this stuff in the launchhelp function?
   launcher = new ActiveXObject('NI.HelpAssistant');
   launcherSuccess = true;
}
catch(e) {
   handleMissingHelpAsstOnLinkActivate();
}
*/
   
   try {
   launcher = new ActiveXObject('NI.HelpAssistant');
   launcherSuccess = true;   
   }
   catch(e) {
   handleMissingHelpAsstOnLinkActivate();
   }
       
   if (launcherSuccess) {
      if (!launcher.ShowHelp(inputfiles[0], inputfiles[1], isTopLevel))
         handleMissingHelpFile(inputfiles[0]);
   }
   else {
      handleMissingHelpAsstOnLinkActivate();
   }
}
/*****************************************************************************************************************************
LaunchMergedHelp(masterCHM, mergedCHMPath)
Launches the specified CHM file and topic specified with mergedCHMPath that is merged in to the CHM specified with masterCHM. The master
CHM MUST include _redirect.html.

This function first looks in the current directory for the master CHM. If it does not find the specified master CHM there, this function 
checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help for the location. 

For the merged CHM, it first checks the same directory where the master CHM was found. If it does not find the specified merged 
CHM there, this function checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help for the location.


masterCHM - The CHM that merges in the CHM specified in mergedCHMPath. This CHM MUST include _redirect.html.

mergedCHMPath - String containing a CHM/topic combination, separated by "::/". This is the same format that the window.showHelp() method 
and plain "<a href" links use. Do not include any sort of linking protocols, such as "mk:@MSITStore:", or absolute paths. The effects of doing 
so are undefined.

Note: I do not know what happens with the topic name if it includes a directory path (/tasks/generated/thermocouples.html) or 
an anchor (sensors.html#thermocouples)

Example:
Use a <a href="javascript:LaunchMergedHelp('daqhelp.chm','measfunds.chm::/thermocouples.html')">thermocouple</a> to measure temperature.

******************************************************************************************************************************
LaunchMergedHelp(masterCHM, mergedCHM, topic)
Launches the specified CHM file and topic specified with mergedCHMPath that is merged in to the CHM specified with masterCHM. The master
CHM MUST include _redirect.html.

This function first looks in the current directory for the master CHM. If it does not find the specified master CHM there, this function 
checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help for the location. 

For the merged CHM, it first checks the same directory where the master CHM was found. If it does not find the specified merged 
CHM there, this function checks the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\HTML Help for the location.

masterCHM - The CHM that merges in the CHM specified in mergedCHM. This CHM MUST include _redirect.html.

mergedCHM - The filename of the CHM. Do not include any sort of linking protocols, such as "mk:@MSITStore:", or absolute paths. 
The effects of doing so are undefined.
Note: Passing the CHM name and help topic in separately allows you to pass variables in, which can be useful if localized versions of files have 
different filenames. Localization can just translate the variable.

topic - The topic filename. 

Note: I do not know what happens with the topic name if it includes a directory path (/tasks/generated/thermocouples.html) or 
an anchor (sensors.html#thermocouples)


Examples:
Use a <a href="javascript:LaunchMergedHelp('daqhelp.chm', 'measfunds.chm', 'thermocouples.html')">thermocouple</a> to measure temperature.

Examples using variables for masterCHM and mergedCHM - Keeps the <a> tag from changing:
English:
helpfiles_eng.js:
var daqhelp = "daqhelp.chm";
var measfunds = "measfunds.chm";

Help Topic:
Use a <a href="javascript:LaunchMergedHelp(daqhelp, measfunds, 'thermocouples.html')">thermocouple</a> to measure temperature.

German:
helpfiles_deu.js:
var daqhelp = "daqhelp_deu.chm";
var measfunds = "measfunds_deu.chm";

Help Topic: 
Ein <a href="javascript:LaunchMergedHelp(daqhelp, measfunds, 'thermocouples.html')">thermocouple</a> fur temperatur gemeasuren.

*****************************************************************************************************************************/

function LaunchMergedHelp(masterCHM, mergedCHM, topic) {
   if (typeof(topic)=="string") {
      LaunchHelp(masterCHM+"::/_redirect.html#"+mergedCHM+"::/"+topic);
   }
   else {
      LaunchHelp(masterCHM+"::/_redirect.html#"+mergedCHM);
   }
}

function LaunchDevConsid(topic) {
   var URL = "devconsid.chm::/" + topic;
   window.location = URL;
}