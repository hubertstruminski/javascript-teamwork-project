canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;
var circle = new Path2D();
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var gameOverNotify = document.querySelector('.game-over-notify');
var interval;

var car = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    draw: function () {
        view = new Image();
        view.src = "../JPG/car.png";
        ctx.drawImage(view, car.x, car.y, 50, 50);
        drawBricks();
        collisionDetection();

    }
};

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();
    car.draw();
    car.x += car.vx;
    car.y += car.vy;
    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function (e) {
    if (!running) {
        clear();
        car.x = e.clientX;
        car.y = e.clientY;
        car.draw();
        // console.log("car x " + car.x + "car y " + car.y);

    }
});
canvas.addEventListener('click', function (e) {
    if (!running) {
        clear();
        car.x = 100;
        car.y = 35;
        car.draw();

    }
});


var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (car.x > b.x && car.x < b.x + brickWidth && car.y > b.y && car.y < b.y + brickHeight) {
                    b.status = 0;
                }
            }
        }
    }
}


function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



// interval = setInterval(draw, 1000);

car.draw();
//document.body.addEventListener("load", car.draw(),true);

