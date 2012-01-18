function SceneScene1(options) {
	this.options = options;	
}

var XHRObj = new XMLHttpRequest();

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
}


SceneScene1.prototype.handleShow = function () {
	alert("SceneScene1.handleShow()");
	/*	
	var tvKey = new Common.API.TVKeyValue(); 
	var widgetAPI = new Common.API.Widget();
	widgetAPI.sendReadyEvent();
	*/	
	
	var URL = "http://uberdust.cti.gr/rest/testbed/1/node/urn:wisebed:ctitestbed:0x14d4/capability/urn:wisebed:node:capability:temperature/tabdelimited/limit/10";
	if (XHRObj) {
		XHRObj.open("GET", URL, true);
		XHRObj.send();
		XHRObj.onreadystatechange = function () {
			if (XHRObj.readyState == 4) {
				SceneScene1.recieveData();			
			}
		};
		
	}
}

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
}

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.LEFT:
			alert("left");
			//document.getElementById("anchor").focus();
			break;
		case $.sfKey.RIGHT:
			alert("right");
			//document.getElementById("anchor").focus();
			break;
		case $.sfKey.UP:
			alert("up");
			//document.getElementById("anchor").focus();
			break;
		case $.sfKey.DOWN:
			alert("down");
			//document.getElementById("anchor").focus();
			break;
		case $.sfKey.ENTER:
			alert("enter");
			//document.getElementById("anchor").focus();
			break;
	}
}

SceneScene1.recieveData = function () {

	var times  = new Array();
	var temperatures = new Array();
	
	var myResponse = XHRObj.responseText;
	alert(myResponse);
	
	var temp = myResponse;
	while(temp.indexOf("\n")!= -1 ){
	temp =  temp.replace('\t','');
	temp =  temp.replace('\n','');
    }
	alert(temp);
	
	var time;
	var temperature;
	var counter = 0;
	for(var i=0; i<10; i++){
		time =  temp.substr(counter, 13);
		//alert(time);
		times[i] = parseFloat(time);
		counter = counter+13;
		temperature = temp.substr(counter, 4);
		//alert(temperature);
		temperatures[i] = parseFloat(temperature);	
		counter = counter+4;
	}
		
	var chart;
	var divContainer = document.getElementById('container1');
	var titleText = "Room temperature over Time";
	var subtitleText = 'sensor readings from uberdust';
	var xaxisText = 'time';
	var yaxisText = 'temperature (C)';
	var uberdustSeries = [{ name: 'temperature', data: [[times[0],temperatures[0]],
													[times[1],temperatures[1]],
													[times[2],temperatures[2]],
													[times[3],temperatures[3]],
													[times[4],temperatures[4]],
													[times[5],temperatures[5]],
													[times[6],temperatures[6]],
													[times[7],temperatures[7]],
													[times[8],temperatures[8]],
													[times[9],temperatures[9]]]
						 }];
	alert("Making Chart");
	chart = new Highcharts.Chart({
		chart: {
			renderTo: divContainer,
			borderWidth:0
		},
		title: {
			text: titleText
		},
		subtitle: {
			text: subtitleText
		},
		xAxis: {
			title: {
			text: xaxisText
			},
			type: 'datetime',
			dateTimeLabelFormats: { // don't display the dummy year
				month: '%e. %b',
				year: '%b'
			}
		},
		yAxis: {
			title: {
				text: yaxisText
			},
			min: 0
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.series.name +'</b><br/>'+ Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y +' C';
			}
		},
		series: uberdustSeries
	});
}