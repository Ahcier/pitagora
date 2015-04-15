enchant();



var StageData = function(){
	this.physical_obj = [];
	this.terrain_obj = [];
	this.wire_obj = [];
}



//==========stage1==========
/*
  var stageData1 = new StageData();
  stageData1.physical_obj.push();
  stageData1.terrain_obj.push();
  stageData1.wire_obj.push();
*/

var player = new Player(32*3,32);

physical_obj[0] = player;
physical_obj[1] = new Player(32*3,-100);
physical_obj[2] = new Player(32*3,-200);

var td = new Trapdoor(200,100);
var sens = new Sensor(100,50);
var wire = sens.connectWire(td);


var stageData1 = new StageData();
//stageData1.physical_obj.push();
stageData1.terrain_obj.push(td);
stageData1.terrain_obj.push(sens);
stageData1.wire_obj.push(wire);
