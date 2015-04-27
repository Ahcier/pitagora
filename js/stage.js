enchant();





//********************Stage********************
/*
-各種ステージの構成パーツを保持
-クリアなどのステージ切り替えのきっかけを発信
*/



function Stage(){

	
	//ゲーム用変数
	this.gravity = 100;

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

		this.wire = 0;
	};
	
	//やってくるブロックの情報
	//Startpointsクラスのオブジェクトを格納
	this.startpoints = [];
	this.goalpoints = [];

	//種類,間隔,位置

	/*
	 this.test_function = function(){
		console.log('hello function!!!!!!!!!!!!');
	};
	*/
	
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

				
			case 200:
				putting = new Sensor(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 300:
				putting = new Wire(parts_data.x,parts_data.y);
				putting.addto(this);
				break;

			case 1000:
				putting = new Startpoint(parts_data.x,parts_data.y,3);
				putting.products_type = parts_data.products_type;
				putting.addto(this);
				break;

			case 2000:
				putting = new GoalPoint(parts_data.x,parts_data.y,parts_data.goal_type);
				putting.addto(this);
				break;
						
			}
		
		}
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
		
		//event hundler
		this.on('enterframe',function(){
			this.pre_x = this.x;
			this.pre_y = this.y;
			this.v_x += this.a_x/15;//core.fps; 
			this.v_y += this.a_y/15;///core.fps;
			this.x += this.v_x/15;//core.fps; 
			this.y += this.v_y/15;//core.fps; 
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
	}
});



var Terrain = Class.create(Stage_parts, {
	//constructor
	initialize: function(x,y,width,height){
		//call super constructor
		Stage_parts.call(this,width,height);
		//field
		this.x = x;
		this.y = y;

		//event hundler
		this.on('enterframe',function(){
			for(var i=0;i<this.stage.physical_obj.length;i++){
				var obj = this.stage.physical_obj[i];
				if(this.intersect(obj)){
					this.image.drawEdge('red');
					this.touch_onBorder(obj);//<=== 衝突時の処理
				}else{
					this.image.drawEdge('black');
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
			
			
			console.log('on same COLUMN');
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
			
			
			console.log('on same ROW');
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
		//event hundler
		this.on('enterframe',function(){
			if(this.power>0){
				this.running();
			}
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
		}else{
			this.opacity = 1;
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
		this.source = source;
		this.source_x = source.getCenter()[0];
		this.source_y = source.getCenter()[1];
		this.dist_x = dist.getCenter()[0];
		this.dist_y = dist.getCenter()[1];
		Stage_parts.call(this,
						 Math.abs(this.dist_x-this.source_x),
						 Math.abs(this.dist_y-this.source_y)
						);
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

		this.parts_id = 300;
	},
	transmit:function(value){
		//console.log('wire: transmit');
		if(value>0){
			this.drawWire('yellow');
			this.dist.powerOn();
		}else{
			this.drawWire('black');
			this.dist.powerOff();
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
	initialize:function(x,y,type){
		Physical.call(this,x,y,32,32);
		this.image.changeColor('orange');
		this.image.drawEdge('black');
		this.val_rebound = 0.1;
		this.type = type;

		this.parts_id = 0;
	},
	goal:function(goal){
		if(goal.type==this.type) console.log('やったぜ');
		else console.log('ダメみたいですね');
	},
});



var Startpoint = Class.create(Stage_parts,{
	initialize:function(x,y,span_sec){
		Stage_parts.call(this,32*2,32);
		this.x = x;
		this.y = y;
		this.fps = 15;
		this.image.changeColor('white');
		this.image.drawEdge('black');
		this.span_frame = span_sec * this.fps;

		this.products_type = ['A','A','A','A','A','A'];
		this.pointer = 0;

		this.running = -1;

		this.parts_id = 1000;
	},
	run:function(scene){
		this.running = 1;
		this.on('enterframe',function(){
			//type配列を元にproductを生産
			if(this.running>0&&this.pointer<this.products_type.length){
				if(this.age%this.span_frame==0){
					var typelist = this.products_type;
					console.log('ブロックを作ったつもり : '+this.age);
					scene.make_product(this.x,this.y
									   ,typelist[this.pointer]);
					this.pointer++;
				}
			}
		});
	},
	stop:function(){
		console.log('stopしたつもり');
		this.running = -1;
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
		Terrain.call(this,x,y,32*2,32);
		this.image.changeColor('black');
		this.goal_type = type;
		this.parts_id = 2000;
	},
	receive:function(product){
		console.log('受け取ったつもり type = '+ product.type);
		if(product.type==this.goal_type){
			console.log('good!!');
			return 1;
		}else{
			console.log('poor...');
			return -1;
		}
	},
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
});



var Trampoline = Class.create(Terrain, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Terrain.call(this,x,y,32*4,16);
		this.image.changeColor('blue');
		//field
		this.extra_rebound = 1;
		this.parts_id = 1;
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
		this.parts_id = 0;
		//this.image = core.assets['icon1.png'];
		//event hundler
		
	},
	//methods
});



var Conveyor = Class.create(Floor, {
	//constructor
	initialize:function(x,y){
		console.log('I am Conveyor');
		//call super constructor
		Floor.call(this,x,y);
		this.image.changeColor('orange');
		//field
		this.speed = 16*4;
		this.parts_id = 2;
		//this.image = core.assets['icon1.png'];
		//event hundler
		
	},
	//methods
	conflict_upper:function(obj){
		console.log('conveyor:conflict to object on UPPER aspect');
		obj.v_y = 0;
		obj.v_x = this.speed;
	},
});







