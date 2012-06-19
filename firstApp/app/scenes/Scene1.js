alert('SceneScene1.js loaded');

function SceneScene1() {
	this.myIndex = 45;
	this.column = 0;
	this.row = 0;
	this.XHRObj=new XMLHttpRequest();
	this.URL = "";
}

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	this.column = 4;
	this.row = 0;
	$('#room1').sfImage({src:'images/Room1.png'}).sfImage('show');
	$('#room2').sfImage({src:'images/Room2.png'}).sfImage('show');
	$('#room3').sfImage({src:'images/Room3.png'}).sfImage('show');
	$('#room4').sfImage({src:'images/Room4.png'}).sfImage('show');
	$('#room5').sfImage({src:'images/Room5.png'}).sfImage('show');
	$('#room6').sfImage({src:'images/Room6.png'}).sfImage('show');
	$('#room7').sfImage({src:'images/Room7.png'}).sfImage('show');
	$('#room8').sfImage({src:'images/Room8.png'}).sfImage('show');
	$('#room9').sfImage({src:'images/Room9.png'}).sfImage('show');
	$('#room10').sfImage({src:'images/Room10.png'}).sfImage('show');
	$('#room11').sfImage({src:'images/Room11.png'}).sfImage('show');
	$('#room12').sfImage({src:'images/Room12.png'}).sfImage('show');
	$('#roof').sfImage({src:'images/weatherStation.png'}).sfImage('show');
	this.myIndex = [['#room5', '#room4','#room3','#room2','#room1'],['#room6','#room7','#room12','#room11'],['#room8','#room9','#room10']];
	// ALTERNATIVE ???? this.myIndex = [['#room5', '#room4','#room3','#room2','#room1','#room6'],['#room7','#room12','#room11','#room8','#room9','#room10']];
	//alert(this.myIndex[1][3]);
	
}

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene 
	/* Property Enumeration
	var name;
	for (name in this) {
		if (typeof this[name] !== 'function') {
			alert(name + ': ' + this[name]);
		}
	}
	*/
	//image counter
	var counter = $('#SceneScene1').find('img').length;
	alert(counter);
	$('#KeyHelp').sfKeyHelp({
		'theme':'BLACK',
		'user': 'Key Help',
		'enter': 'Enter Room',
		'leftright':'Navigate',
		'updown': 'Navigate'
	});
	
	var widgetAPI = new Common.API.Widget();
	widgetAPI.sendReadyEvent();
	
	this.URL = "http://uberdust.cti.gr/rest/testbed/1/rooms/json";
	var that = this;
	
	if (this.XHRObj) {
		this.XHRObj.open("GET", this.URL, true);
		this.XHRObj.send();
		this.XHRObj.onreadystatechange = function () {
			if (that.XHRObj.readyState == 4) {
				var fileSystemObj = new FileSystem();
				var bResult = fileSystemObj.createCommonDir(curWidget.id);
				var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/myRooms.json', 'w');
				fileObj.writeAll(that.XHRObj.responseText);
				fileSystemObj.closeCommonFile(fileObj);
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
	
	//when I return to the scene, set focus on the img previously selected
	$('img').fadeTo('fast', 0.8, alert("blur all others"));
	$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus on where I am")); 
	
}

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
	
}

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	//MUST FIX!!!
	switch (keyCode) {
		case sf.key.LEFT:
			if(this.column===0){
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.column=4; 
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));
			}
			else{
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.column=this.column-1;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));
			}
			break;
		case sf.key.RIGHT:
			if(typeof(this.myIndex[this.row][this.column+1])==='undefined'){
				alert("bika");
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.column=0;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			else{
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.column=this.column+1;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			break;
		case sf.key.UP:
			if(this.row===0){
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.row=2;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			else{
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.row=this.row-1;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			break;
		case sf.key.DOWN:	
			if(this.row===2){
				alert("AAAAAAA");
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.row=0;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			else{
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 0.8, alert("blur prev"));
				this.row=this.row+1;
				$(this.myIndex[this.row][this.column]).fadeTo('fast', 1, alert("focus next"));	 
			}
			break;
		case sf.key.ENTER:
			alert("enter");
			if(this.column===0){
				if(this.row===0){
					alert('get into Room5');
					sf.scene.get('Scene3');
					sf.scene.show('Scene3');
					sf.scene.focus('Scene3');
				}
				else if(this.row===1){
					alert('get into Room6');
					sf.scene.get('Scene3');
					sf.scene.show('Scene3');
					sf.scene.focus('Scene3');
				}
				else{
					alert('get into Room8');
					sf.scene.get('Scene3');
					sf.scene.show('Scene3');
					sf.scene.focus('Scene3');
				}
			}
			else if(this.column===1){
				if(this.row===0){
					alert('get into Room4');
					sf.scene.show('Scene3');
					sf.scene.focus('Scene3');
				}
				else if(this.row===1){
					alert('get into Room7');
					sf.scene.show('Scene3');
					sf.scene.focus('Scene3');
				}
				else{
					alert('get into Room9');
					sf.scene.show('Scene2',9);
					sf.scene.focus('Scene2');
				}
			}
			else if(this.column===2){
				if(this.row===0){
					alert('get into Room3');
					sf.scene.show('Scene2',3);
					sf.scene.focus('Scene2');
				}
				else if(this.row===1){
					alert('get into Room12');
					sf.scene.show('Scene2',12);
					sf.scene.focus('Scene2');
				}
				else{
					alert('get into Room10');
					sf.scene.show('Scene2',10);
					sf.scene.focus('Scene2');
				}
			}
			else if(this.column===3){
				if(this.row===0){
					alert('get into Room2');
					sf.scene.show('Scene2',2);
					sf.scene.focus('Scene2');
				}
				else{
					alert('get into Room11');
					sf.scene.show('Scene2',11);
					sf.scene.focus('Scene2');
				}
			}
			else if(this.column===4 && this.row===0){
				alert('get into Room1');
				sf.scene.show('Scene4',1);
				sf.scene.focus('Scene4');
			}
			break;
			case sf.key.RED:
			alert('get to WeatherStation');
				sf.scene.show('Scene5');
				sf.scene.focus('Scene5');
			break;
			
	}
}