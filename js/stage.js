enchant();




//********************stage_JSON***************



//開発用
var JSON00 = '[{"parts_id":1000,"span":1000,"x":10000,"y":-10000,"products_type":["X","X","X","X","X","X"]},{"parts_id":100,"x":10000,"y":-9900}]';

//var JSON00 = '[{"parts_id":103,"x":69.33333333333333,"y":193.77777777777777},{"parts_id":1000,"x":100,"y":100,"products_type":["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]}]';


var JSON01 = '[{"parts_id":103,"speed":256,"x":69.33333333333333,"y":193.77777777777777},{"parts_id":1000,"span":0.5,"x":100,"y":100,"products_type":["A","A","X","A","A","A","X","X","A","X","A","A"]},{"parts_id":2000,"x":837.2705882352941,"y":575.2470588235294,"goal_type":"X"},{"parts_id":2000,"x":986.3529411764706,"y":429.1764705882353,"goal_type":"A"}]';



var JSON02 =
	'[{"parts_id":2000,"x":919.2914653784219,"y":218.48631239935588,"goal_type":"A"},{"parts_id":103,"x":107.18196457326891,"y":215.39452495974234},{"parts_id":100,"x":239.09822866344604,"y":215.39452495974234},{"parts_id":100,"x":371.0144927536232,"y":215.39452495974234},{"parts_id":100,"x":757.487922705314,"y":253.52657004830917},{"parts_id":100,"x":888.3735909822866,"y":253.52657004830917},{"parts_id":100,"x":760.5797101449275,"y":501.9001610305958},{"parts_id":100,"x":892.4959742351047,"y":501.9001610305958},{"parts_id":2000,"x":923.41384863124,"y":462.7375201288245,"goal_type":"X"},{"parts_id":1000,"x":144.28341384863123,"y":90.69243156199678,"products_type":["A","X","A","X","A","X"]}]';


/*
var JSON03 =
	'[{"parts_id":2000,"x":919.2914653784219,"y":218.48631239935588,"goal_type":"X"},{"parts_id":103,"x":107.18196457326891,"y":215.39452495974234},{"parts_id":100,"x":239.09822866344604,"y":215.39452495974234},{"parts_id":100,"x":371.0144927536232,"y":215.39452495974234},{"parts_id":100,"x":757.487922705314,"y":253.52657004830917},{"parts_id":100,"x":888.3735909822866,"y":253.52657004830917},{"parts_id":100,"x":760.5797101449275,"y":501.9001610305958},{"parts_id":100,"x":892.4959742351047,"y":501.9001610305958},{"parts_id":2000,"x":923.41384863124,"y":462.7375201288245,"goal_type":"A"},{"parts_id":1000,"x":144.28341384863123,"y":90.69243156199678,"products_type":["X","A","X","A","X","A"]}]';
*/


var JSON03 =
	'[{"parts_id":103,"x":107.18196457326891,"y":215.39452495974234},{"parts_id":100,"x":239.09822866344604,"y":215.39452495974234},{"parts_id":100,"x":371.0144927536232,"y":215.39452495974234},{"parts_id":100,"x":757.487922705314,"y":253.52657004830917},{"parts_id":100,"x":888.3735909822866,"y":253.52657004830917},{"parts_id":100,"x":760.5797101449275,"y":501.9001610305958},{"parts_id":100,"x":892.4959742351047,"y":501.9001610305958},{"parts_id":100,"x":627.9529411764706,"y":502.9647058823529},{"parts_id":103,"x":495.43529411764706,"y":502.9647058823529},{"parts_id":102,"x":531.5764705882353,"y":215.34117647058824},{"parts_id":100,"x":632.4705882352941,"y":216.8470588235294},{"parts_id":1000,"x":144.28341384863123,"y":90.69243156199678,"products_type":["X","A","X","A","X","A"]},{"parts_id":2000,"x":919.2914653784219,"y":218.48631239935588,"goal_type":"X"},{"parts_id":2000,"x":923.41384863124,"y":462.7375201288245,"goal_type":"A"}]';



