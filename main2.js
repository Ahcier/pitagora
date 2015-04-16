enchant();
	

window.onload = function(){

	//===core===
	var core = new Core(W , H);
	core.fps = 15;
	core.rootScene.backgroundColor = 'green';
	
	//===grobal var===
	
	
	core.onload = function(){
		core.rootScene.addChild(testfunc());

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
		//==========scenes==========



		//=====タイトルシーン=====
		var scene_title = new Scene_title();
		core.pushScene(scene_title);
		scene_title.addEventListener('touchstart',function(){
			core.pushScene(scene_stageselect);
		});


		//=====ステージ選択シーン=====
		var scene_stageselect = new Scene();

		button_stage1.on('touchstart',function(){
			resetStageData();
			loadStageData(stageData1);
			core.removeScene(scene_stageselect);
			core.pushScene(scene_stage);
		});

		//背景　
		scene_stageselect.backgroundColor = 'yellow';

		//位置調整
		label_stageselect.x = W/2 - label_stageselect.width/2;
		label_stageselect.y = H/10;

		//パーツ追加
		scene_stageselect.addChild(label_stageselect);



		//=====ステージシーン=====
		var scene_stage = new Scene();

		//位置調整
		testLabel.x = 10;
		testLabel.y = 300;
		
		testLabel2.x = 100;
		testLabel2.y = 300;

		//イベントハンドラ追加
		scene_stage.on('touchstart',stageEL(e));

		//キーバインド,keybind
		scene_stage.keybind( '1'.charCodeAt(0), 'decrece' );
		scene_stage.keybind( '2'.charCodeAt(0), 'increce' );

		scene_stage.addEventListener('increce'+'buttondown',function(){
			selectedTerrain_No++;
		});
		scene_stage.addEventListener('decrece'+'buttondown',function(){
			selectedTerrain_No--;
		});
		scene_stage.on('enterframe', function(){
			testLabel.text = selectedTerrain_No;
			testLabel2.text = terrainNameList[selectedTerrain_No];
		});


		//パーツ追加
		scene_stage.addChild(testLabel);
		scene_stage.addChild(testLabel2);

		//stageシーンを動的に生成したい
		//共通のパーツ以外はstages.jsから持ってきたデータを読み込んで配置する？
		/*
		var loadStageData = function(stageData){

			physical_obj = stageData.physical_obj;
			terrain_obj = stageData.terrain_obj;
			wire_obj = stageData.wire_obj;

			for(var i=0;i<physical_obj.length;i++){
				scene_stage.addChild(physical_obj[i]);
			}

			for(var j=0;j<terrain_obj.length;j++){
				scene_stage.addChild(terrain_obj[j]);
			}

			for(var l=0;l<wire_obj.length;l++){
				scene_stage.addChild(wire_obj[l]);
			}

		};

		var resetStageData = function(){

			physical_obj = [];
			terrain_obj = [];
			wire_obj = [];

			for(var i=0;i<physical_obj.length;i++){
				scene_stage.removeChild(physical_obj[i]);
			}

			for(var j=0;j<terrain_obj.length;j++){
				scene_stage.removeChild(terrain_obj[j]);
			}

			for(var l=0;l<wire_obj.length;l++){
				scene_stage.removeChild(wire_obj[l]);
			}

			//加えて、その他もろもろリセット
		};
*/

		//===scenes add===

		core.rootScene.addEventListener('touchstart',function(){
			console.log('rootScene have been clicked');
			core.pushScene(scene_title);
		});
		
	};

	core.start();
}
