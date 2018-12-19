canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;
var circle = new Path2D();

var car = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    draw: function () {
        view = new Image();
        view.src = "../JPG/car.png";
        ctx.drawImage(view, car.x, car.y, 50, 50);
        drawCheckpoints();
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                gameOverNotify.style.display = 'flex';
                clearInterval(interval);
                return;
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }
};

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCheckpoints() {
    circle.arc(100, 35, 5, 0, 2 * Math.PI);
    circle.arc(200, 35, 5, 0, 2 * Math.PI);
    circle.arc(300, 35, 5, 0, 2 * Math.PI);
    circle.arc(400, 35, 5, 0, 2 * Math.PI);
    circle.arc(500, 35, 5, 0, 2 * Math.PI);
    ctx.fill(circle);
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
        console.log("car x " + car.x + "car y " + car.y);

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
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var gameOverNotify = document.querySelector('.game-over-notify');
var interval;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
gameOverNotify.addEventListener("click", function () {
    document.location.reload();
});

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (car.x > b.x && car.x < b.x + brickWidth && car.y > b.y && car.y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
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

