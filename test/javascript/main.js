var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main = 
{
XHRObj : null
}

Main.onLoad = function()
{
	alert("Main.onLoad()");
	var sequence = {
            name :'capability1',
            data :[  [1326304285000 , 0.0],
                                 [1326304104000 , 0.0],
                                 [1326303925000 , 0.0],
                                 [1326303745000 , 0.0],
                                 [1326303565000 , 0.0],
                                 [1326303385000 , 0.0],
                                 [1326303205000 , 0.0],
                                 [1326303025000 , 0.0],
                                 [1326302844000 , 0.0],
                                 [1326302665000 , 0.0],
                                 [1326302485000 , 91.0],
                                 [1326302305000 , 92.0]
           ]
        };
        divContainer = 'container1';
        titleText = 'capability1';
        subtitleText = 'node1';
        yaxisText = 'capability1';
        //console.log("readings data loaded")
        uberdustSeries.push(sequence);
		
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
