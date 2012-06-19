function SceneScene4(options) {
	this.options = options;
	this.allRoomNodes;
	/*
		this.node = {
		nodeName:"",
		capabilities: []
	};
	*/
	this.node = "urn:wisebed:ctitestbed:0x1cde";
	this.nodeList =[];
	this.nodes = [];
	this.room = 0;
	this.buttonIndex = [];
	this.row = 0;
	this.imgIndex = [];
	this.column = 0;
	//this.URL = "";
	//this.XHRObj = new XMLHttpRequest();
	//this.capabilities = [];
	//this.time=0;
	//this.value=0;
	this.direction=0;

}

SceneScene4.prototype.initialize = function () {
	alert("SceneScene4.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	var widgetAPI = new Common.API.Widget();
	widgetAPI.sendReadyEvent();

	
	//Open json file
	var fileSystemObj = new FileSystem();
	var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/myRooms.json', 'r');
	var strResult = fileObj.readAll(); //read json file contents	
	this.allRoomNodes = jQuery.parseJSON(strResult);
	
	$('#svecKeyHelp_PUZT').sfKeyHelp({
		'user': 'Key Help',
		'enter': 'Enter',
		'leftright':'Navigate',
		'updown': 'Control Lights',
		'return':'Return'
	});
	/*
	$('#lightON').sfImage({
		src:'images/lightbulb1.png'
	}).sfImage('show');
	*/
	$('lightLabel').sfLabel({text:'label'});
	$('#ButtonON').sfButton({text:'Turn ON'});
	$('#ButtonOFF').sfButton({text:'Turn OFF'});
	this.buttonIndex = new Array('#ButtonON','#ButtonOFF');
}




SceneScene4.prototype.handleShow = function (roomNum) {
	alert("SceneScene4.handleShow()");
	// this function will be called when the scene manager show this scene
	
	$('#img1').sfImage({src:'images/light.png'}).sfImage('show');
	$('#img2').sfImage({src:'images/humidity.png'}).sfImage('show');
	$('#img3').sfImage({src:'images/pressure1.jpg'}).sfImage('show');
	$('#img4').sfImage({src:'images/ch4.jpeg'}).sfImage('show');
	$('#img5').sfImage({src:'images/temperature.jpg'}).sfImage('show');
	$('#img6').sfImage({src:'images/pressure0.jpg'}).sfImage('show');
	
	$('#ButtonON').sfButton('focus'); 
	$('#ButtonOFF').sfButton('blur'); 
	
	this.imgIndex = new Array('#img1','#img2','#img3','#img4','#img5','#img6');
	
	this.handleRoomCapabilities(roomNum);
	

}

SceneScene4.prototype.handleHide = function () {
	alert("SceneScene4.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene4.prototype.handleFocus = function () {
	alert("SceneScene4.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene4.prototype.handleBlur = function () {
	alert("SceneScene4.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene4.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene4.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			this.direction = 0;
			if(this.column===0){
				$('#img6').css('border', '5px outset #25383C'); 
				this.column = 5;
			    $('#img1').css('border', 'hidden');
			}
			else{
				$(this.imgIndex[this.column]).css('border', 'hidden'); 
				this.column=this.column-1; 
				$(this.imgIndex[this.column]).css('border', '5px outset #25383C');
			}
			break;
		case sf.key.RIGHT:
			this.direction = 0;
			if(this.column===5){
				$('#img1').css('border', '5px outset #25383C'); 
				this.column = 0;
			    $('#img6').css('border', 'hidden');
			}
			else{
				$(this.imgIndex[this.column]).css('border', 'hidden'); 
				this.column=this.column+1; 
				$(this.imgIndex[this.column]).css('border', '5px outset #25383C'); 
			}
			break;
		case sf.key.UP:
			this.direction = 1;
			if(this.row===0){
				$(this.buttonIndex[this.row]).sfButton('blur'); 
				this.row=1; 
				$(this.buttonIndex[this.row]).sfButton('focus');
			}
			else if(this.row===1){
				$(this.buttonIndex[this.row]).sfButton('blur'); 
				this.row=0; 
				$(this.buttonIndex[this.row]).sfButton('focus');
			}
			break;
		case sf.key.DOWN:
			this.direction = 1;
			if(this.row===0){
				$(this.buttonIndex[this.row]).sfButton('blur'); 
				this.row=1; 
				$(this.buttonIndex[this.row]).sfButton('focus');
			}
			else if(this.row===1){
				$(this.buttonIndex[this.row]).sfButton('blur'); 
				this.row=0; 
				$(this.buttonIndex[this.row]).sfButton('focus');
			}
			break;
		case sf.key.ENTER:
			if(this.direction===1){
				if(this.row===0){
					this.setLights();
				}
				else if(this.row===1){
					this.unSetLights();
				}
			}
			else{
				this.call(this.column);	
			}
			break;
		case sf.key.RETURN:
			alert("return");
			sf.scene.hide('Scene4');
			sf.scene.show('Scene1');
			sf.scene.focus('Scene1');
			break;
		case sf.key.RED:
			alert("red");
			break;
	}
}
SceneScene4.prototype.call = function (num){
	switch(num){
		case 0:
			var attr={
				'node':"urn:wisebed:ctitestbed:0x1cde",
				'capability':"light"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);
		break;
		case 1:
			var attr={
				'node':"urn:wisebed:ctitestbed:0x1ed4",
				'capability':"humidity"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);	
		break;
		case 2:
			var attr={
				'node':"urn:wisebed:ctitestbed:0x99c",
				'capability':"pir"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);		
		break;
		case 3:
			var attr={
				'node':"urn:wisebed:ctitestbed:0x99c",
				'capability':"ch4"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);
		break;
		case 4:
			var attr={
				'node':"urn:wisebed:ctitestbed:0x1cde",
				'capability':"temperature"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);
		break;
		case 5:
			var attr={
				'node':"urn:wisebed:ctitestbed:0xcad",
				'capability':"pressure"
			};
			sf.scene.hide('Scene4');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);
		break;
	}
}
SceneScene4.prototype.handleRoomCapabilities = function (roomNum){
	alert("SceneScene4.handleRoomCapabilities");
	switch (roomNum) {
		case 1:
			this.room = "0.I.1";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			//this.getRoomCapabilities();
			this.getData("urn:wisebed:ctitestbed:0x1cde","urn:wisebed:node:capability:temperature","temperatureLabel"," C temperature");
			this.getData("urn:wisebed:ctitestbed:0x1cde","urn:wisebed:node:capability:light","lightLabel"," lx luminosity");
			this.getData("urn:wisebed:ctitestbed:0x99c","urn:wisebed:node:capability:pir","presenceLabel"," in the room");
			this.getData("urn:wisebed:ctitestbed:0x1ed4","urn:wisebed:node:capability:humidity","humidityLabel","% relative humidity");
			this.getData("urn:wisebed:ctitestbed:0x99c","urn:wisebed:node:capability:ch4","chLabel"," methane");
			this.getData("urn:wisebed:ctitestbed:0x494","urn:wisebed:node:capability:light1","lightText","");
			this.getData("urn:wisebed:ctitestbed:0xcad","urn:wisebed:node:capability:pressure","pressureLabel"," sitting on chair");
			break;
		case 2:
			this.room = "0.I.2";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		case 3:
			this.room = "0.I.3";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		case 9:
			this.room = "0.I.9";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		case 10:
			this.room = "0.I.10";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		case 11:
			this.room = "0.I.11";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		case 12:
			this.room = "0.I.12";
			alert("You are in Room"+this.room);
			this.nodes = this.allRoomNodes[this.room];
			alert(this.nodes);
			break;
		default:
		break;
	} 
}
SceneScene4.prototype.getData = function(node, capability, element, additionalString){
	alert("SceneScene4.getData()");
	var URL = "http://uberdust.cti.gr/rest/testbed/1/node/"+node+"/capability/"+capability+"/latestreading";
	var XHRObj = new XMLHttpRequest();
	var that = this;
	
	if (XHRObj) {
		XHRObj.open("GET", URL, true);
		XHRObj.send();
		
		XHRObj.onreadystatechange = function () {
			if (XHRObj.readyState == 4) {
				alert(XHRObj.responseText);
				var time = parseFloat(XHRObj.responseText.split("\t")[0]);
				var value = parseFloat(XHRObj.responseText.split("\t")[1]);
				var date = new Date(time);
				if(capability==="urn:wisebed:node:capability:pir"||capability==="urn:wisebed:node:capability:pressure"){
					if(value===1){additionalString = "someone "+additionalString;}
					else{additionalString = "noone "+additionalString;}
					document.getElementById(element).innerHTML="<p>("+date.toLocaleTimeString()+") "+additionalString+"</p>";
				}
				else if(capability==="urn:wisebed:node:capability:light1"){
					/*
					if(value===1){additionalString = additionalString+"ON";}
					else{additionalString = additionalString+"OFF";}
					document.getElementById(element).innerHTML=additionalString;
					*/
					that.controlLightState(value);
					alert(value);
				}
				else{
					document.getElementById(element).innerHTML="<p>("+date.toLocaleTimeString()+") "+value+additionalString+"</p>";
				}
				document.getElementById('date').innerHTML = date.toLocaleDateString();
			}
		};
	}
}
SceneScene4.prototype.controlLightState = function(state){
	var stateText;
	
	if(state===1){
		stateText = "Lights are ON";
		$('#lightON').sfImage({src:'images/lightbulb1.png'}).sfImage('show');
	}
	else{
		stateText = "Lights are OFF";
		$('#lightON').sfImage({src:'images/lightbulb0.png'}).sfImage('show');
	}
	document.getElementById("lightText").innerHTML=stateText;
}

SceneScene4.prototype.setLights = function (){
	//this function is called to set the lights on in the room
	alert("SceneScene4.setLights()");
	var URL = "http://uberdust.cti.gr/rest/sendCommand/destination/urn:wisebed:ctitestbed:0x494/payload/1,1,1";
	var that = this;
	var XHRObj = new XMLHttpRequest();
	
	if (XHRObj) {
		XHRObj.onreadystatechange = function () {
			if (XHRObj.readyState == 4) {	
				alert(XHRObj.responseText);	
				//TO SWSTO that.getData("urn:wisebed:ctitestbed:0x494","urn:wisebed:node:capability:light1","lightText","");
				//GIA TWRA
				that.controlLightState(1);
			}
		};
		XHRObj.open("GET", URL, true);
		XHRObj.send();
	}
}

SceneScene4.prototype.unSetLights = function (){
	//this function is called to set the lights off in the room
	alert("SceneScene4.unSetLights()");
	var URL = "http://uberdust.cti.gr/rest/sendCommand/destination/urn:wisebed:ctitestbed:0x494/payload/1,1,0";
	var that = this;
	var XHRObj = new XMLHttpRequest();
	if (XHRObj) {
		
		XHRObj.onreadystatechange = function () {
			if (XHRObj.readyState == 4) {	
				alert(XHRObj.responseText);	
				//GIA TWRA
				that.controlLightState(0);
			}
		};
		XHRObj.open("GET", URL, true);
		XHRObj.send();
	}
	
}
SceneScene4.prototype.getNodeCapabilities = function(node){
// 	this function sets the "capabilities" variable with list of capabilities of node of "at" variable after a request to uberdust
	alert("SceneScene4.getNodeCapabilities()");
	this.URL = "http://uberdust.cti.gr/rest/testbed/1/node/"+node+"/capabilities";
	var that = this;
	
	//var temp;
	// function that takes care of returned data
	/*
	function processData(data) {
		var capabilities = data.split("\n");
		return capabilities;
    }
	*/
	
	//make a request to Uberdust and get node capabilities
	if (this.XHRObj) {
		this.XHRObj.open("GET", this.URL, true);
		this.XHRObj.send();
			
	    this.XHRObj.onreadystatechange = function () {
			if (that.XHRObj.readyState == 4) {
				
				that.processData(that.XHRObj.responseText);
			}
		};	
	}
	
	
}
SceneScene4.prototype.processData = function(data){
	//alert(data);
	this.node.capabilities = data.split("\n");
	alert(this.node.capabilities);
}
SceneScene4.prototype.getRoomCapabilities = function(){
	alert("SceneScene4.getRoomCapabilities()");
	for (var i=0; i<this.nodes.length; i++) {
		//var node = this.nodes[i];
		alert(this.nodes[i]);
		
		this.node.nodeName = this.nodes[i];
		this.nodeList[i] = Object.create(this.node);
		this.nodeList[i].nodeName = this.node.nodeName;
		this.getNodeCapabilities(this.nodes[i]);
		//this.nodeList[i].capabilities = this.node.capabilities.concat();
		//var c = 
		//alert(c);
		for (var j=0; j<this.node.capabilities.length; j++) {
			this.nodeList[i].capabilities[j] = this.node.capabilities[j];
		};
		//this.nodeList[i].capabilities = this.node.capabilities.slice();
		//alert(this.nodeList[i].cababilities);
	};
	
}