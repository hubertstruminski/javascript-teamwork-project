canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;


    var car = {
        x:0,
        y:0,
        vx:0.1,
        vy:0.1,
        draw: function(){
         view = new Image();
         view.src = "../JPG/car.png";
         ctx.drawImage(view,car.x,car.y,50,50);
        }
    };

    function clear(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    function speedUp(){
            clear();
            car.draw();
            car.x+=car.vx;
            car.y+=car.vy;

        raf = window.requestAnimationFrame(draw);
        }

window.addEventListener('keydown', function(e){
        if(e.keyCode==32){
        clear();
        draw();
}

});



car.draw();
//document.body.addEventListener("load", car.draw(),true);


