canvas = document.getElementById("learn");
const ctx = canvas.getContext('2d');
let raf;
const running = false;
const circle = new Path2D();
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const gameOverNotify = document.querySelector('.game-over-notify');
let interval;
let counter = 0;

let car = {
    x: 0,
    y: 0,
    radius: 0,
    v: 0,
    draw: function () {
        clear();
        view = new Image();
        view.src = "../JPG/car.png";
        ctx.drawImage(view, car.x + car.v * Math.pow((Math.cos(car.radius / 360)), 2), car.y + car.v * Math.pow((Math.sin(car.radius / 360)), 2), 50, 50);
        car.x = car.x + car.v * (Math.cos(car.radius));
        car.y = car.y + car.v * (Math.sin(car.radius));
        drawBricks();
        collisionDetection();
        if (car.v > 0) {
            car.v -= 0.001;
        }
        else {
            car.v += 0.001;
        }


    }
};

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function speedUp() {
    if (car.v < 0) {
        car.v += 0.035;
    }
    else {
        car.v += 0.02;
    }
}
function speedDown() {
    if (car.v > 0) {
        car.v -= 0.035;
    }
    else {
        car.v -= 0.02;
    }


}
function turnLeft() {
    car.radius -= 0.1;
    if (car.radius < -360) {
        car.radius = 360;
    }

}

function turnRight() {
    car.radius += 0.1;
    if (car.radius > 359) {
        car.radius = -359;
    }
}


window.addEventListener('keydown', function (e) {

    if (e.keyCode == 38) {
        speedUp();
    }
    if (e.keyCode == 40) {
        speedDown();
    }
    if (e.keyCode == 37) {
        turnLeft();
    }

    if (e.keyCode == 39) {
        turnRight();
    }
}, false);



canvas.addEventListener('mousemove', function (e) {
    if (!running) {
        clear();
        car.x = e.clientX;
        car.y = e.clientY;
        car.draw();
    }
});


const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (car.x > b.x && car.x < b.x + brickWidth && car.y > b.y && car.y < b.y + brickHeight) {
                    b.status = 0;
                    counter++;
                    console.log(counter);
                }
            }
        }
    }
}


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
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


setInterval(car.draw, 10);


car.draw();

//document.body.addEventListener("load", car.draw(),true);

