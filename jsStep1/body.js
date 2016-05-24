function Body(properties) {
  var position = {
      x: 0,
      y: 0
    },
    velocity = {
      dx: 0,
      dy: 0
    },
    radius, opacity;

  this.createBody = function() {

    position.x = (properties.width/2);
    position.y = (properties.height/2);
    radius = properties.largest;
    opacity = 1;
  };

  this.reset = function() {
    this.createBody();
  };

  this.draw = function(con) {

    con.beginPath();

    con.fillStyle = 'rgba(226,225,142,' + opacity + ')';
    con.shadowColor = 'rgba(226,225,142,1)';
    con.arc(position.x - radius, position.y - radius, radius, 0, 2 * Math.PI, false);

    con.shadowOffsetX = 0;
    con.shadowOffsetY = 0;
    con.shadowBlur = 10;
    con.fill();

    con.closePath();
  };

  this.move = function() {

  };

  this.getX = function() {
    return position.x;
  }
  this.getY = function() {
    return position.y;
  }
  this.getR = function() {
    return radius;
  }

  this.reset();
};
