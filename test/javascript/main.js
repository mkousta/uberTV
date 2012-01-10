var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main = 
{
XHRObj : null
}

Main.onLoad = function()
{
	alert("Main.onLoad()");
	// To enable the key event processing
	document.getElementById("anchor").focus();
	
	// Set Default key handler function
	widgetAPI.sendReadyEvent();
	
	var URL = "http://uberdust.cti.gr/rest/testbed/1/node/urn:wisebed:ctitestbed:0x14d4/capability/urn:wisebed:node:capability:temperature/html/limit/10";
	
	if (this.XHRObj != null) 
		this.XHRObj.destroy(); 
	this.XHRObj = new XMLHttpRequest();
	
	if (this.XHRObj) { 
		this.XHRObj.onreadystatechange = function () { 
			if (Main.XHRObj.readyState == 4) { 
				Main.recieveData(); } 
		}; 
			this.XHRObj.open("GET", URL, true); 
			this.XHRObj.send(null); 
	};
}

Main.recieveData = function () { 
	alert(this.XHRObj.responseText); 
}

Main.onUnload = function()
{
	alert("Main.onUnload()");
}

Main.MainKeyHandler = function()
{
	var KeyCode = event.keyCode;
	alert("Main Key code : " + KeyCode);
	
	switch(KeyCode)
	{
		case tvKey.KEY_LEFT :
			alert("left");
			document.getElementById("anchor").focus();
			break;
		case tvKey.KEY_RIGHT :
			alert("right");
			document.getElementById("anchor").focus();
			break;
		case tvKey.KEY_UP :
			alert("up");
			document.getElementById("anchor").focus();
			break;
		case tvKey.KEY_DOWN :
			alert("down");
			document.getElementById("anchor").focus();
			break;
		case tvKey.KEY_ENTER:
			alert("enter"); 
			document.getElementById("show").innerHTML = this.XHRObj.responseText;
			break;
		default :
			break;
	}
	
}
