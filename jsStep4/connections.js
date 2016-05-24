(function() {

  //setup some constants
  var WIDTH, HEIGHT, canvas //the canvas element
    , con //the canvas context
    , totalBodies //total number of bodies in the system
    , body = [] //bodies array
    ,
    connectionMap = {}; //store already calculated connections

  var MAX_DISTANCE = 70 //maximum distance for connection
    , SPEED = 1.8 // maximum speed we will move through the system
    , DENSITY = .2 //how many stars we want to distribute in the system
    , SMALLEST_SIZE = 4 //smallest sized body
    , LARGEST_SIZE = 8; //largest sized body

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  $(document).ready(function() {

    //setup the system
    setup();

    //handle resizing of window
    $(window).resize(function() {
      WIDTH = $('#space').width();
      $(canvas).attr('width', WIDTH).attr('height', WIDTH);
      totalBodies = WIDTH * DENSITY;
    });


  });

  function setup() {
    WIDTH = $('#space').width();
    HEIGHT = $('#space').height();

    canvas = document.getElementById('space-content');
    $(canvas).attr('width', WIDTH).attr('height', HEIGHT);

    con = canvas.getContext('2d');

    totalBodies = WIDTH * DENSITY;
    for (var i = 0; i < totalBodies; i++) {
      body[i] = new Body({
        id: i,
        width: WIDTH,
        height: HEIGHT,
        smallest: SMALLEST_SIZE,
        largest: LARGEST_SIZE,
        speed: SPEED
      });
    }

    draw();
  }

  function draw() {

    //clear the context
    con.clearRect(0, 0, WIDTH, HEIGHT);
    connectionMap = {}
      //for each body in the system
    for (var i = 0; i < body.length; i++) {
      body[i].move(); //update it's position
      body[i].draw(con); // draw it

      for (var j = 0; j < body.length; j++) {
        if (j === i || alreadyDrawn(body[i].getId(), body[j].getId()))
          continue;
        var dis = Helper.getDistance(body[i], body[j]);
        if (dis <= MAX_DISTANCE)
          drawConnection(body[i], body[j], 1 - dis / MAX_DISTANCE);
      }

    }

    window.requestAnimationFrame(draw);
  };

  function alreadyDrawn(id1, id2) {
    if (typeof connectionMap[id1] !== "undefined") {
      var arr = connectionMap[id1];
      var found = arr.filter(function(id) {
        return id === id2;
      });
      if (found.length > 0)
        return true;
    }
    return false;
  }

  function drawConnection(body1, body2, opacity) {

    //Save the connections we've made so we don't redraw them
    saveConnection(body1.getId(), body2.getId())

    con.beginPath();

    con.lineWidth = 1;
    con.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
    con.moveTo(body1.getX() - body1.getR(), body1.getY() - body1.getR());
    con.lineTo(body2.getX() - body2.getR(), body2.getY() - body2.getR());
    con.stroke();

    con.closePath();
  };

  function saveConnection(id1, id2){
    if (typeof connectionMap[id1] === "undefined") {
      connectionMap[id1] = [];
    }
    if (typeof connectionMap[id2] === "undefined") {
      connectionMap[id2] = [];
    }

    connectionMap[id1].push(id2);
    connectionMap[id2].push(id1);
  }
})();
