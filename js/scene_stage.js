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
		this.notice = new Label('notice');
		this.sidebar = new Sidebar(this);
		this.stageview = new Stageview(this);
		this.stageview.image.changeColor('pink');
		this.wire_manager = new Wire_manager(this);
		
		//パーツ位置調整
		this.notice.x = 10;
		this.notice.y = 10;

		//パーツ追加
		this.addChild(this.stageview);
		
		this.addChild(this.notice);

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

	snapshot:function(){
		console.log('snapshot');
		var snapshot = [];
		for(var i=0;i<this.stage.physical_obj.length;i++){
			//snapshot.push(this.stage.physical_obj[i].getInfo_JSON());
		}

		for(var j=0;j<this.stage.terrain_obj.length;j++){
			snapshot.push(this.stage.terrain_obj[j].getInfo());
		}

		for(var j=0;j<this.stage.sensor_obj.length;j++){
			snapshot.push(this.stage.sensor_obj[j].getInfo());
		}

		for(var l=0;l<this.stage.wire_obj.length;l++){
			snapshot.push(this.stage.wire_obj[l].getInfo());
		}
		
		for(var l=0;l<this.stage.startpoints.length;l++){
			snapshot.push(this.stage.startpoints[l].getInfo());
		}
		var snapshot_JSON = JSON.stringify(snapshot);
		//return snapshot;
		return snapshot_JSON;
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
			console.log('key0 test:down');
			//var stage_json = '[{"parts_id":100,"x":87.60064412238324,"y":298.8727858293076},{"parts_id":100,"x":217.45571658615137,"y":298.8727858293076},{"parts_id":100,"x":347.3107890499195,"y":298.8727858293076}]';
			//this.stage.load_stageJSON(stage_json);
			//this.loadStageData(this.stage);

			console.log(this.snapshot());
			
			//JSON.stringify(this.stage);使えねえ野郎だ
		});
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


var Stageview = Class.create(Sprite2,{
	initialize:function(scene){
		
		this.scene = scene;
		Sprite2.call(this,scene.width-this.scene.sidebar.width,this.scene.height);
		this.image.changeColor('orange');

		this.mode_delete = -1;
		this.mode_replace = -1;
		this.mode_wire = -1;

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
				putting = new Sensor(e.x,e.y);
				break;
				
			case 5:
				putting = new Startpoint(e.x,e.y,2);
				break;
				
			case 6:
				putting = new GoalPoint(e.x,e.y,'xp');
				break;
				
			default:
				//putting = new Floor(e.x,e.y);
				putting = new product(e.x,e.y,'x');
				break;
			}
			this.put_parts(putting);
		});
	},
	put_parts:function(parts){
		var scene = this.scene;
		var stegeview = this;
		scene.addChild(parts);
		parts.addto(scene.stage);
		//削除用イベントハンドラ
		parts.on('touchstart',function(e){
			if(stegeview.mode_delete>0){
				scene.removeChild(this);
				this.removefrom(scene.stage);
			}
		});
		//移動用イベントハンドラ
		parts.on('touchmove',function(e){
			if(stegeview.mode_replace>0){
				this.x = e.x;
				this.y = e.y;
			}
		});
	},
});



function Wire_manager(scene){
	//wireのsceneへの追加を担当
	this.scene = scene;
	this.phase = 0;
	//0:開始前,1:接続するセンサーの選択,2:接続する機械の選択
	
	this.add_wire = function(){

		if(this.phase == 0) this.phase = 1;//センサーの選択開始
		console.log('接続元を選択 phase' + this.phase);
		
		var phase = this.phase;
		var src = null;
		var dist = null;
		var stage = this.scene.stage;
		
		//センサーオブジェクトのボタン化(id=200)
		for(var i=0;i<stage.sensor_obj.length;i++){
			if(stage.sensor_obj[i].parts_id == 200){
				var source = stage.sensor_obj[i];
				source.on('touchstart',function(){
					if(phase==1){
						src = this;
						phase = 2;//センサーからの接続先の選択へ
						console.log('接続先を選択 phase' + phase);
					}
				});
			}
		}
		
		//センサー接続先オブジェクトのボタン化(id=102)
		for(var i=0;i<stage.terrain_obj.length;i++){
			if(stage.terrain_obj[i].parts_id == 102){
				dist = stage.terrain_obj[i];
				dist.on('touchstart',function(){
					if(phase==2){
						dist = this;
						//wire生成,接続
						var wire = src.connectWire(dist);
						//wire.addto(stage);
						scene.addChild(wire);
						scene.stageview.put_parts(wire);
						
						phase = 0;
						console.log('接続完了 phase' + phase);
					}
				});
			}
		}

		
	};
}



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



var Wire_button = Class.create(UI_button,{
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');
		this.setColor('purple');

		this.sidebar = sidebar;
	},
	pushed:function(){
		this.sidebar.scene.wire_manager.add_wire();
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
			'Sensor',
			'Start',
			'Goal',
		];

		//まずボタンを置くベースをシーンに追加
		this.scene.addChild(this);

		//ボタンを追加する
		this.buttons = [];
		var pre_y = this.y;
		var space = this.height/50;//ボタンの間隔
		//以下、ボタンを追加＆ラベル書き換え処理
		//パーツセレクトボタン x Nこ
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

		//ワイヤーボタン
		this.button_wire = new Wire_button(this.width*8/10,this.height*1/20,this);
		this.button_wire.addto(
			this.buttons[this.buttons.length-1].x,
			this.buttons[this.buttons.length-1].y + 2*(space + this.buttons[0].height),
			'purple','WIRE',this.scene);

		//スタートボタン
		this.button_start = new Start_button(this.width*8/10,this.height*2/20,this);
		this.button_start.addto(
			this.button_wire.x,
			this.button_wire.y + 2*(space + this.buttons[0].height),
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
		
		//選択したボタンの枠線の色付け
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
