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

        position.x = (properties.width * Math.random()); //create a random x coordinate
        position.y = (properties.height * Math.random()); //create a random y coordinate
        radius = Helper.getRandomInsideOf(properties.smallest, properties.largest); //create a random sized

        velocity.dx = properties.speed;
        velocity.dy = properties.speed;

        // randomize speed and direction
        // velocity.dx = (Math.random() > 0.5 ? -1 : 1) * Math.random() * properties.speed;
        // velocity.dy = (Math.random() > 0.5 ? -1 : 1) * Math.random() * properties.speed;

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
        position.x += velocity.dx;
        position.y += velocity.dy;
        if (position.x > properties.width || position.x < 0)
            velocity.dx *= -1;
        if (position.y > properties.height || position.y < 0)
            velocity.dy *= -1;
    };

    this.getX = function() {
        return position.x;
    };

    this.getY = function() {
        return position.y;
    };

    this.getR = function() {
        return radius;
    };

    this.reset();
};
