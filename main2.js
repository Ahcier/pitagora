enchant();
	

window.onload = function(){

	//===core===
	var core = new Core(320*2 , 320);
	core.fps = 15;
	core.rootScene.backgroundColor = 'green';
	
	//===grobal var===
	
	
	core.onload = function(){


		//===Other===
		
		/*
		  var player = new Player(32*3,32);

		  physical_obj[0] = player;
		  physical_obj[1] = new Player(32*3,-100);
		  physical_obj[2] = new Player(32*3,-200);

		  var td = new Trapdoor(200,100);
		  var sens = new Sensor(100,50);
		  sens.connectWire(td);
		*/
		core.rootScene.addEventListener('touchstart',function(){
			core.pushScene(scene_title);
		});
		
	};

	core.start();
}