var JSON04 =
	'[{"parts_id":103,"x":69.33333333333333,"y":193.77777777777777},{"parts_id":100,"x":775.1111111111111,"y":200.88888888888889},{"parts_id":102,"x":241.77777777777777,"y":195.55555555555554},{"parts_id":102,"x":335.1111111111111,"y":195.55555555555554},{"parts_id":102,"x":422.22222222222223,"y":195.55555555555554},{"parts_id":102,"x":504.8888888888889,"y":199.11111111111111},{"parts_id":102,"x":595.5555555555555,"y":199.11111111111111},{"parts_id":102,"x":688,"y":199.11111111111111},{"parts_id":1000,"x":100,"y":100,"products_type":["A","X","X","X","A","X","X","X","A"]},{"parts_id":2000,"x":218.66666666666666,"y":535.1111111111111,"goal_type":"X"},{"parts_id":2000,"x":371.55555555555554,"y":535.1111111111111,"goal_type":"X"},{"parts_id":2000,"x":524.4444444444445,"y":535.1111111111111,"goal_type":"X"},{"parts_id":2000,"x":670.2222222222222,"y":536.8888888888889,"goal_type":"X"},{"parts_id":2000,"x":922.6666666666666,"y":154.66666666666666,"goal_type":"A"}]';



var JSON05 =
	'[{"parts_id":103,"x":102.4,"y":361.4117647058824},{"parts_id":100,"x":236.42352941176472,"y":361.4117647058824},{"parts_id":100,"x":374.9647058823529,"y":361.4117647058824},{"parts_id":102,"x":548.1411764705882,"y":364.4235294117647},{"parts_id":100,"x":652.0470588235294,"y":361.4117647058824},{"parts_id":100,"x":512,"y":519.5294117647059},{"parts_id":100,"x":652.0470588235294,"y":521.035294117647},{"parts_id":1000,"x":126.49411764705883,"y":66.25882352941177,"products_type":["A","X","X","A","A","X","X","A","A]},{"parts_id":2000,"x":804.1411764705882,"y":475.8588235294118,"goal_type":"X"},{"parts_id":2000,"x":801.1294117647059,"y":317.74117647058824,"goal_type":"A"}]';



//********************Stage********************
/*
-各種ステージの構成パーツを保持
-クリアなどのステージ切り替えのきっかけを発信
*/



