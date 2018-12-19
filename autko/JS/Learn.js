canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;


var car = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    draw: function () {
        view = new Image();
        view.src = "../JPG/car.png";
        ctx.drawImage(view, car.x, car.y, 50, 50);
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

    }
});



car.draw();
//document.body.addEventListener("load", car.draw(),true);


