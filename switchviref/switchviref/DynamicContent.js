/********************************************************************
* Check for chms
********************************************************************/
<!--
document.write("<scr"+"ipt src=\"CheckInstalled.js\"></"+"script>");
// -->


/*********************************************************************
* getElementsByClass(classes, node)
* Returns an array containing all elements within the specified node 
* that are of the specified class. If you do not specify a node, This 
* function returns all elements in the document that are of the specified class.
*
* Params:
* Name		Type	Description
* classes	String	The class to search for. Currently, you can specify only one class.
* node		Object	The node in which to search for elements of the specified class.
*			If you do not set this parameter, the function returns searches the
*			entire document.
*
* Example:
* var indentedPgphs = new Array;
* indentedPgphs = getElementsByClass("indent1");
* 
**********************************************************************/
   
function getElementsByClass(classes, node) {
   var elementArray = new Array;
   
   if(!node) {
      node = window.document;
   }
   
   return _getElementsByClassSub(classes, node, elementArray);
}

function _getElementsByClassSub(classes, node, elementArray) {
   var index=0;
      
   if(searchArray(getClasses(node), classes)) {
      elementArray=elementArray.concat(node);
   }
   
   for (index=0; index<node.childNodes.length; index++) {
      elementArray=_getElementsByClassSub(classes, node.childNodes[index], elementArray);
   }
   
   return elementArray;
}

/*********************************************************************
* getClasses(node)
* Returns an array of classes listed in the class attribute of the specified node.
* Returns an empty array if the node does not have a class attribute or if the attribute is empty.
*
* Params:
* Name	Type	Description
* node 	Object	The node in which to search for classes.
*
* Example:
* var classArray = new Array;
* classArray = getClasses(document.p[0]);
*********************************************************************/
function getClasses(node) {
   var classArray=new Array;
   var classString=new String;
   var index;
   if(node.attributes) {
      if(typeof(node.attributes.getNamedItem) != "undefined" && node.attributes.getNamedItem("class")) {
         classString = node.attributes.getNamedItem("class").nodeValue;
         classArray = classString.split(" ");
         classArray = deleteEmptyStringElements(classArray);
      }
      else if (node.attributes["class"] && node.attributes["class"].nodeValue) {
         classString = node.attributes["class"].nodeValue;
         classArray = classString.split(" ");
         classArray = deleteEmptyStringElements(classArray);  
      }
   }
   return classArray;
}

function deleteEmptyStringElements(array) {
   var newArray=new Array;
   var index;
   for(index=0; index<array.length; index++) {
      if(array[index]!='') {
         newArray=newArray.concat(array[index]);
      }
   }
   return newArray;
}



function searchArray(searchArray, searchElement) {
   var index;
   if(searchArray.length) {
      for(index=0;index<searchArray.length; index++) {
         if (searchArray[index]==searchElement) return true;
      }
   }
   return false;
}

/*************************************************************
*
*     checkParagraphs.js
*
*************************************************************/

  
if(!availableFiles) {
   var availableFiles = new Array;
}

function checkParagraphs() {
   var index=0;
   var elementsToTest = new Array;
   elementsToTest= getElementsByClass("checkFile");
   for(index=0;index<elementsToTest.length;index++) {
      var classes= new Array;
      classes=getClasses(elementsToTest[index]);
      if(classes[1]) {
         var helpFile = classes[1];
         if (!searchArray(availableFiles, helpFile)) {
            elementsToTest[index].style.display = "none";
         }
      }
      else {
         elementsToTest[index].style.display = "none";
      }
   }
}

/*************************************************************
*
*     initpage.js
*
*************************************************************/
function initPageNoAdjust()
{
   	checkParagraphs();
}

function initPageAdjust()
{
      	adjustScroll();
		   	checkParagraphs();
}

if (typeof(registerForInitPage) == "function")
{
   registerForInitPage(checkParagraphs);
}
