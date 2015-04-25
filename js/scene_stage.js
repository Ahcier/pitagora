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
		this.stage_origin = stage;
		this.stage = stage;
		this.mode_capture = -1;

		this.selected_No = 0;


		//パーツ
		this.testLabel =  new Label('test: ???');
		this.testLabel2 = new Label('test: ???');
		this.sidebar = new Sidebar(this);
		this.stageview = new Stageview(this);
		this.stageview.image.changeColor('pink');
		
		//パーツ位置調整
		this.testLabel.x = 10;
		this.testLabel.y = 300;
		
		this.testLabel2.x = 100;
		this.testLabel2.y = 300;

		//パーツ追加
		this.addChild(this.testLabel);
		this.addChild(this.testLabel2);
		this.addChild(this.stageview);

		//ステージ読み込み
		this.loadStageData(this.stage);

		//イベントハンドラ
		this.set_keybind();
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
		
		for(var l=0;l<this.stage.startpoints.length;l++){
			this.addChild(this.stage.startpoints[l]);
			//this.stage.startpoints[l].run(this);
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

		for(var l=0;l<this.stage.startpoints.length;l++){
			this.removeChild(this.stage.startpoints[l]);
		}
		//this.stage = this.stage_origin;
		this.stage = new Stage();
		console.log(this.stage);
		this.loadStageData(this.stage);

		//加えて、その他もろもろリセット

	},

	make_product:function(x,y,type){
		var new_product = new Product(x,y,type);
		console.log(new_product.type);
		new_product.addto(this.stage);
		this.addChild(new_product);
	},

	set_keybind:function(){
		this.on('keyzbuttondown',function(){
			//console.log('scene_stage:key_z buttondown');
			if(this.stageview.mode_delete<0){
				this.stageview.mode_delete = 1;
			}
		});
		this.on('keyzbuttonup',function(){
			//console.log('scene_stage:key_z buttonup');
			if(this.stageview.mode_delete>0){
				this.stageview.mode_delete = -1;
			}
		});
		this.on('keyxbuttondown',function(){
			//console.log('scene_stage:key_x buttondown');
			if(this.stageview.mode_replace<0){
				this.stageview.mode_replace = 1;
			}
		});
		this.on('keyxbuttonup',function(){
			//console.log('scene_stage:key_x buttonup');
			if(this.stageview.mode_replace>0){
				this.stageview.mode_replace = -1;
			}
		});
		this.on('key0buttondown',function(){
			//emulater
			console.log('key0 test');
			this.stageview.backgroundColor;
			//JSON.stringify(this.stage);使えねえ野郎だ
		});
	}
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


var Stageview = Class.create(Sprite2,{
	initialize:function(scene){
		
		this.scene = scene;
		Sprite2.call(this,scene.width-this.scene.sidebar.width,this.scene.height);
		this.image.changeColor('orange');

		this.mode_delete = -1;
		this.mode_replace = -1;

		this.on('touchstart',function(e){
			//画面クリックで現在選択中のパーツを設置
			//ただし、パーツ自体をクリックした時にはこのハンドラは反応しない
			//設置モード
			switch(this.scene.selected_No){
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
				//putting = new Sensor(e.x,e.y);
				putting = new GoalPoint(e.x,e.y,'xp');
				break;
				
			case 5:
				//putting = new Wire(e.x,e.y);
				break;
				
			default:
				//putting = new Floor(e.x,e.y);
				putting = new product(e.x,e.y,'x');
				break;
			}
			var scene = this.scene;
			var stegeview = this;
			scene.addChild(putting);
			putting.addto(scene.stage);
			//削除用イベントハンドラ
			putting.on('touchstart',function(e){
				if(stegeview.mode_delete>0){
					scene.removeChild(this);
					this.removefrom(scene.stage);
				}
			});
			putting.on('touchmove',function(e){
				if(stegeview.mode_replace>0){
					this.x = e.x;
					this.y = e.y;
				}
			});
			console.log('stage have touched');
		});
	},
	
});



