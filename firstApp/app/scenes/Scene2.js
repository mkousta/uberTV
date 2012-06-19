alert("Scene2.js loaded.");
function SceneScene2(options) {
	this.URL = "";
	this.node = "";
	this.capability="";
	this.XHRObj = new XMLHttpRequest();
}

SceneScene2.prototype.initialize = function () {
	alert("SceneScene2.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called

}

SceneScene2.prototype.handleShow = function (attr) {
	alert("SceneScene2.handleShow()");
	// this function will be called when the scene manager show this scene 
	this.node = attr.node;
	this.capability = attr.capability;
	var widgetAPI = new Common.API.Widget();
	widgetAPI.sendReadyEvent();
	
	this.refreshRequest();
	$('#ChartKeyHelp').sfKeyHelp({
		'user': 'Key Help',
		'enter': 'Refresh Chart',
		'return':'Return'
	});

}

SceneScene2.prototype.handleHide = function () {
	alert("SceneScene2.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene2.prototype.handleFocus = function () {
	alert("SceneScene2.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene2.prototype.handleBlur = function () {
	alert("SceneScene2.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene2.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene2.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			alert("left");
			break;
		case sf.key.RIGHT:
			alert("right");
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			alert("enter");
			this.refreshRequest();
			break;
		case sf.key.RETURN:
			alert("return");
			if(this.node==="urn:wisebed:ctitestbed:weatherStation"){
				sf.scene.hide('Scene2');
				sf.scene.show('Scene5');
				sf.scene.focus('Scene5');
			}
			else{
				sf.scene.hide('Scene2');
				sf.scene.show('Scene4');
				sf.scene.focus('Scene4');
			}
			break;
	}
}

SceneScene2.prototype.refreshRequest = function () {
	alert("SceneScene2.refreshRequest()");
	this.URL = "http://uberdust.cti.gr/rest/testbed/1/node/"+this.node+"/capability/urn:wisebed:node:capability:"+this.capability+"/tabdelimited/limit/1000";
	var that = this;
	
	if (this.XHRObj) {
		this.XHRObj.open("GET", this.URL, true);
		this.XHRObj.send();
		
		this.XHRObj.onreadystatechange = function () {
			if (that.XHRObj.readyState == 4) {
				alert(that.XHRObj.responseText);
				that.recieveData();	
			}
		};
	}
	
}

SceneScene2.prototype.recieveData = function () {
	var myResponse = this.XHRObj.responseText;
	var lines = new Array(); 
	
	lines = myResponse.split("\n");
	
	var datavalues = new Array();
	var time;
	var value;
	for(var i=0;i<lines.length-1;i++){
		time = parseFloat(lines[i].split("\t")[0]);
		value = parseFloat(lines[i].split("\t")[1]);
		datavalues[i] = [time,value];
	}
	

	var chart;
	var divContainer = document.getElementById('container1');
	var titleText ="Room "+this.capability+" over Time";
	var subtitleText = 'sensor readings from uberdust';
	var xaxisText = 'time';
	var yaxisText = this.capability;
	var uberdustSeries = [{ name: this.capability, data: datavalues
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
				day: '%e %b',
                month: '%e %b'
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
				return '<b>'+ this.series.name +'</b><br/>'+ Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y;
			}
		},
		 plotOptions: {
		 series: {
		    lineWidth: 1,
		    marker: {
		       enabled: false,
		       states: {
		          hover: {
		             enabled: true,
		             radius: 5
		          }
		       }
		    }
		 }
	      },
		series: uberdustSeries
	});
	
}
