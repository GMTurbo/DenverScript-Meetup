
(function(){

  //setup some constants
  var WIDTH
    , HEIGHT
    , canvas //the canvas element
    , con //the canvas context
    , totalBodies //total number of bodies in the system
    , body = []; //bodies array

  var MAX_DISTANCE = 100 //maximum distance for connection
    , SPEED = 0.8 // maximum speed we will move through the system
    , DENSITY = .1 //how many stars we want to distribute in the system
    , SMALLEST_SIZE = 4 //smallest sized body
    , LARGEST_SIZE = 8; //largest sized body

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  $(document).ready(function(){

    //setup the system
    setup();

    //handle resizing of window
    $( window ).resize(function() {
      WIDTH = $('#space').width();
      $(canvas).attr('width', WIDTH).attr('height',WIDTH);
      totalBodies = WIDTH * DENSITY;
    });


  });

  function setup() {
    WIDTH = $('#space').width();
    HEIGHT = $('#space').height();

    canvas = document.getElementById('space-content');
    $(canvas).attr('width', WIDTH).attr('height',HEIGHT);

    con = canvas.getContext('2d');

    totalBodies = WIDTH * DENSITY;
    for(var i = 0; i < totalBodies; i++) {
      body[i] = new Body({
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
    con.clearRect(0,0,WIDTH,HEIGHT);

    //for each body in the system
    for(var i = 0; i < body.length; i++) {
      body[i].move(); //update it's position
      body[i].draw(con); // draw it

      // for(var j = 0 ; j < body.length; j++){
      //   if(j===i) continue;
      //   var dis = Helper.getDistance(body[i], body[j]);
      //   if(dis <= MAX_DISTANCE)
      //     connect(body[i], body[j], 1-dis/MAX_DISTANCE);
      // }

    }

    window.requestAnimationFrame(draw);
  };

  // var connect = function(bug1, bug2, opacity){
  //
  //   con.beginPath();
  //
  //   con.lineWidth = 1;
  //   con.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
  //   con.moveTo(bug1.getX() - bug1.getR(), bug1.getY() - bug1.getR());
  //   con.lineTo(bug2.getX() - bug2.getR(), bug2.getY() - bug2.getR());
  //   con.stroke();
  //
  //   con.closePath();
  // };
})();
