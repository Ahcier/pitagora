enchant();

var W = 320;
var H = 320;

window.onload = function(){

	//===core===
	var core = new Core(W , H);
	core.fps = 15;
	core.rootScene.backgroundColor = 'pink';
	
	//===grobal var===
	
	
	core.onload = function(){
		//===scenes add===
		core.rootScene.addChild(new Floor(0,0));

		var button = new UI_button(core.rootScene,20,20);
		button.y = 30;
		//core.rootScene.addChild(button);
		
	};

	core.start();
}
