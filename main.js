enchant();

window.onload = function(){

	//===core===
	var core = new Core(320 , 320);
	core.preload('chara1.png');
	core.preload('icon1.png');
	core.fps = 15;
	
	//===grobal var===
	var score = 0;
	var timeLeft = 5 * core.fps;
	var gravity = 100;
	var selectedTerrain_No = 1;
	
	var physical_obj = [];
	var terrain_obj = [];
	
	core.onload = function(){
		
		

		/*tenplete of Class
		var Class = Class.create(Super, {
			//constructor
			initialize:function(x,y){
				//call super constructor
				Super.call(this,x,y);
				//field
				//event hundler
				core.rootScene.addChild(this);
			},
			//methods
		});
		*/



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
				core.rootScene.addChild(this);
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
				var width = quantitiy*
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
				core.rootScene.addChild(this);
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
								
				this.conflict(obj);
				
				
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



		var MovingTerrain = Class.create(Terrain,{
			initialize:function(x,y,width,height){
				//call super constructor
				Terrain.call(this,x,y,width,height);
			}
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
				core.rootScene.addChild(this);
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
				core.rootScene.addChild(this);
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
				core.rootScene.addChild(this);
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
				core.rootScene.addChild(this);
			},
			//methods
			conflict_upper:function(obj){
				console.log('conveyor:conflict to object on UPPER aspect');
				obj.v_y = 0;
				obj.v_x = speed;
			},
		});



		var Elevator = Class.create(Floor, {
			//constructor
			initialize:function(x,y){
				console.log('I am Elevator');
				//call super constructor
				Floor.call(this,x,y);
				//field
				//this.image = core.assets['icon1.png'];
				this.image.color = 'orange';
				//event hundler
				core.rootScene.addChild(this);
			},
			//methods
			conflict_upper:function(obj){
				console.log('Elevator:conflict to object on UPPER aspect');
				obj.v_y = 0;
				obj.v_x = 10;
			},
			
		});
		
		

		
		//===objects===
		var player = new Player(32*3,32);
		
		physical_obj[0] = player;
			
		var scoreLabel = new Label('Score: 0');
		scoreLabel.x = 200;
		scoreLabel.y = 5;
		
		var timeLabel = new Label('Time: ?');
		timeLabel.x = 5;
		timeLabel.y = 5;
		
		var testLabel = new Label('test: ???');
		testLabel.x = 10;
		testLabel.y = 300;
		
		var testLabel2 = new Label('test: ???');
		testLabel2.x = 100;
		testLabel2.y = 300;
		
		core.rootScene.addChild(timeLabel);
		core.rootScene.addChild(scoreLabel);
		core.rootScene.addChild(testLabel);
		core.rootScene.addChild(testLabel2);
		
		core.rootScene.addChild(timeLabel);
		
		//===Other===
		//keybind
		core.keybind( '1'.charCodeAt(0), 'key_1' );
		core.keybind( '2'.charCodeAt(0), 'key_2' );
		core.keybind( '3'.charCodeAt(0), 'key_3' );
		
		//core&rootScene setup
		core.on('enterframe', function(){
		
			if(core.input.key_1){
				selectedTerrain_No = 1;
				testLabel.text = 'Floor';
			}else if(core.input.key_2){
				selectedTerrain_No = 2;
				testLabel.text = 'Trampoline';
			}else if(core.input.key_3){
				selectedTerrain_No = 3;
				testLabel.text = 'Conveyor';
			}
			
		});
		
		core.rootScene.on('touchstart',function(e){
			switch(selectedTerrain_No){
				case 1:
				puttingTerrain = new Floor(e.x,e.y);
				break;
				
				case 2:
				puttingTerrain = new Trampoline(e.x,e.y);
				break;
				
				case 3:
				puttingTerrain = new Conveyor(e.x,e.y);
				break;
				
				default:
				puttingTerrain = new Floor(e.x,e.y);
				break;
			}
			terrain_obj.push(puttingTerrain);
		});
	}
	
	core.start();
	
};

var rand = function(n){
	return Math.floor(Math.random() * (n+1));
}
