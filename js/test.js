enchant();

var W = 320*2*2;
var H = 320*2;

var image_URL = ['img/product_a.jpg','img/product_x.jpg','img/goal_a.jpg','img/goal_x.jpg','img/scene_title.jpg','img/scene_result.jpg','img/scene_stage.jpg'];

window.onload = function(){

	//===core===
	var core = new Core(W , H);
	core.fps = 15;
	core.rootScene.backgroundColor = 'aqua';
	//‰æ‘œ‚Ì“Ç‚İ‚İ
	for(var i = 0;i<image_URL.length;i++){
		core.preload(image_URL[i]);
	}
	
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

	var test_scenetitle = function(){
		var scene_title = new Scene_title(core);
		core.pushScene(scene_title);
	}
	
	var test_surfaceimage = function(){
		//–³–‚É•\¦‰Â”\
		var sprite = new Sprite2(200,200);
		sprite.x = core.width/2;
		sprite.image.changeColor('red');
		sprite.image.draw(core.assets[image_URL[0]],0,0,sprite.width,sprite.height);
		core.rootScene.addChild(sprite);
	}
	
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
	
	var test_wikirand = function(){
		var wikirand = new Wikirand();
		wikirand
		.ajax_rand_titles
		.then(function(titles){
		console.dir(titles);
			var title = titles[0];
			return title;
		});
	};

	var test_sceneresult = function(){
		var result = {
			all:this.products_left,
			
			correct:3,
			incorrect:3,

			delivered_product:3,
			delivered_X:3,

			thrown_product:0,
			thrown_X:0,
			
			stage_out:0,
			stage_out_product:0,
			stage_out_X:0,
		};
		var stage_scene = null;
		var scene_result = new Scene_result(core,stage_scene,result);
		core.pushScene(scene_result);
	};
	
	core.onload = function(){
		//===scenes add===
		//test_wikirand();
		//test_sceneresult();
		keybind123();
		test_scenetitle();
	};

	core.start();
}
