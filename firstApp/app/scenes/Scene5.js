function SceneScene5(options) {
	this.options = options;
	this.imgIndex = [];
	this.row = 0;
	this.node = "urn:wisebed:ctitestbed:weatherStation";
	this.capability;

}

SceneScene5.prototype.initialize = function () {
	alert("SceneScene5.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#outTemperature').sfImage({
		src:'images/temperature.jpg'
	}).sfImage('show');
	$('#windSpeed').sfImage({
		src:'images/anemometer.jpg'
	}).sfImage('show');
	$('#svecKeyHelp_1VKG').sfKeyHelp({
		'user': 'Key Help',
		'enter': 'Enter History',
		'updown':'Navigate',
		'return':'Return'
	});
	
	this.imgIndex = new Array('#outTemperature','#windSpeed');
	this.row = 0;
	this.capability = "temperature";
}


SceneScene5.prototype.handleShow = function () {
	alert("SceneScene5.handleShow()");
	// this function will be called when the scene manager show this scene 
	this.getData("urn:wisebed:node:capability:windspeed","windSpeedLabel","");
	this.getData("urn:wisebed:node:capability:temperature","outTemperatureLabel"," C");
}

SceneScene5.prototype.handleHide = function () {
	alert("SceneScene5.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene5.prototype.handleFocus = function () {
	alert("SceneScene5.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene5.prototype.handleBlur = function () {
	alert("SceneScene5.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene5.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene5.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			if(this.row===0){
				$(this.imgIndex[this.row]).css('border', 'hidden'); 
				this.row=1; 
				$(this.imgIndex[this.row]).css('border', '5px outset #25383C');
				this.capability = "windspeed";
			}
			else{
				$(this.imgIndex[this.row]).css('border', 'hidden'); 
				this.row=this.row-1; 
				$(this.imgIndex[this.row]).css('border', '5px outset #25383C');
				this.capability = "temperature";
			}
			break;
		case sf.key.DOWN:
			if(this.row===1){
				$(this.imgIndex[this.row]).css('border', 'hidden'); 
				this.row=0; 
				$(this.imgIndex[this.row]).css('border', '5px outset #25383C');
				this.capability = "temperature";
			}
			else{
				$(this.imgIndex[this.row]).css('border', 'hidden'); 
				this.row=this.row+1; 
				$(this.imgIndex[this.row]).css('border', '5px outset #25383C');
				this.capability = "windspeed";
			}
			break;
		case sf.key.ENTER:
			if(this.row===0){
				var attr={
					'node':this.node,
					'capability':this.capability
				};
			}
			else{
				var attr={
					'node':this.node,
					'capability':this.capability
			    };
			}
			sf.scene.hide('Scene5');
			sf.scene.show('Scene2',attr);
			sf.scene.focus('Scene2',attr);	
			break;
		case sf.key.RETURN:
			sf.scene.hide('Scene5');
			sf.scene.show('Scene1');
			sf.scene.focus('Scene1');
			break;
	}
}
SceneScene5.prototype.getData = function(capability, element, additionalString){
//This function is called from SceneScene5.handleShow() to get from Uberdust 
//the data from a specific capability of weather station and put it in the right html element
	alert("SceneScene5.getData()");
	var URL = "http://uberdust.cti.gr/rest/testbed/1/node/urn:wisebed:ctitestbed:weatherStation/capability/"+capability+"/latestreading";
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
				
				document.getElementById(element).innerHTML="<p>("+date.toLocaleTimeString()+") <p>"+value+additionalString+"</p></p>";
				document.getElementById('mydate').innerHTML = date.toLocaleDateString();
			}
		};
	}
}