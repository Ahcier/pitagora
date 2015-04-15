enchant();

window.onload = function(){

	//core
	var core = new Core(320,320);
core.set
	core.fps = 15;


	core.onload = function(){
		
		//===scenes===
		//タイトルシーン
		var scene_title = new Scene();
		var label_title = new Label('たいとる!!!');
		var label_title0 = new Label('クリックしてね');
		scene_title.backgroundColor = 'red';
		label_title.x = core.width*2/10;
		label_title.y = core.height/2-label_title.height/2;
		label_title0.x = core.width*2/10;
		label_title0.y = core.height*8/10-label_title0.height/2;
		scene_title.addChild(label_title);
		scene_title.addChild(label_title0);

		

		//ステージ選択シーン
		var scene_stageselect = new Scene();
		var label_stageselect = new Label('ステージ選択');
		scene_stageselect.backgroundColor = 'yellow';
		label_stageselect.x = core.width/2 - label_stageselect.width/2;
		label_stageselect.y = core.height/10;
		scene_stageselect.addChild(label_stageselect);
		//var scene_stage = new Scene();
		//var scene_result = new Scene();



		//ステージシーン
		var scene_stage = [];


		core.rootScene.backgroundColor = 'green';
		core.rootScene.addEventListener('touchstart',function(){
			core.pushScene(scene_title);
			//core.pushScene(scene_stageselect);
		});
		scene_title.addEventListener('touchstart',function(){
			core.removeScene(this);
			core.pushScene(scene_stageselect);
		});
	}
	
	core.start();
}
