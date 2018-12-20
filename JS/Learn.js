canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;


    var car = {
        x:100,
        y:100,
        radius:0,
        v:0,
        carHight:50,
        carWidth:50,
        draw: function(){
         clear();
        colisionMap();
         view = new Image();
        if(car.radius<Math.PI/4 && car.radius>=0 || car.radius>(7*Math.PI)/4 ) {
            view.src = "../JPG/car.png";
         }
         else if(car.radius<(3*Math.PI)/4 && car.radius>(Math.PI)/4){
            view.src = "../JPG/carDown.png";
         }
         else if(car.radius<(5*Math.PI)/4 && car.radius>(3*Math.PI)/4){
            view.src = "../JPG/carLeft.png";
         }
         else if(car.radius<(7*Math.PI)/4 && car.radius>(5*Math.PI)/4){
            view.src = "../JPG/carUp.png";
         }
         ctx.drawImage(view,car.x+car.v*Math.pow((Math.cos(car.radius/360)),2),car.y+car.v*Math.pow((Math.sin(car.radius/360)),2),car.carHight,car.carWidth);
         car.x=car.x+car.v*(Math.cos(car.radius));
         car.y=car.y+car.v*(Math.sin(car.radius));
         if(car.v>0)
            car.v-=0.001;
         else
            car.v+=0.001;
        }
    };

    function colisionMap(){
        if (car.x<0){
            car.v=0;
            car.x=1;
        }
        if (car.y<0){
            car.v=0;
            car.y=1;
        }
        if(car.x>canvas.width-car.carWidth){
            car.v=0;
            car.x=canvas.width-car.carWidth-1;
        }
        if(car.y>canvas.height-car.carHight){
            car.v=0;
            car.y=canvas.height-car.carHight-1;
        }
        console.log(car.x);
        console.log(canvas.width);
        console.log();
        console.log(car.y);
    }

    function clear(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    function speedUp(){
                if(car.v<0)
                    car.v+=0.035;
                else
                    car.v+=0.02;
     }
    function speedDown(){


            if(car.v>0)
                car.v-=0.035;
            else
                car.v-=0.02;



    }
// ctx.translate(car.x,car.y);
    function turnLeft(){

        car.radius-=0.1;
        if(car.radius<0)
            car.radius=2*Math.PI;
        console.log(car.radius);


    }

    function turnRight(){

        car.radius+=0.1;
        if(car.radius>2*Math.PI)
            car.radius=0;
        console.log(car.radius);

    }


window.addEventListener('keydown', function(e){

     if(e.keyCode==38){
         speedUp();

     }
     if(e.keyCode==40){
         speedDown();

     }
     if(e.keyCode==37){
         turnLeft();


     }

     if(e.keyCode==39){
         turnRight();
     }
     },false);






setInterval(car.draw,10);


car.draw();
//document.body.addEventListener("load", car.draw(),true);


