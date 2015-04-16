enchant();



var StageData = function(){
	this.physical_obj = [];
	this.terrain_obj = [];
	this.wire_obj = [];
};


		
//stage
var Scene_stage = Class.create(Scene,{
	initialize:function(){
		Scene.call(this);

		//ゲーム用変数
		this.gravity = 100;
		this.selectedTerrain_No = 0;

		this.physical_obj = [];
		this.terrain_obj = [];
		this.wire_obj = [];

		this.terrainNameList = [
			'Floor',
			'Trampoline',
			'Conveyor',
			'Trapdoor',
			'Sensor'
		];

		//パーツ
		this.testLabel =  new Label('test: ???');
		this.testLabel2 = new Label('test: ???');
		var touchEL = function(e){//イベントハンドラ用の関数
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
			this.terrain_obj.push(puttingTerrain);
		};

		//位置調整
		this.testLabel.x = 10;
		this.testLabel.y = 300;
		
		this.testLabel2.x = 100;
		this.testLabel2.y = 300;

		//イベントハンドラ
		this.on('touchstart',this.touchEL(e));
		//パーツ追加
		this.addChild(this.testLabel);
		this.addChild(this.testLabel2);
	},

	loadStageData:function(stageData){

		this.physical_obj = stageData.physical_obj;
		this.terrain_obj = stageData.terrain_obj;
		this.wire_obj = stageData.wire_obj;

		for(var i=0;i<physical_obj.length;i++){
			this.addChild(this.physical_obj[i]);
		}

		for(var j=0;j<terrain_obj.length;j++){
			this.addChild(this.terrain_obj[j]);
		}

		for(var l=0;l<wire_obj.length;l++){
			this.addChild(this.wire_obj[l]);
		}

	},

	resetStageData:function(){

		this.physical_obj = [];
		this.terrain_obj = [];
		this.wire_obj = [];

		for(var i=0;i<this.physical_obj.length;i++){
			this.removeChild(physical_obj[i]);
		}

		for(var j=0;j<this.terrain_obj.length;j++){
			this.removeChild(terrain_obj[j]);
		}

		for(var l=0;l<this.wire_obj.length;l++){
			this.removeChild(wire_obj[l]);
		}

		//加えて、その他もろもろリセット
	},
});



var Scene_stage1 = Class.create(Scene_stage,{
	initialize:function(){
		Scene_stage.call(this);

		//==========stage1==========
		/*
		  var stageData1 = new StageData();
		  stageData1.physical_obj.push();
		  stageData1.terrain_obj.push();
		  stageData1.wire_obj.push();
		*/

		var player = new Player(32*3,32);

		this.physical_obj[0] = player;
		this.physical_obj[1] = new Player(32*3,-100);
		this.physical_obj[2] = new Player(32*3,-200);

		var td = new Trapdoor(200,100);
		var sens = new Sensor(100,50);
		var wire = sens.connectWire(td);


		var stageData1 = new StageData();
		//stageData1.physical_obj.push();
		stageData1.terrain_obj.push(td);
		stageData1.terrain_obj.push(sens);
		stageData1.wire_obj.push(wire);
		
});
