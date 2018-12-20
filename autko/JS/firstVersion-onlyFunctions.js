window.onload = function () {
    drawRoad();

}


function drawRoad() {
    var canvas = document.getElementById("game");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    var carX = 150;
    var carY = 150;

    var ctx = canvas.getContext("2d");

    //outside line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(1000, 100);
    ctx.strokeStyle = "red";
    ctx.arc(1150, 200, 100, 1.5 * Math.PI, 0 * Math.PI);
    ctx.lineTo(1250, 300);
    ctx.lineTo(1400, 500);
    ctx.lineTo(1400, 700);
    ctx.lineTo(900, 700);
    ctx.lineTo(750, 500);
    ctx.lineTo(500, 500);
    ctx.lineTo(350, 700);
    ctx.lineTo(250, 700);
    ctx.arc(200, 600, 100, 0.5 * Math.PI, 1 * Math.PI);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = "#9d9ea0";
    ctx.fill();
    ctx.stroke();

    //insideline
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(850, 200);
    ctx.arc(1000, 300, 100, 1.5 * Math.PI, 0 * Math.PI);
    ctx.lineTo(1250, 500);
    ctx.lineTo(1250, 550);
    ctx.arc(1200, 550, 50, 0 * Math.PI, 0.5 * Math.PI);
    ctx.lineTo(1000, 600);
    ctx.lineTo(850, 400);
    ctx.lineTo(425, 400);
    ctx.lineTo(275, 575);
    ctx.lineTo(250, 575);
    ctx.arc(250, 525, 50, 0.5 * Math.PI, 1 * Math.PI);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();

    // var img = document.getElementById("tribune");
    img1 = new Image();
    img1.src = "../JPG/trybuna.png";
    img1.addEventListener("load", function () {
        ctx.drawImage(img1, 485, 350);
    }, false);

    img2 = new Image();
    img2.src = "../JPG/tree.png";
    img2.addEventListener("load", function () {
        ctx.drawImage(img2, window.innerWidth - 125, window.innerHeight - 150);
    }, false);

    img3 = new Image();
    img3.src = "../JPG/treeSet.png";
    img3.addEventListener("load", function () {
        ctx.drawImage(img3, window.innerWidth - 250, window.innerHeight - 600);
    }, false);

    img4 = new Image();
    img4.src = "../JPG/treeSet.png";
    img4.addEventListener("load", function () {
        ctx.drawImage(img4, window.innerWidth - 1000, window.innerHeight - 200);
    }, false);

    img5 = new Image();
    img5.src = "../JPG/emptyTree.png";
    img5.addEventListener("load", function () {
        ctx.drawImage(img5, window.innerWidth - 150, window.innerHeight - 450);
    }, false);

    img6 = new Image();
    img6.src = "../JPG/tree.png";
    img6.addEventListener("load", function () {
        ctx.drawImage(img6, 200, window.innerHeight - 350);
    }, false);

    img7 = new Image();
    img7.src = "../JPG/krzew.png";
    img7.addEventListener("load", function () {
        ctx.drawImage(img7, window.innerWidth - 550, window.innerHeight - 200);
    }, false);
}