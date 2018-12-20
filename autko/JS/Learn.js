canvas = document.getElementById("learn");
const ctx = canvas.getContext('2d');
let raf;
const running = false;
const circle = new Path2D();
const brickColumn = 1;
const brickRow = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 52;
const brickOffsetTop = 50;
const brickOffsetLeft = 20;
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
for (let r = 0; r < brickRow; r++) {
    bricks[r] = [];
    for (let c = 0; c < brickColumn; c++) {
        bricks[r][c] = { x: 0, y: 0, status: 1 };
    }
}


function collisionDetection() {
    for (let r = 0; r < brickRow; r++) {
        for (let c = 0; c < brickColumn; c++) {
            let b = bricks[r][c];
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

// function drawBricks() {

//     ctx.beginPath();
//     ctx.rect(20, 40, brickWidth, brickHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

function drawBricks() {
    for (let r = 0; r < brickRow; r++) {
        for (let c = 0; c < brickColumn; c++) {
            if (bricks[r][c].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
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

