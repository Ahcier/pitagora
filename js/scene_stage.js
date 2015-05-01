enchant();




//クリアしたステージを記録するグローバル変数
var CLEAR_STAGE_NUM = 0;
var ALL_STAGE_NUM = 2;





//******************************Scene_UI******************************
/*
  -ゲームを補助するUI
  -Sprite
  -ブロックの追加,移動,削除ができるようにしたい
  -ステージにパーツを配置するために使用
  -必要な個数だけ、クラスを作る
  -StageUI_managerで提供

  -ステージ以外の画面でも使うのでstageUIからsceneUIに改名
*/



var UI_button = Class.create(Sprite2,{
	initialize:function(W,H){
		Sprite2.call(this,W,H);
		this.image.drawEdge('black');
		
		this.label = new Label();
		this.label.font = '32px Platino';
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





//******************************Scene_title*****************************
/*
  -開始時の画面
  -stage selectボタンでステージ選択＋scene_stageに移動できる
  -クリアしたステージについて記録したほうがいいか
*/



var Scene_title = Class.create(Scene,{
	initialize:function(core){
		Scene.call(this);
		this.core = core;
		this.backgroundColor = 'blue';

		this.back_image = new Sprite2(this.core.width,this.core.height);
		this.back_image.image.draw(
			this.core.assets['img/scene_title.jpg'],
			0,0,
			this.back_image.width,this.back_image.height);
		this.addChild(this.back_image);

		this.on('enter',function(){
			console.log('scene enter');
			//全クリしてなければ
			if(CLEAR_STAGE_NUM<ALL_STAGE_NUM){
				for(var i=0;i<=CLEAR_STAGE_NUM;i++){
					var b_W = this.width/10,b_H = this.height/20;
					var space = 20;
					var b_stageSelect = new Button_stageSelect(
						this,i,b_W,b_H);
					b_stageSelect.addto(
						this.width*(8/10) - b_stageSelect.width/2,
						this.height * (1/10) + i*(b_H + space),
						'white','stage '+i,this);
				}
			}
		});
	},
	stage_start:function(stage_id){
		//このシーンにscene_stageをpushする
		var stage = new Stage(stage_id);
		var scene_stage = new Scene_stage(this.core,stage);
		this.core.pushScene(scene_stage);
	},
});



var Button_stageSelect = Class.create(UI_button,{
	
	initialize:function(scene_title,stage_id,W,H){
		UI_button.call(this,W,H);
		this.scene_title = scene_title;
		this.stage_id = stage_id;
	},
	pushed:function(){
		this.scene_title.stage_start(this.stage_id);
	},
	
});





//******************************Scene_result*****************************
/*
  -実際にゲームを表示する
  -面白い結果を表示
*/



var Scene_result = Class.create(Scene,{
	initialize:function(core,stage_scene,result){
		Scene.call(this);
		this.backgroundColor = 'yellow';

		this.core = core;
		this.stage_scene = stage_scene;
		this.result = result;

		//背景の画像の設定
		this.back_image = new Sprite2(this.core.width,this.core.height);
		this.back_image.image.draw(
			this.core.assets['img/scene_result.jpg'],
			0,0,
			this.back_image.width,this.back_image.height);
		this.addChild(this.back_image);
		//これはリザルトが見やすいようにするための下地
		var base = new Sprite2(this.width/3,this.height);
		base.image.changeColor('white');
		this.addChild(base);

		//resultの追加
		var res_x = 20;
		var res_y = this.height*(1/8);
		this.add_result(res_x,res_y);
		//console.dir(result);
		/*
		  this.label_result = new Label(
		  result['all']+'\n'+
		  result['correct']+'\n'+
		  result['incorrect']+'\n'+
		  result['stage_out']+'\n'
		  );
		*/
		//それはもう、resultを評価してresultシーンを分岐したいものですよね
		

		//ボタンの追加
		var b_W = this.width/10,b_H = this.height/20; 
		var b_retry = new Button_retryStage(this,b_W,b_H);
		var b_title = new Button_back2title(this,b_W,b_H);
		
		b_retry.addto(
			this.width/2-b_retry.width/2,this.height*3/4-b_retry.height/2,
			'red','retry',this);
		b_title.addto(
			b_retry.x,b_retry.y+b_retry.height*2,
			'blue','title',this);
	},
	retry_stage:function(){
		this.stage_scene.resetStageData();
		this.core.popScene();
	},
	back2title:function(){
		this.core.removeScene(this.stage_scene);
		this.core.popScene();
	},
	add_result:function(x,y){
		var text_result =
			'あなたの工場のペヤング生産ラインで,<br>'
			+' <br>'
			+'出荷されたペヤング は ' +this.result['delivered_product']+ '<br>'
			+'混入した可能性のあるX は ' +this.result['delivered_X']+'<br>'
			+'誤って廃棄されたペヤング は '+this.result['thrown_product']+'<br>'
			+'排除されたX は '+this.result['thrown_X']+'<br>'
			+'床に落ちたペヤング は '+this.result['stage_out_product']+'<br>'
			+'床に落ちたX は '+this.result['stage_out_X']+'<br>'
			+' <br>'
		+'でした<br>'
		;
		var comment = '';
		var label_result = new Label(text_result);
		label_result.font = '16px Platino';
		label_result.x = x;
		label_result.y = y;
		this.addChild(label_result);

		console.dir(this.result);
		console.log('ただしい'+this.result['correct']);
		console.log('全製品' +this.result['all']);
		//最上の結果を出すと次のステージを出現させる
		if(this.result['correct']==this.result['all']){
			CLEAR_STAGE_NUM++;
		}else{
			
		}
	}
});



var Button_retryStage = Class.create(UI_button,{
	//とあるシーンにscene_stageをpushする
	initialize:function(scene_result,W,H){
		UI_button.call(this,W,H);
		this.scene_result = scene_result;
	},
	pushed:function(){
		this.scene_result.retry_stage();
	},
	
});



var Button_back2title = Class.create(UI_button,{
	//とあるシーンにscene_stageをpushする
	initialize:function(scene_result,W,H){
		UI_button.call(this,W,H);
		this.scene_result = scene_result;
	},
	pushed:function(){
		this.scene_result.back2title();
	},
	
});





//******************************Scene_stage******************************
/*
  -実際にゲームを表示する
*/





//stage
var Scene_stage = Class.create(Scene,{
	initialize:function(core,stage){
		Scene.call(this);
		this.backgroundColor = 'blue';

		//ゲーム用変数
		this.core = core;
		this.stage_origin = stage;
		this.stage = stage;
		this.mode_capture = -1;

		this.selected_No = 0;

		//背景の画像の設定
		this.back_image = new Sprite2(this.core.width,this.core.height);
		this.back_image.image.draw(
			this.core.assets['img/scene_result.jpg'],
			0,0,
			this.back_image.width,this.back_image.height);
		
		this.addChild(this.back_image);

		//パーツ
		
		//ラベルシリーズ
		this.notice = new Label('notice');
		//その他
		this.sidebar = new Sidebar(this);
		this.stageview = new Stageview(this);
		this.wire_manager = new Wire_manager(this);
		
		//パーツ調整
		//位置
		this.notice.x = 10;
		this.notice.y = 10;
		this.notice.color = 'white';
		this.notice.font = '24px Platino';

		//パーツ追加
		this.addChild(this.stageview);
		this.addChild(this.notice);

		//ステージ読み込み
		this.loadStageData(this.stage);

		//イベントハンドラ
		this.set_keybind();
		this.on('enterframe',function(){
			var left = this.stage.products_left;
			if(left>0){

				//何もしない
				
			}else{

				//scene_resultへ遷移
				var scene_result= new Scene_result(
					this.core,
					this,
					this.stage.result_game);
				this.core.pushScene(scene_result);
				//this.core.removeScene(this);
				
			}
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
		
		for(var l=0;l<this.stage.startpoints.length;l++){
			var sp = this.stage.startpoints[l];
			this.addChild(sp);
			this.addChild(sp.label_products);
		}
		
		for(var l=0;l<this.stage.goalpoints.length;l++){
			var gp = this.stage.goalpoints[l];
			this.addChild(gp);
			//以降、goalpointの画像の設定の処理
			var img;
			if(gp.goal_type=='A'){
				img = this.core.assets['img/goal_a.jpg'];
			}else if(gp.goal_type=='X'){
				img = this.core.assets['img/goal_x.jpg'];
			}
			gp.image.draw(img,0,0,gp.width,gp.height);
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
			this.removeChild(this.stage.startpoints[l].label_products);
		}
		//this.stage = this.stage_origin;
		this.stage = new Stage(this.stage.stage_id);
		console.log(this.stage);
		this.loadStageData(this.stage);

		//加えて、その他もろもろリセット

	},

	restart:function(){
		for(var i=0;i<this.stage.physical_obj.length;i++){
			this.removeChild(this.stage.physical_obj[i]);
		}
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
	
	remove_parts:function(parts){
		this.removeChild(parts);
		parts.removefrom(this.stage);
	},
	
	replace_parts:function(parts,new_x,new_y){
		parts.x = new_x;
		parts.y = new_y;
	},
	
	make_product:function(x,y,type){
		var new_product = new Product(x,y,type,this);
		//console.log(new_product.type);

		//typeごとに見た目の設定
		switch(new_product.type){
		case 'A':
			//new_product.image.changeColor('red');
			new_product.image.draw(
				this.core.assets['img/product_a.jpg'],
				0,0,
				new_product.width,new_product.height
			);
			break;

		case 'B':
			new_product.image.changeColor('blue');
			break;

		case 'X':
			//new_product.image.changeColor('black');
			new_product.image.draw(
				this.core.assets['img/product_x.jpg'],
				0,0,
				new_product.width,new_product.height
			);
			break;

		default:
			new_product.image.changeColor('orenge');
		}
		new_product.image.drawEdge('black');

		new_product.addto(this.stage);
		this.addChild(new_product);
	},
});



var Stageview = Class.create(Sprite2,{
	initialize:function(scene){
		
		this.scene = scene;
		Sprite2.call(this,
					 scene.width-this.scene.sidebar.width,
					 this.scene.height);
		//this.image.changeColor('orange');
		

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
				scene.remove_parts(this);
			}
		});
		//移動用イベントハンドラ
		parts.on('touchmove',function(e){
			if(stegeview.mode_replace>0){
				scene.replace_parts(parts,e.x,e.y);
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
		this.scene.notice.text = 'センサーを選択';
		
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
						this.scene.notice.text = '接続先を選択';
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
						this.scene.notice.text = '接続完了';

						window.setTimeout(function(){
							if(phase==0)scene.notice.text = 'notice';
						},1000);
					}
				});
			}
		}

		
	};
}



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
		var sb = this.sidebar.button_start;
		if(sb.running > 0)sb.x -= 1000;
	},
});



