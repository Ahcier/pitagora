enchant();

//**********scenes**********

//window.onload = function(){

	//=====タイトルシーン=====
	var scene_title = new Scene();

	//パーツ
	var label_title = new Label('たいとる!!!');
	var label_title0 = new Label('クリックしてね');

	//背景
	scene_title.backgroundColor = 'red';

	//位置調整
	label_title.x = core.width*2/10;
	label_title.y = core.height/2-label_title.height/2;

	label_title0.x = core.width*2/10;
	label_title0.y = core.height*8/10-label_title0.height/2;

	//パーツ追加
	scene_title.addChild(label_title);
	scene_title.addChild(label_title0);
	scene_title.addEventListener('touchstart',function(){
		core.removeScene(this);
		core.pushScene(scene_stageselect);
	});


	//=====ステージ選択シーン=====
	var scene_stageselect = new Scene();

	//パーツ
	var label_stageselect = new Label('ステージ選択');
	var button_stage1 = new Label('stage 1');
	button_stage1.on('touchstart',function(){
		resetStageData();
		loadStageData(stageData1);
		core.removeScene(scene_stageselect);
		core.pushScene(scene_stage);
	});

	//背景　
	scene_stageselect.backgroundColor = 'yellow';

	//位置調整
	label_stageselect.x = core.width/2 - label_stageselect.width/2;
	label_stageselect.y = core.height/10;

	//パーツ追加
	scene_stageselect.addChild(label_stageselect);



	//=====ステージシーン=====
	var scene_stage = new Scene();

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


	//パーツ
	var testLabel = new Label('test: ???');
	testLabel.x = 10;
	testLabel.y = 300;

	var testLabel2 = new Label('test: ???');
	testLabel2.x = 100;
	testLabel2.y = 300;

	//イベントハンドラ追加
	scene_stage.on('touchstart',function(e){
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
	});

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



	//=====リザルトシーン=====
	var scene_result = new Scene();

	var label_result = new Label('');


//}