var UI_button = Class.create(Sprite2,{
	initialize:function(W,H){
		Sprite2.call(this,W,H);
		this.image.drawEdge('black');
		
		this.label = new Label();
		//ボタンに色つけるだけの装飾パネル
		this.decolation_sprite = new Sprite2(this.width,this.height);
		

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
	setColor:function(color){
		this.decolation_sprite.image.changeColor(color);
		this.decolation_sprite.x = this.x;
		this.decolation_sprite.y = this.y;
	},
	
	addto:function(x,y,new_color,new_text,scene){
		this.x = x;
		this.y = y;
		this.setColor(new_color);
		this.setText(new_text);
		scene.addChild(this.decolation_sprite);//装飾パネルを敷いて...
		scene.addChild(this.label);//ラベルを敷いて...
		scene.addChild(this);//最後に透明なボタンをかぶせる
	},
	
	
});



var PS_button = Class.create(UI_button,{//パーツセレクトボタン=PS_button
	initialize:function(W,H,sidebar,value){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');
		
		this.value = value;
		this.sidebar = sidebar;
		this.left_num = 0;
		
	},
	pushed:function(){
		//console.log('UI_button:I have pushed');
		this.sidebar.selectParts(this.value);
	},
	
});



var Reset_button = Class.create(UI_button,{//リセットボタン
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');

		this.sidebar = sidebar;
	},
	pushed:function(){
		this.sidebar.scene.resetStageData();
	},
});



var Start_button = Class.create(UI_button,{
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');

		this.sidebar = sidebar;
	},
	pushed:function(){
		console.log('start game');
		this.sidebar.startGame();
	},
});



var Stop_button = Class.create(UI_button,{
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');

		this.sidebar = sidebar;
	},
	pushed:function(){
		console.log('stop game');
		this.sidebar.stopGame();
	},
});



var Sidebar = Class.create(Sprite2,{
	//パーツを選択するためのUI
	//ひも付けされているシーンの選択パーツを変更する
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

		//まずボタンを置くベースをシーンに追加
		this.scene.addChild(this);

		//ボタンを追加する
		this.buttons = [];
		var pre_y = this.y;
		var space = this.height/50;//ボタンの間隔
		//以下、ボタンを追加＆ラベル書き換え処理
		//パーツセレクトボタンx5
		for(var i=0;i<this.nameList.length;i++){
			this.buttons[i] = new PS_button(this.width*8/10,this.height*1/20,this,i);

			this.buttons[i].x = this.x+this.width*1/10;
			this.buttons[i].y = pre_y + space;
			pre_y = this.buttons[i].y + this.buttons[i].height;
			this.buttons[i].setText(this.nameList[i]);
			
			//ボタンに色つけるだけの装飾パネル
			var decolation_sprite = new Sprite2(this.buttons[i].width,this.buttons[i].height);
			decolation_sprite.image.changeColor('orange');
			decolation_sprite.x = this.buttons[i].x;
			decolation_sprite.y = this.buttons[i].y;

			this.scene.addChild(decolation_sprite);//装飾パネルを敷いて...
			this.scene.addChild(this.buttons[i].label);//ラベルを敷いて...
			this.scene.addChild(this.buttons[i]);//最後に透明なボタンをかぶせる
			
		}

		//スタートボタン
		this.button_start = new Start_button(this.width*8/10,this.height*2/20,this);
		this.button_start.addto(
			this.buttons[this.buttons.length-1].x,
			this.buttons[this.buttons.length-1].y + 2*(space + this.buttons[0].height),
			'yellow','START',this.scene);

		//ストップボタン
		this.button_stop = new Stop_button(this.width*8/10,this.height*1/20,this);
		this.button_stop.addto(
			this.button_start.x,
			this.button_start.y + this.button_start.height + space,
			'blue','STOP',this.scene);
		
		//リセットボタン
		this.button_reset = new Reset_button(this.width*8/10,this.height*1/20,this);
		this.button_reset.addto(
			this.button_stop.x,
			this.button_stop.y + this.button_stop.height + space,
			'red','RESET',this.scene);
	},
	
	selectParts:function(i){
		this.scene.selected_No = i;
		//this.scene.testLabel.text = this.nameList[i];
		for(var j=0;j<this.buttons.length;j++){
			this.buttons[j].image.drawEdge('black');
		}
		this.buttons[i].image.drawEdge('yellow');
	},

	startGame:function(){
		starts = this.scene.stage.startpoints;
		for(var i=0;i<starts.length;i++){
			starts[i].run(this.scene);
		}
	},

	stopGame:function(){
		starts = this.scene.stage.startpoints;
		for(var i=0;i<starts.length;i++){
			starts[i].stop();
		}
	}
});
