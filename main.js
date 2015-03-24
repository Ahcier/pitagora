enchant();

window.onload = function(){

	var core = new Core(320 , 320);
	core.preload('chara1.png');
	core.preload('icon1.png');
	core.fps = 15;
	
	var score = 0;
	var timeLeft = 5 * core.fps;
	var gravity = 100;
	
	core.onload = function(){
		
		var Physical = Class.create(Sprite, {
			initialize: function(x,y,width,height){
				Sprite.call(this,width,height);
				var v_x = 0;
				var v_y = 0;
				var a_x = 0;
				var a_y = 0 + gravity;
				this.x = x;
				this.y = y;
				this.on('enterframe',function(){
					v_x += a_x/core.fps; 
					v_y += a_y/core.fps; 
					this.x += v_x/core.fps; 
					this.y += v_y/core.fps; 
				});
				core.rootScene.addChild(this);
			}
		});
		
		var Ball = Class.create(Physical, {
			initialize:function(x,y){
				Physical.call(this,x,y,16,16);
				this.image = core.assets['icon1.png'];
				this.on('enterframe',function(){
						for(var i=0;i<trampolines.length;i++){
							if(this.intersect(trampolines[i])){
								testLabel.text = 'HIT!!';
								this.v_y = 
							}
						}
				});
				core.rootScene.addChild(this);
			}
		});
		var ball = new Ball(100,30);
		
		/*
		var Ball = Class.create(Sprite, {
			initialize:function(x,y){
				var acceleration_y = 0;
				Sprite.call(this,16,16);
				this.x = x;
				this.y = y;
				this.image = core.assets['icon1.png'];
				this.on('enterframe',function(){
						acceleration_y += 10/core.fps;
						this.y += acceleration_y;
						for(var i=0;i<trampolines.length;i++){
							if(this.intersect(trampolines[i])){
								//testLabel.text = 'HIT!!';
								
							}
						}
				});
				core.rootScene.addChild(this);
			}
		});
		var ball = new Ball(50,50);
		*/
		
		var Trampoline = Class.create(Sprite, {
			initialize:function(x,y){
				Sprite.call(this,16*4,16);
				this.x = x;
				this.y = y;
				this.image = core.assets['icon1.png'];
				core.rootScene.addChild(this);
			}
		});
		var trampolines = [];
		//var trampoline = new Trampoline(50,50);
		
		var Player = Class.create(Sprite,{
			initialize: function(x,y){
				Sprite.call(this,32,32);
				this.x = x;
				this.y = y;
				this.image = core.assets['chara1.png'];
				core.rootScene.addChild(this);
			}	
		});
		var player = new Player(32,32);
		
		var bear = new Sprite(32,32);
		bear.x = rand(320);
		bear.y = rand(320);
		bear.frame = 0;
		bear.image = core.assets['chara1.png'];
		
		bear.on('touchstart',function(){
			score++;
			scoreLabel.text = 'Score: ' + score;
			this.x = rand(320);
			this.y = rand(320);
		});
		
		var scoreLabel = new Label('Score: 0');
		scoreLabel.x = 200;
		scoreLabel.y = 5;
		
		var timeLabel = new Label('Time: ?');
		timeLabel.x = 5;
		timeLabel.y = 5;
		
		var testLabel = new Label('test: ???');
		scoreLabel.x = 200;
		scoreLabel.y = 300;
		
		core.on('enterframe', function(){
			timeLeft--;
			timeLabel.text = 'Time: ' + timeLeft;
			if(timeLeft <= 0){
				alert('Your score : ' + score);
				this.stop();
			}
		});
		
		core.rootScene.on('touchstart',function(e){
			trampoline = new Trampoline(e.x,e.y);
			trampolines.push(trampoline);
		});
		
		core.rootScene.addChild(player);
		core.rootScene.addChild(timeLabel);
		core.rootScene.addChild(scoreLabel);
		core.rootScene.addChild(testLabel);
	}
	
	core.start();
	
};

var rand = function(n){
	return Math.floor(Math.random() * (n+1));
}