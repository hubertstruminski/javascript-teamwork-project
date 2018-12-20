var myGamePiece;

function startGame() {
    myGamePiece = new Component(150, 150);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    createBoard: function () {
        //outside line
        this.context.beginPath();
        this.context.moveTo(100, 100);
        this.context.lineTo(1000, 100);
        this.context.strokeStyle = "black";
        this.context.arc(1150, 200, 100, 1.5 * Math.PI, 0 * Math.PI);
        this.context.lineTo(1250, 300);
        this.context.lineTo(1400, 500);
        this.context.lineTo(1400, 700);
        this.context.lineTo(900, 700);
        this.context.lineTo(750, 500);
        this.context.lineTo(500, 500);
        this.context.lineTo(350, 700);
        this.context.lineTo(250, 700);
        this.context.arc(200, 600, 100, 0.5 * Math.PI, 1 * Math.PI);
        this.context.closePath();
        this.context.lineWidth = 5;
        this.context.fillStyle = "#9d9ea0";
        this.context.fill();
        this.context.stroke();

        //insideline
        this.context.beginPath();
        this.context.moveTo(200, 200);
        this.context.lineTo(850, 200);
        this.context.arc(1000, 300, 100, 1.5 * Math.PI, 0 * Math.PI);
        this.context.lineTo(1250, 500);
        this.context.lineTo(1250, 550);
        this.context.arc(1200, 550, 50, 0 * Math.PI, 0.5 * Math.PI);
        this.context.lineTo(1000, 600);
        this.context.lineTo(850, 400);
        this.context.lineTo(425, 400);
        this.context.lineTo(275, 575);
        this.context.lineTo(250, 575);
        this.context.arc(250, 525, 50, 0.5 * Math.PI, 1 * Math.PI);
        this.context.closePath();
        this.context.lineWidth = 5;
        this.context.fillStyle = "green";
        this.context.fill();
        this.context.stroke();
    }

}

function Component(x, y) {
    this.animate = function () {
        if (x > 250) requestAnimationFrame(this.animate.bind(this))
    }
}

function updateGameArea() {
    myGameArea.createBoard();
    myGamePiece.animate();
}