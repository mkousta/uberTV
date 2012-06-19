function SceneScene3(options) {
	this.options = options;
	

}

SceneScene3.prototype.initialize = function () {
	alert("SceneScene3.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
}




SceneScene3.prototype.handleShow = function () {
	alert("SceneScene3.handleShow()");
	// this function will be called when the scene manager show this scene 
}

SceneScene3.prototype.handleHide = function () {
	alert("SceneScene3.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneScene3.prototype.handleFocus = function () {
	alert("SceneScene3.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneScene3.prototype.handleBlur = function () {
	alert("SceneScene3.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneScene3.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene3.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;	
		case sf.key.RETURN:
			alert("return");
			sf.scene.hide('Scene3');
			sf.scene.show('Scene1');
			sf.scene.focus('Scene1');
			break;
	}
}