function Stage(stage_id){

	
	//ゲーム用変数
	this.gravity = 100;
	this.stage_id = stage_id;

	//構成パーツの保持
	this.physical_obj = [];
	this.terrain_obj = [];
	this.sensor_obj = [];
	this.wire_obj = [];

	 //プレイヤーが使用可能なパーツの個数
	this.obj_limit = function(){
		this.floor = 0;
		this.trampoline = 0;
		this.conveyor = 0;
		this.trapdoor = 0;
		this.sensor = 0;
		this.start = 0;
		this.goal = 0;

		this.wire = 0;
		
	};
	
	//やってくるブロックの情報
	//Startpointsクラスのオブジェクトを格納
	this.startpoints = [];
	this.goalpoints = [];

	//JSON形式の文字列、stageのload_stageJSONで読み込み可能
	this.stageJSONstrings = [];


	//this.stageJSONstrings.push(JSON00);
	this.stageJSONstrings.push(JSON01);
	this.stageJSONstrings.push(JSON02);
	this.stageJSONstrings.push(JSON03);
	this.stageJSONstrings.push(JSON04);
	this.stageJSONstrings.push(JSON05);
	//this.stageJSONstrings.push(JSON06);
	
	this.load_stageJSON = function(stage_JSON){
		var stage_data = JSON.parse(stage_JSON);
		//stage_data -> parts_id,x,y
		var putting;
		for(var i=0;i<stage_data.length;i++){
			
			parts_data = stage_data[i];
			var id = parts_data.parts_id;
			switch(id){
			case 0:
				putting = new Product(parts_data.x,parts_data.y);
				putting.addto(this);
				break;
				
			case 100:
				putting = new Floor(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 101:
				putting = new Trampoline(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 102:
				putting = new Trapdoor(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 103:
				putting = new Conveyor(parts_data.x,parts_data.y);
				if(parts_data.speed!=null){
					putting.speed = parts_data.speed;
				}
				putting.addto(this);
				break;

				
			case 200:
				putting = new Sensor(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 300:
				putting = new Wire(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 1000:
				var span = 3;
				if(parts_data.span!=null)span = parts_data.span;
				putting = new Startpoint(
					parts_data.x,
					parts_data.y,
					span,
					parts_data.products_type
				);
				//putting.products_type = parts_data.products_type;
				putting.addto(this);
				break;

			case 2000:
				putting = new GoalPoint(parts_data.x,parts_data.y,parts_data.goal_type);
				putting.addto(this);
				break;
						
			}
		
		}
	};
	
	this.load_stageJSON(this.stageJSONstrings[stage_id]);

	//生産予定のproductsの合計をもとめる
	this.products_left = 0;
	for(var i=0;i<this.startpoints.length;i++){
		var startp = this.startpoints[i];
		this.products_left += startp.products_type.length;
	}

	//プレイ結果を記録
	this.result_game = {
		all:this.products_left,
		
		correct:0,
		incorrect:0,

		delivered_product:0,
		delivered_X:0,

		thrown_product:0,
		thrown_X:0,
		
		stage_out:0,
		stage_out_product:0,
		stage_out_X:0,
	};
};






//********************object********************
/*
-ステージに配置されるブロックたち
*/



var Surface0 = Class.create(Surface,{
	//constructor
	initialize:function(sprite){
		//call super constructor
		Surface.call(this,sprite.width,sprite.height);
		//field
		//event hundler

		sprite.image = this;
	},
	//methods
	drawEdge: function(edgeColor){
		this.context.strokeStyle = edgeColor;
		this.context.lineWidth = 2;
		this.context.strokeRect(0,0,this.width,this.height);
	},
	changeColor: function(newColor){
		this.color = newColor;
		this.context.fillStyle = this.color;
		this.context.fillRect(0,0,this.width,this.height);
	},
	drawLine: function(begin_x,begin_y,end_x,end_y,color){
		this.context.beginPath();
		this.context.moveTo(begin_x,begin_y);
		this.context.lineTo(end_x,end_y);
		this.context.strokeStyle = color;
		this.context.closePath();
		this.context.stroke();
	},
	drawRect: function(begin_x,begin_y,end_x,end_y){
		this.context.beginPath();
		this.context.moveTo(begin_x,begin_y);
		this.context.lineTo(end_x,end_y);
		this.context.closePath();
		this.context.stroke();
	},
});



var Sprite2 = Class.create(Sprite, {
	//constructor
	initialize:function(width,height){
		//call super constructor
		Sprite.call(this,width,height);
		//field
		this.color = 'white';
		this.image = new Surface0(this);
		this.preset = -1;
		//event hundler
	},
	//methods
	getCenter:function(){
		var center_x = this.x + this.width/2;
		var center_y = this.y + this.height/2;
		var center_array = [center_x,center_y];
		return center_array;
	},

});



var Stage_parts = Class.create(Sprite2, {
	/*
	  Stageに追加されるパーツ
	 */
	//constructor
	initialize:function(width,height){
		//call super constructor
		Sprite2.call(this,width,height);
		//field

		this.stage = null;
		this.index = null;
		this.parts_id = -1;

		//event hundler
	},

	//methods
	addto: function(Stage){
		//上書きして使用
		//Stageの適切な配列に追加するように処理
		this.stage = Stage;
	},
	removefrom: function(stage){
		this.stage = stage;
	},
	getInfo: function(){
		var info = {
			//'hello':'world',
			parts_id:this.parts_id,
			x:this.x,
			y:this.y,
		};
		return info;
	},
});



var Physical = Class.create(Stage_parts, {
	initialize: function(x,y,width,height){
		//call super constructor
		Stage_parts.call(this,width,height);
		//constructor
		this.image.changeColor('yellow');
		this.image.drawEdge('orange');
		//field
		this.v_x = 0;
		this.v_y = 0;
		this.a_x = 0;
		this.a_y = 0 + 100.0;//this.stage.gravity;
		this.pre_x = x;
		this.pre_y = y;
		this.x = x;
		this.y = y;
		
		this.val_rebound = 0;
		this.inAir = 0;
		this.inactive = -1;
		this.pause = -1;
		
		//event hundler
		this.on('enterframe',function(){
			if(this.inactive>0 || this.pause>0){

				//何もしない
				
			}else{
				this.pre_x = this.x;
				this.pre_y = this.y;
				this.v_x += this.a_x/15;//core.fps; 
				this.v_y += this.a_y/15;///core.fps;
				this.x += this.v_x/15;//core.fps; 
				this.y += this.v_y/15;//core.fps;
			}
		});
	},
	//methods
	stop: function(){
		this.a_x = 0;
		this.a_y = 0;
		this.v_x = 0;
		this.v_y = 0;
	},
	rebound: function(){
		if(this.v_y>0) this.v_y *= -this.val_rebound;
	},
	state: function(){
		console.log('x: '+ this.x);
		console.log('y: '+ this.y);
		console.log('v_x: '+ this.v_x);
		console.log('v_y: '+ this.v_y);
		console.log('a_x: '+ this.a_x);
		console.log('a_y: '+ this.a_y);
	},
	addto: function(stage){
		if(stage.physical_obj == null)throw new Error('引数がStageクラスではありません');
		stage.physical_obj.push(this);
		this.index = stage.physical_obj.length-1;
		this.stage = stage;
	},
	removefrom: function(stage){
		stage.physical_obj.splice(this.index);
	},
	away: function(){
		//removefrom関数はterrainとの衝突処理時に使用するとバグる、これは代替の関数
		//見えなくして、活動停止する
		this.visible = 0;
		this.inactive = 1;
	},
	toggle_pause: function(){
		this.pause*=-1;
	},
	move_street:function(end_x,end_y){
		var speed = 128;
		
	},
});



var Terrain = Class.create(Stage_parts, {
	//constructor
	initialize: function(x,y,width,height){
		//call super constructor
		Stage_parts.call(this,width,height);
		//field
		this.x = x;
		this.y = y;

		this.active = 1;

		//event hundler
		this.on('enterframe',function(){
			for(var i=0;i<this.stage.physical_obj.length;i++){
				var obj = this.stage.physical_obj[i];
				if(obj.inactive > 0){
					
					//何もしない
					
				}else{
					
					if(this.intersect(obj)){
						
						this.image.drawEdge('red');//objがあたっていると光る
						if(this.active>0){
							this.touch_onBorder(obj);//<=== 衝突時の処理
						}
						
					}else{
						
						this.image.drawEdge('black');
						
					}
					
				}
			}
		});
	},
	//methods
	conflict: function(obj){
	},
	conflict_right: function(obj){
		obj.v_x = 0;
	},
	conflict_left: function(obj){
		obj.v_x = 0;
	},
	conflict_upper: function(obj){
		obj.v_y = 0;
	},
	conflict_under: function(obj){
		obj.v_y = 0;
	},
	
	touch_onBorder:function(obj){
		
		var Xborder_right = this.x + this.width;
		var Xborder_left  = this.x;
		var Yborder_upper = this.y - this.height;
		var Yborder_under = this.y + this.height;
		
		this.conflict(obj)
		
		
		if((obj.x<Xborder_right)&&(obj.x+obj.width>Xborder_left)){//on same COLUMN
			
			
			//console.log('on same COLUMN');
			if(obj.y<=Yborder_upper){
				obj.y = Yborder_upper - obj.height/2;//put on UPPER border
				obj.junping = 0;//reset junping flag
				this.conflict_upper(obj);
			}else if(obj.y>=Yborder_under){
				obj.y = Yborder_under + obj.height/2;//put on BOTTOM border
				this.conflict_under(obj);
			}
			
			
		}
		
		
		else if((obj.y>=Yborder_upper)&&(obj.y<=Yborder_under)){//on same ROW
			
			
			//console.log('on same ROW');
			if(obj.x>=Xborder_right){
				obj.x = Xborder_right;//put on RIGHT border
				this.conflict_right(obj);
			}else if(obj.x<=Xborder_left){
				obj.x = Xborder_left - obj.width;//put on LEFT border
				this.conflict_left(obj);
			}
			
			
		}
		
		
	},
	terrainState: function(){
	},
	addto: function(Stage){
		this.stage = Stage;
		Stage.terrain_obj.push(this);
		this.index = Stage.terrain_obj.length-1;
	},
	removefrom:function(stage){
		stage.terrain_obj.splice(this.index);
	},
});



var gimicTerrain = Class.create(Terrain,{
	initialize:function(x,y,width,height,stage){
		//call super constructor
		Terrain.call(this,x,y,width,height,stage);
		this.power = -1;
		this.wires = [];
		//event hundler
		this.on('enterframe',function(){
			if(this.power>0){
				this.running();
			}
			for(var i=0;i<this.wires.length;i++){
				if(this.wires[i].transmitting>0){
					//console.log('on');
					this.powerOn();
					return;
				}
			}
			//console.log('off');
			this.powerOff();
		});
	},
	powerOn:function(){
		if(this.power<0){
			this.powerOn_event();
			this.power = 1;
		}
	},

	powerOff:function(){
		if(this.power>0){
			this.powerOff_event();
			this.power = -1;
		}
	},

	powerOn_event:function(){
	},

	powerOff_event:function(){
	},
	
	running:function(){
	},
	
	connect_wire:function(wire){
		this.wires.push(wire);
	}
});



var Trapdoor = Class.create(gimicTerrain,{
	//電源オンで床が消える落とし穴
	initialize:function(x,y){
		gimicTerrain.call(this,x,y,32*2,32/2);
		this.image.changeColor('purple');
		this.disappear = -1;
		this.parts_id = 102;
		
	},
	powerOn_event:function(){
		this.disappear*=-1;
		if(this.disappear>0){	
			this.opacity = 0.5;
			this.active = -1;
		}else{
			this.opacity = 1;
			this.active = 1;
		}
	},
});



var Sensor = Class.create(Stage_parts,{
	
	initialize:function(x,y){
		Stage_parts.call(this,16,16);
		this.x = x;
		this.y = y;
		this.image.changeColor('red');
		this.capture = -1;
		this.wires = [];
		this.on('enterframe',function(){
			this.search();
			this.send(this.capture);
		});
		this.parts_id = 200;
	},
	
	search:function(){
		var physical_obj = this.stage.physical_obj;
		for(var i=0;i<physical_obj.length;i++){
			if(this.intersect(physical_obj[i])){
				this.capture = 1;	
				this.image.drawEdge('yellow');
				return;
			}
			this.capture = -1;
			this.image.drawEdge('black');
		}
	},
	
	connectWire:function(dist){
		console.log('generate new wire...');
		var wire = new Wire(this,dist);
		console.log('sensor:wire connected');
		this.wires.push(wire);

		return wire;//返却値をどうぞご利用ください!!!!!!!!!
	},
	
	send:function(value){
		//console.log('sensor: send ' + value);
		for(var i=0;i<this.wires.length;i++){
			var wire = this.wires[i];
			wire.transmit(value);
		}
	},
	addto: function(stage){
		if(stage.sensor_obj == null)throw new Error('引数がStageクラスではありません');
		this.stage = stage;
		stage.sensor_obj.push(this);
		this.index = stage.sensor_obj.length-1;
	},
	removefrom:function(stage){
		stage.sensor_obj.splice(this.index);
	},
});



var Wire = Class.create(Stage_parts,{
	
	initialize:function(source,dist){
		//console.log('wire: initialized');

		this.dist = dist;
		this.dist.connect_wire(this);
		this.source = source;
		this.source_x = source.getCenter()[0];
		this.source_y = source.getCenter()[1];
		this.dist_x = dist.getCenter()[0];
		this.dist_y = dist.getCenter()[1];
		Stage_parts.call(this,
						 Math.abs(this.dist_x-this.source_x),
						 Math.abs(this.dist_y-this.source_y)
						);
		this.transmitting = -1;//gimicが参照する変数

		this.parts_id = 300;
		
		//めんどくさいがwireの大きさが正のままで成立する位置に移動する
		var _x = this.dist_x - this.source_x;
		var _y = this.dist_y - this.source_y;
		if(_x>=0&&_y>=0){//++
			this.x = this.source_x;
			this.y = this.source_y;
		}else if(_x<0&&_y>=0){//-+
			this.x = this.source_x - this.width;
			this.y = this.source_y ;
		}else if(_x<0&&_y<0){//--
			this.x = this.source_x - this.width;
			this.y = this.source_y - this.height;
		}else if(_x>=0&&_y<0){//+-
			this.x = this.source_x;
			this.y = this.source_y - this.height;
		}
		
		this.drawWire('black');
	},
	transmit:function(value){
		//console.log('wire: transmit');
		if(value>0){
			this.drawWire('yellow');
			//this.dist.powerOn();
			this.transmitting = 1;
		}else{
			this.drawWire('black');
			//this.dist.powerOff();
			this.transmitting = -1;
		}
	},
	drawWire:function(color){
		//drawLineが負の数を入れると壊れるので、座標の位置関係で場合分け
		var _x = this.dist_x - this.source_x;
		var _y = this.dist_y - this.source_y;
		
		//this.image.drawEdge(color);
		
		if(_x*_y<0){//2,4象限,右上がり
			this.image.drawLine(
			0,this.height,
			this.width,0,
			color);
		}else{//1,3象限,右下がり
			this.image.drawLine(
			0,0,
			this.width,this.height,
			color);
		}
		
		
		console.log('draw wire');
	},
	addto: function(stage){
		this.stage = stage;
		this.stage.wire_obj.push(this);
		this.index = stage.wire_obj.length-1;
	},
	removefrom:function(stage){
		stage.wire_obj.splice(this.index);
	},
});



var Player = Class.create(Physical, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Physical.call(this,x,y,32,32);
		//initialize
		this.image.changeColor('aqua');
		this.image.drawEdge('blue');
		//field
		this.val_rebound = 0.0;
		this.junping = 0;
		//event hundler
		this.on('enterframe',function(){
			//if(core.input.up){
			//	this.junp();
			//};
		});
		
	},
	//methods
	walk:function(){
	},
	junp:function(){
		if(this.junping==0){
			this.v_y -= this.height*2;
			this.junping = 1;
		}
	},
});



var Product = Class.create(Physical, {
	initialize:function(x,y,type,scene){
		Physical.call(this,x,y,32*2,32*2);
		
		this.val_rebound = 0.1;
		this.scene = scene;//このオブジェクトからsceneの関数を呼び出すため
		this.type = type;

		this.parts_id = 0;

		//見た目の設定はscene_stage.make_product()に任せた
		/*
		  switch(this.type){
		  case 'A':
		  this.image.changeColor('red');
		  this.image.draw('img/product_a.jpg');
		  break;

		  case 'B':
		  this.image.changeColor('blue');
		  break;

		  case 'X':
		  this.image.changeColor('black');
		  break;

		  default:
		  this.image.changeColor('orenge');
		  }
		  this.image.drawEdge('black');
		*/

		//イベントハンドラ
		this.on('enterframe',function(){
			if(this.y>1500 && this.inactive<0){
				this.stage_out();
			}
		});
	},
	goal:function(goal){
		//のこりproductカウンタを減少
		this.stage.products_left --;
		//ゴールとコレとのタイプを比較
		if(goal.goal_type==this.type){
			//console.log('やったぜ');
			this.stage.result_game['correct']++;
			//どのように成功したか
			//product = ペヤングorサムシング,goal = 出荷or廃棄
			if(goal.goal_type == 'A' && this.type == 'A'){
				//出荷したペヤングの数を加算
				this.stage.result_game['delivered_product']++;
			}else if(goal.goal_type == 'X' && this.type == 'X'){
				//廃棄した異物の数を加算
				this.stage.result_game['thrown_X']++;
			}
		}else{
			//console.log('ダメみたいですね');
			this.stage.result_game['incorrect']++;
			//どのように失敗したか
			if(goal.goal_type == 'X' && this.type == 'A'){
				//廃棄したペヤングの数を加算
				this.stage.result_game['thrown_product']++;
			}else if(goal.goal_type == 'A' && this.type == 'X'){
				//廃棄したペヤングの数を加算
				this.stage.result_game['delivered_X']++;
			}
		};
		//is.scene.remove_parts(this);
		//バグったので苦肉の策だが
		this.away();
	},
	stage_out:function(){
		console.log('stage out');
		//のこりproductカウンタを減少
		this.stage.products_left --;
		this.stage.result_game['stage_out']++;
		if(this.type == 'A'){
			//コースアウトしたペヤングの数を加算
			this.stage.result_game['stage_out_product']++;
		}else if(this.type == 'X'){
			//コースアウトしたXの数を加算
			this.stage.result_game['stage_out_X']++;
		}
		this.away();
	},
});



var Startpoint = Class.create(Stage_parts,{
	initialize:function(x,y,span_sec,products_type){
		Stage_parts.call(this,32*2,32);
		//基本設定
		this.x = x;
		this.y = y;
		this.fps = 15;
		this.image.changeColor('white');
		this.image.drawEdge('black');
		this.parts_id = 1000;

		//特殊設定
		this.span_frame = span_sec * this.fps;

		this.products_type = products_type;//['A','A','A','A','A','A'];
		this.pointer = 0;

		//出現する製品を予告するラベル
		this.label_products = new Label('');
		for(var i=0;i<this.products_type.length;i++){
			this.label_products.text += this.products_type[i];
		}
		this.label_products.x = this.x;
		this.label_products.y = this.y - 25;
		this.label_products.color = 'white'
		this.label_products.font = '24px Platino'
		

		this.running = -1;		
	},
	run:function(scene){
		this.running = 1;
		this.on('enterframe',function(){
			//type配列を元にproductを生産
			if(this.running>0&&this.pointer<this.products_type.length){
				if(this.age%this.span_frame==0){
					var typelist = this.products_type;
					//console.log('ブロックを作ったつもり : '+this.age);
					scene.make_product(this.x,this.y
									   ,typelist[this.pointer]);
					this.pointer++
					//ラベルの更新
					this.label_products.text = '';
					for(var i=this.pointer;i<this.products_type.length;i++){
						this.label_products.text += this.products_type[i];
					}
				}
			}
		});
	},
	toggle_stop:function(){
		//console.log('stopしたつもり');
		this.running *= -1;
	},
	addto: function(stage){
		this.stage = stage;
		stage.startpoints.push(this);
		this.index = stage.startpoints.length-1;
	},
	getInfo: function(){
		var info = {
			//'hello':'world',
			parts_id:this.parts_id,
			x:this.x,
			y:this.y,
			products_type:this.products_type,
		};
		return info;
	},
});



var GoalPoint = Class.create(Terrain,{
	initialize:function(x,y,type){
		//受け取った製品のtypeが違ったらペナルティを課す
		Terrain.call(this,x,y,32*4,32*2);
		this.goal_type = type;
		this.parts_id = 2000;

		switch(this.goal_type){
		case 'A':
			this.image.changeColor('red');
			break;

		case 'B':
			this.image.changeColor('blue');
			break;

		case 'X':
			this.image.changeColor('black');
			break;

		default:
			this.image.changeColor('orange');
		}
		this.image.drawEdge('black');
	},
	receive:function(product){
		//console.log('受け取ったつもり type = '+ product.type);
		//console.log(this.stage.products_left);
		if(product.type==this.goal_type){
			console.log('good!!');
			product.goal(this,this.scene);
			return 1;
		}else{
			console.log('poor...');
			product.goal(this,this.scene);
			return -1;
		}
	},
	//productとの接触時の処理
	touch_onBorder:function(obj){
		var is_match = this.receive(obj);
		return is_match;;
	},
	getInfo: function(){
		var info = {
			//'hello':'world',
			parts_id:this.parts_id,
			x:this.x,
			y:this.y,
			goal_type:this.goal_type,
		};
		return info;
	},
	addto: function(stage){
		this.stage = stage;
		stage.goalpoints.push(this);
		this.index = stage.goalpoints.length-1;
	},
});



var Trampoline = Class.create(Terrain, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Terrain.call(this,x,y,32*4,16);
		this.image.changeColor('blue');
		//field
		this.extra_rebound = 1;
		this.parts_id = 101;
		//event hundler
		
	},
	//methods
	conflict_upper:function(obj){
		console.log('trampoline:conflict to object on UPPER aspect');
		obj.val_rebound += this.extra_rebound;
		obj.rebound();
		obj.val_rebound -= this.extra_rebound;
	}
});



var Floor = Class.create(Terrain, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Terrain.call(this,x,y,32*4,16);
		this.image.changeColor('yellow');
		//field
		this.color = 'gray';
		this.parts_id = 100;
		//this.image = core.assets['icon1.png'];
		//event hundler
		
	},
	//methods
});



var Conveyor = Class.create(Floor, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Floor.call(this,x,y);
		this.image.changeColor('orange');
		//field
		this.speed = 16*4;
		this.parts_id = 103;
		//event hundler
		this.on('enterframe',function(){
			var age = this.age;
			this.animation(age);
		});
	},
	//methods
	conflict_upper:function(obj){
		console.log('conveyor:conflict to object on UPPER aspect');
		obj.v_y = 0;
		obj.v_x = this.speed;
	},
	animation:function(age){
		this.image.changeColor('orange');
		var x = this.speed*age/15%this.width;
		if(x<0) x = x+this.width;
		this.image.context.fillRect(x,this.y,10,this.height);
		this.image.drawLine(x,0,x,this.height);
	}
});







