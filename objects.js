enchant();

var Surface0 = Class.create(Surface,{
	//constructor
	initialize:function(sprite){
		//call super constructor
		Surface.call(this,sprite.width,sprite.height);
		//this.changeColor('white');
		//this.drawEdge('white');
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
		//event hundler
	},
	//methods
	distance: function(other){
		var center_x = this.x + this.width/2;
		var center_y = this.y + this.height/2;
		var other_center_x = other.x + other.width/2;
		var other_center_y = other.y + other.height/2;
		
		distance = Math.sqrt(Math.pow(other_center_x - center_x,2) + Math.pow(other_center_y - center_y,2))
		return Math.round(distance);
	},
	arc_deg: function(other){
		var center_x = this.x + this.width/2;
		var center_y = this.y + this.height/2;
		var other_center_x = other.x + other.width/2;
		var other_center_y = other.y + other.height/2;
		
		var X = other_center_x - center_x;
		var Y = other_center_y - center_y;
		var tan = Y/X;
		var deg = Math.atan(tan)/(Math.PI/180);
		return Math.round(deg);
	},
	getCenter:function(){
		var center_x = this.x + this.width/2;
		var center_y = this.y + this.height/2;
		var center_array = [center_x,center_y];
		return center_array;
	},
});



var Physical = Class.create(Sprite2, {
	initialize: function(x,y,width,height){
		//call super constructor
		Sprite2.call(this,width,height);
		//constructor
		this.image.changeColor('yellow');
		this.image.drawEdge('orange');
		//field
		this.v_x = 0;
		this.v_y = 0;
		this.a_x = 0;
		this.a_y = 0 + gravity;
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
			this.v_x += this.a_x/core.fps; 
			this.v_y += this.a_y/core.fps; 
			this.x += this.v_x/core.fps; 
			this.y += this.v_y/core.fps; 
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
	physicalState: function(){
		console.log('x: '+ this.x);
		console.log('y: '+ this.y);
		console.log('v_x: '+ this.v_x);
		console.log('v_y: '+ this.v_y);
		console.log('a_x: '+ this.a_x);
		console.log('a_y: '+ this.a_y);
	}
});



var Liquid = Class.create(Physical,{
	initialize:function(quantity){
		var width = quantitiy*1;
		Physical.call(this,width,height);
	}
});



var Terrain = Class.create(Sprite2, {
	//constructor
	initialize: function(x,y,width,height){
		//call super constructor
		Sprite2.call(this,width,height);
		//field
		this.x = x;
		this.y = y;
		//event hundler
		this.on('enterframe',function(){
			for(var i=0;i<physical_obj.length;i++){
				if(this.intersect(physical_obj[i])){
					this.image.drawEdge('red');
					obj = physical_obj[i];
					this.touch_onBorder(obj);
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
});



var gimicTerrain = Class.create(Terrain,{
	initialize:function(x,y,width,height){
		//call super constructor
		Terrain.call(this,x,y,width,height);
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
		
	},
	powerOn_event:function(){
		this.disappear*=-1;
		if(this.disappear>0){	
			this.opacity = 0.5;
			this.touchEnabled = false;
		}else{
			this.opacity = 1;
			this.touchEnabled = true;
		}
	},
});


/*
  var Elevator = Class.create(gimicTerrain, {
  //constructor
  initialize:function(x,y){
  console.log('I am Elevator');
  //call super constructor
  gimicTerrain.call(this,x,y);
  //field
  this.image.color = 'orange';
  this.v_x = 0;
  this.v_y = 0;
  //event hundler
  
  },
  //methods
  slide:function(after_x,after_y,speed){
  var a = after_x + after_y;
  if(this.x != after_x&&this.y != after_y){
  this.v_x = speed * (after_x-this.x)/a;
  this.v_y = speed * (after_y-this.y)/a;
  }
  },
  running:function(){
  this.x += this.v_x / core.fps;
  this.y += this.v_y / core.fps;
  }
  });
*/


var Sensor = Class.create(Sprite2,{
	initialize:function(x,y){
		Sprite2.call(this,16,16);
		this.x = x;
		this.y = y;
		this.image.changeColor('red');
		this.capture = -1;
		this.wires = [];
		this.on('enterframe',function(){
			this.search();
			this.send(this.capture);
		});
		
		
	},
	
	search:function(){
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
		//console.log('generate new wire...');
		var wire = new Wire(this,dist);
		//console.log('sensor:wire connected');
		this.wires.push(wire);

		return wire;
	},
	
	send:function(value){
		//console.log('sensor: send ' + value);
		for(var i=0;i<this.wires.length;i++){
			var wire = this.wires[i];
			wire.transmit(value);
		}
	},
});



var Wire = Class.create(Sprite2,{
	
	initialize:function(source,dist){
		//console.log('wire: initialized');
		this.dist = dist;
		this.source = source;
		this.source_x = source.getCenter()[0];
		this.source_y = source.getCenter()[1];
		this.dist_x = dist.getCenter()[0];
		this.dist_y = dist.getCenter()[1];
		Sprite2.call(this,
					 this.dist_x-this.source_x,
					 this.dist_y-this.source_y);
		this.x = this.source_x;
		this.y = this.source_y;
		this.drawWire('black');
		
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
		this.image.drawLine(
			0,0,
			this.width,this.height,
			color);
		//this.image.drawEdge('color');
		console.log('draw wire');
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
			if(core.input.up){
				this.junp();
			};
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



var Trampoline = Class.create(Terrain, {
	//constructor
	initialize:function(x,y){
		//call super constructor
		Terrain.call(this,x,y,16*4,16);
		this.image.changeColor('blue');
		//field
		this.extra_rebound = 1;
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
		Terrain.call(this,x,y,16*4,16);
		this.image.changeColor('yellow');
		//field
		this.color = 'gray';
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
		this.speed = 10;
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
