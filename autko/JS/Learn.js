canvas = document.getElementById("learn");
const ctx = canvas.getContext('2d');
let raf;
let speed;
const running = false;
const circle = new Path2D();
const brickColumn = 1;
const brickRow = 10;
const brickWidth = 30;
const brickHeight = 30;
let interval;
let counter = 0;
let lap = 1;
let d = 0;
let d2 = 0;
let lapsAreLowerThanFive = true;

ctx.font = "30px Arial";
ctx.fillStyle = "red";

let car = {
    x: 264,
    y: 140,
    radius: 0,
    v: 0,
    carHight: 50,
    carWidth: 50,
    draw: function () {
        clear();
        colisionMap();
        view = new Image();
        if (car.radius < Math.PI / 4 && car.radius >= 0 || car.radius > (7 * Math.PI) / 4) {
            view.src = "../JPG/car.png";
        }
        else if (car.radius < (3 * Math.PI) / 4 && car.radius > (Math.PI) / 4) {
            view.src = "../JPG/carDown.png";
        }
        else if (car.radius < (5 * Math.PI) / 4 && car.radius > (3 * Math.PI) / 4) {
            view.src = "../JPG/carLeft.png";
        }
        else if (car.radius < (7 * Math.PI) / 4 && car.radius > (5 * Math.PI) / 4) {
            view.src = "../JPG/carUp.png";
        }
        ctx.drawImage(view, car.x + car.v * Math.pow((Math.cos(car.radius / 360)), 2), car.y + car.v * Math.pow((Math.sin(car.radius / 360)), 2), car.carHight, car.carWidth);
        car.x = car.x + car.v * (Math.cos(car.radius));
        car.y = car.y + car.v * (Math.sin(car.radius));
        drawBricks();
        collisionDetection();
        if (car.v > 0) {
            car.v -= 0.002;
        }
        else {
            car.v += 0.002;
        }


    }
};

function showSpeed() {
    speed = car.v;
    ctx.fillText("SPEED: " + Math.round(speed * 35) + " KM/H", canvas.width - 280, 50);
    ctx.fillText("LAP: "+lap+"/5", canvas.width - 280, 100);
    if(counter<5 && counter>=1){
    ctx.fillText("TIME: "+(d2-d)/1000+"s",canvas.width - 280,150);
        d2 = Math.round(performance.now());
    }
}

function endGame(){

    if(counter>=5){
        window.removeEventListener('keydown', keyIsDown,false );
        ctx.fillText("TIME: "+(d2-d)/1000+"s",600,450);
    }


}

function refresh() {
    car.draw();
    showSpeed();
    endGame();

}

function colisionMap() {
    if (car.x < 0) {
        car.v = 0;
        car.x = 1;
    }
    if (car.y < 0) {
        car.v = 0;
        car.y = 1;
    }
        if (car.x > canvas.width - car.carWidth) {
            car.v = 0;
            car.x = canvas.width - car.carWidth - 1;
        }
    if (car.y > canvas.height - car.carHight) {
        car.v = 0;
        car.y = canvas.height - car.carHight - 1;
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function speedUp() {
    if (car.v < 0) {
        car.v += 0.12;
    }
    else {
        car.v += 0.04;
    }
}
function speedDown() {
    if (car.v > 0) {
        car.v -= 0.07;
    }
    else {
        car.v -= 0.02;
    }


}
function turnLeft() {
    car.radius -= 0.1;
    if (car.radius < 0) {
        car.radius = 2 * Math.PI;

    }

}

function turnRight() {
    car.radius += 0.1;
    if (car.radius > 2 * Math.PI) {
        car.radius = 0;
    }
}


window.addEventListener('keydown', keyIsDown,false );

function keyIsDown(e){
    if (e.keyCode == 32){
        d = Math.round(performance.now());
    }

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
}



// canvas.addEventListener('mousemove', function (e) {
//     if (!running) {
//         clear();
//         car.x = e.clientX;
//         car.y = e.clientY;
//         car.draw();
//     }
// });


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
                if (car.x + car.carWidth > b.x && car.x < b.x + brickWidth && car.y + car.carHight > b.y && car.y < b.y + brickHeight) {
                    b.status = 0;
                    counter++;
                    if (counter % 9 == 0) {
                        lap++
                     //   console.log(lap);
                    }
                     //console.log(counter);

                }
            }
            if (counter % 9 == 0) {
                b.status = 1;

            }
        }
    }
}
function fillBricks(brickX, brickY, r, c) {
    view = new Image();
    view.src = "../JPG/santaHat.png";
    ctx.drawImage(view, brickX, brickY, brickHeight, brickWidth);
    bricks[r][c].x = brickX;
    bricks[r][c].y = brickY;
}


function drawBricks() {
    for (let r = 0; r < brickRow; r++) {
        for (let c = 0; c < brickColumn; c++) {
            if (bricks[r][c].status == 1) {
                if (r == 0) {
                    let brickX = 133;
                    let brickY = 150;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 1) {
                    let brickX = 600;
                    let brickY = 144;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 2) {
                    let brickX = 1000;
                    let brickY = 250;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 3) {
                    let brickX = 1140;
                    let brickY = 565;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 4) {
                    let brickX = 1000;
                    let brickY = 704;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 5) {
                    let brickX = 722;
                    let brickY = 600;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 6) {
                    let brickX = 427;
                    let brickY = 485;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 7) {
                    let brickX = 256;
                    let brickY = 685;
                    fillBricks(brickX, brickY, r, c);
                }
                if (r == 8) {
                    let brickX = 110;
                    let brickY = 425;
                    fillBricks(brickX, brickY, r, c);
                }

            }
        }
    }
}


setInterval(refresh, 10);


car.draw();
ctx.font = "30px Arial";

//document.body.addEventListener("load", car.draw(),true);
