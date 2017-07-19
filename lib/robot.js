'use strict';

function Robot() {
  this.directions = ['north', 'east', 'south', 'west']
}

Robot.prototype.orient = function orient(bearing){
  if (this.directions.includes(bearing)){
    this.bearing = bearing
  } else {
    throw new Error("Invalid Robot Bearing")
  };
};

Robot.prototype.turnRight = function turnRight(){
  var newIndex = this.directions.indexOf(this.bearing)
  if (newIndex === 3) {
    return this.bearing = this.directions[0]
  } else {
    return this.bearing = this.directions[newIndex + 1]
  }
};

Robot.prototype.turnLeft = function turnLeft(){
  var newIndex = this.directions.indexOf(this.bearing)
  if (newIndex === 0) {
    return this.bearing = this.directions[this.directions.length - 1]
  } else {
    return this.bearing = this.directions[newIndex - 1]
  }
}

Robot.prototype.at = function at(x, y){
  this.coordinates = [x, y]
}

Robot.prototype.advance = function advance(){
  if(this.bearing == 'north'){
    this.coordinates[1] += 1
  }
  else if(this.bearing == 'east'){
    this.coordinates[0] += 1
  }
  else if(this.bearing == 'south'){
    this.coordinates[1] -= 1
  }
  else if(this.bearing == 'west'){
    this.coordinates[0] -= 1
  }
}

Robot.prototype.instructions = function instructions(commandString){
  var commands = commandString.split("");
  // debugger
  return commands.map(function(command) {
    if(command == "L"){
      // debugger
      return "turnLeft";
    }
    else if(command == "R"){
      return "turnRight";
    }
    else if(command == "A"){
      return "advance";
    }
  });
}

//problemas!!!
Robot.prototype.place = function place(placeHash){
  this.bearing = placeHash["direction"]
  this.at(placeHash["x"], placeHash["y"])
}

Robot.prototype.evaluate = function evaluate(directions){
  var instructions = this.instructions(directions)
  instructions.forEach(function(command){
    this[command]()
  }.bind(this))
}
