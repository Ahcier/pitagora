enchant();





//********************Scene_stage********************
/*
  -実際にゲームを表示する
*/



//stage
var Scene_stage = Class.create(Scene,{
	initialize:function(stage){
		Scene.call(this);
		this.backgroundColor = 'blue';
		

		//ゲーム用変数
		this.stage = stage;

		this.selected_No = 0;

		this.terrainNameList = [
			'Floor',
			'Trampoline',
			'Conveyor',
			'Trapdoor',
			//'Sensor'
		];


		//パーツ
		this.testLabel =  new Label('test: ???');
		this.testLabel2 = new Label('test: ???');
		this.selecter = new Parts_selecter(this);

		//パーツ位置調整
		this.testLabel.x = 10;
		this.testLabel.y = 300;
		
		this.testLabel2.x = 100;
		this.testLabel2.y = 300;

		//パーツ追加
		this.addChild(this.testLabel);
		this.addChild(this.testLabel2);

		//ステージ読み込み
		this.loadStageData(this.stage);

		//イベントハンドラ
		//画面クリックで現在選択中のパーツを設置
		this.on(function(e){
			switch(selected_No){
			case 0:
				putting = new Floor(e.x,e.y);
				break;
				
			case 1:
				putting = new Trampoline(e.x,e.y);
				break;
				
			case 2:
				putting = new Conveyor(e.x,e.y);
				break;

			case 3:
				putting = new Trapdoor(e.x,e.y);
				break;

				
			case 4:
				putting = new Sensor(e.x,e.y);
				break;
				
				
			case 5:
				putting = new wire(e.x,e.y);
				break;
				
				
			default:
				putting = new Floor(e.x,e.y);
				break;
			}
			putting.addto(this.stage);
		});
	},


	loadStageData:function(stage){

		this.stage = stage;

		for(var i=0;i<this.stage.physical_obj.length;i++){
			this.addChild(this.stage.physical_obj[i]);
		}

		for(var j=0;j<this.stage.terrain_obj.length;j++){
			this.addChild(this.stage.terrain_obj[j]);
		}

		for(var j=0;j<this.stage.sensor_obj.length;j++){
			this.addChild(this.stage.sensor_obj[j]);
		}

		for(var l=0;l<this.stage.wire_obj.length;l++){
			this.addChild(this.stage.wire_obj[l]);
		}

	},

	resetStageData:function(){

		for(var i=0;i<this.stage.physical_obj.length;i++){
			this.removeChild(this.stage.physical_obj[i]);
		}

		for(var j=0;j<this.stage.terrain_obj.length;j++){
			this.removeChild(this.stage.terrain_obj[j]);
		}

		for(var j=0;j<this.stage.sensor_obj.length;j++){
			this.removeChild(this.stage.sensor_obj[j]);
		}

		for(var l=0;l<this.stage.wire_obj.length;l++){
			this.removeChild(this.stage.wire_obj[l]);
		}

		this.stage = null;

		//加えて、その他もろもろリセット
	},
});





//********************StageUI********************
/*
  -ゲームを補助するUI
  -Sprite
  -ブロックの追加,移動,削除ができるようにしたい
  -ステージにパーツを配置するために使用
  -必要な個数だけ、クラスを作る
  -StageUI_managerで提供
*/



var UI_button = Class.create(Sprite2,{
	initialize:function(W,H){
		Sprite2.call(this,W,H);
		//this.image.changeColor('red');
		this.image.drawEdge('black');

		this.label = new Label();

		this.on('touchstart',function(){
			this.pushed();
		});
	},
	pushed:function(num){
		console.log('UI_button:I have pushed');
	},
	setText:function(text){
		this.label.text = text;
		this.label.x = this.x;
		this.label.y = this.y;
	},
	
});



var PS_button = Class.create(UI_button,{//パーツセレクト
	initialize:function(W,H,PS,value){
		UI_button.call(this,W,H);
		//this.image.changeColor('red');
		this.image.drawEdge('black');

		this.value = value;
		this.PS = PS;
	},
	pushed:function(){
		//console.log('UI_button:I have pushed');
		this.PS.selected_No = this.value;
		this.PS.scene.testLabel.text = this.PS.nameList[this.PS.selected_No];
	},
	
});



var Sidebar = Class.create(Sprite2,{
	//パーツを選択するためのUI
	initialize:function(scene){
		Sprite2.call(this,scene.width*1/8,scene.height);

		this.scene = scene;

		this.x = scene.width - this.width;
		this.image.changeColor('green');
		this.image.drawEdge('black');
		this.selected_No = 0; 
		this.nameList = [
			'Floor',
			'Trampoline',
			'Conveyor',
			'Trapdoor',
			'Sensor'
		];

		//ベースをシーンに追加
		this.scene.addChild(this);

		//ボタンを追加する
		this.buttons = [];
		var pre_y = this.y;
		var space = this.height/50;//ボタンの間隔
		//以下、ボタンを追加＆ラベル書き換え処理
		for(var i=0;i<this.nameList.length;i++){
			this.buttons[i] = new PS_button(this.width*8/10,this.height*1/20,this,i);

			this.buttons[i].x = this.x+this.width*1/10;
			this.buttons[i].y = pre_y + space;
			pre_y = this.buttons[i].y + this.buttons[i].height;
			this.buttons[i].setText(this.nameList[i]);
			scene.addChild(this.buttons[i].label);//ラベルを敷いて...
			this.scene.addChild(this.buttons[i]);//最後に透明なボタンをかぶせる
			
		}

	},
});