var Start_button = Class.create(UI_button,{
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');
		this.running = -1;

		this.sidebar = sidebar;
	},
	pushed:function(){
		console.log('start game');
		this.sidebar.startGame();
		this.running = 1;
		this.x += 1000;
	},
});



var Stop_button = Class.create(UI_button,{
	initialize:function(W,H,sidebar){
		UI_button.call(this,W,H);
		this.image.drawEdge('black');

		this.sidebar = sidebar;
		this.active = -1;
	},
	pushed:function(){
		console.log('stop game');
		this.active *= -1;
		if(this.active>0){
			this.label.color = 'red';
		}else{
			this.label.color = 'black';
		}
		this.sidebar.toggle_pause();
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
			'yellow','STOP',this.scene);
		
		//リセットボタン
		this.button_reset = new Reset_button(this.width*8/10,this.height*1/20,this);
		this.button_reset.addto(
			this.button_stop.x,
			this.button_stop.y + this.button_stop.height + space,
			'red','RESET',this.scene);

		
		//以下はスタートボタン連打で狂う問題解決処理
		//スタートは何回も押すと狂うので一回押したら消えるようにする
		this.button_start.on('touchstart',function(){
		});
		//リセットさえ押せばスタートボタンは復活する
		this.button_reset.on('touchstart',function(){
		});
		
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

	toggle_pause:function(){
		stage = this.scene.stage;
		for(var i=0;i<stage.startpoints.length;i++){
			stage.startpoints[i].toggle_stop();
		}
		for(var i=0;i<stage.physical_obj.length;i++){
			stage.physical_obj[i].toggle_pause();
		}
	}
});






