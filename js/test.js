enchant();

var W = 320*2*2;
var H = 320*2;

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
		//var startp = new Startpoint(100,100,1);
		//startp.addto(stage);

		var ss = new Scene_stage(stage);

		core.pushScene(ss);
	};

	var test_keybind = function(){
		core.keybind('1'.charCodeAt(0),'keyz');
		core.keybind('2'.charCodeAt(0),'keyx');
		core.keybind('3'.charCodeAt(0),'keyc');
		core.rootScene.on('enterframe',function(){
			console.log('enterframe!!!');
			if(core.input.keyz){
				console.log('root:keyz have ever pushed');
			}
			if(core.input.up)console.log('up');
		});
		core.rootScene.on('keyzbuttondown',function(){
			console.log('keyz buttondown');
		});
	}

	var keybind123 = function(){
		core.keybind('1'.charCodeAt(0),'keyz');
		core.keybind('2'.charCodeAt(0),'keyx');
		core.keybind('3'.charCodeAt(0),'keyc');
		core.keybind('0'.charCodeAt(0),'key0');
	};
		
	
	core.onload = function(){
		//===scenes add===
		
		//core.rootScene.addChild(new Floor(0,0));

		//var button = new UI_button(core.rootScene,20,20);
		//button.y = 30;

		//core.rootScene.addChild(button);
		//var testclass = new TestClass(core.rootScene);
		
		keybind123();
		test_scenestage();
		
		
		//test_keybind();
	};

	core.start();
}
