alert("init.js loaded");
function onStart () {
	// TODO : Add your Initilize code here
	// NOTE : In order to start your app, call "sf.start()" at the end of this function!!
	
	$.sfScene.show('Scene1');
	$.sfScene.focus('Scene1');
}
function onDestroy () {
	//stop your XHR or Ajax operation and put codes to distroy your application here
	
}
