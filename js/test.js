enchant();

var W = 320*2;
var H = 320;

window.onload = function(){

	//===core===
	var core = new Core(W , H);
	core.fps = 15;
	core.rootScene.backgroundColor = 'pink';
	
	//===grobal var===
	var TestClass = Class.create(Sprite, {
		initialize:function(Scene){
			Sprite.call(this,Scene.width/2,Scene.height/2);
			this.image = new Surface(this.width,this.height);
			this.image.context.fillStyle = 'black';
			this.image.context.fillRect(0,0,this.width,this.height);
			Scene.addChild(this);
		},
	});
	
	var test_scenestage = function(){
		var stage = new Stage();
		var ss = new Scene_stage(stage);
		core.pushScene(ss);
	};
	
	core.onload = function(){
		//===scenes add===
		core.rootScene.addChild(new Floor(0,0));

		var button = new UI_button(core.rootScene,20,20);
		button.y = 30;

		//core.rootScene.addChild(button);
		var testclass = new TestClass(core.rootScene);
		test_scenestage();
		
	};

	core.start();
}
