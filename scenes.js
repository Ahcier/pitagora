enchant();

var testfunc = function(){
	console.log('I am from scenes.js');
	var l =  new Label('testfunc');
	l.x = 300;
	l.y = 300;
	return l;
};



/*
var Scene3 = Class.create(Scene,{
	initialize:function(x,y){
		Scene.call(this);

		this.backgroundColor = 'red';

		this.label = new Label('second.jsのscene3だよ');
		this.label.x = x;
		this.label.y = y;
		this.addChild(this.label);
	}
});
*/



//title
var Scene_title = Class.create(Scene,{
	initialize:function(width,height){
		Scene.call(this);
		
		//パーツ
		var label_title = new Label('たいとる!!!');
		var label_title0 = new Label('クリックしてね');

		//背景
		scene_title.backgroundColor = 'red';

		//位置調整
		label_title.x = width/2;
		label_title.y = height/2-label_title.height/2;

		label_title0.x = width/2;
		label_title0.y = height*8/10-label_title0.height/2;

		//パーツ追加
		scene_title.addChild(label_title);
		scene_title.addChild(label_title0);
		/*
		 
		*/
	}
});



//stage select
var Scene_title = Class.create(Scene,{
	initialize:function(width,height){
		Scene.call(this);
		
		//パーツ
		var label_stageselect = new Label('ステージ選択');
		var button_stage1 = new Label('stage 1');

		//背景　
		this.backgroundColor = 'yellow';

		//位置調整
		label_stageselect.x = width/2 - label_stageselect.width/2;
		label_stageselect.y = height/10;

		//パーツ追加
		this.addChild(label_stageselect);
		
		button_stage1.on('touchstart',function(){
			//ここの機能はステージクラスが提供するべき
			var stage1 = new Scene_stage();
			stage1.resetStageData();
			stage1.loadStageData(stageData1);
			core.removeScene(scene_stageselect);
			core.pushScene(scene_stage);
		});
	}
});

/*

//ゲーム用変数
		var gravity = 100;
		var selectedTerrain_No = 0;

		var physical_obj = [];
		var terrain_obj = [];
		var wire_obj = [];

		var terrainNameList = [
			'Floor',
			'Trampoline',
			'Conveyor',
			'Trapdoor',
			'Sensor'
		];
var stageEL = function(e){
			switch(selectedTerrain_No){
			case 0:
				puttingTerrain = new Floor(e.x,e.y);
				break;
				
			case 1:
				puttingTerrain = new Trampoline(e.x,e.y);
				break;
				
			case 2:
				puttingTerrain = new Conveyor(e.x,e.y);
				break;

			case 3:
				puttingTerrain = new Trapdoor(e.x,e.y);
				break;

			case 4:
				puttingTerrain = new Sensor(e.x,e.y);
				break;
				
			default:
				puttingTerrain = new Floor(e.x,e.y);
				break;
			}
			terrain_obj.push(puttingTerrain);
		};

*/



//result
var Scene_result = Class.create(Scene,{
	initialize:function(width,height){
		Scene.call(this);
		
		//パーツ
		var scene_result = new Scene();
		var label_result = new Label('');

		//背景
		this.backgroundColor = 'red';

		//位置調整

		//パーツ追加
		this.addChild(label_result);
		/*
		 
		*/
	}
});
