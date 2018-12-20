canvas = document.getElementById("learn");
var ctx = canvas.getContext('2d');
var raf;
var running = false;


    var car = {
        x:100,
        y:100,
        radius:0,
        v:0,
        draw: function(){
         clear();
         view = new Image();
         view.src = "../JPG/car.png";
         ctx.drawImage(view,car.x+car.v*Math.pow((Math.cos(car.radius/360)),2),car.y+car.v*Math.pow((Math.sin(car.radius/360)),2),50,50);
         car.x=car.x+car.v*(Math.cos(car.radius));
         car.y=car.y+car.v*(Math.sin(car.radius));
         if(car.v>0)
            car.v-=0.001;
         else
            car.v+=0.001;
        }
    };

    function clear(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    function speedUp(){
                if(car.v<0)
                    car.v+=0.035;
                else;
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
        if(car.radius<-360)
            car.radius=360;
        //console.log(car.radius);
        //console.log(car.v*(Math.cos(car.radius/360)));

//        ctx.rotate(Math.PI/180);


    }

    function turnRight(){

        car.radius+=0.1;
        if(car.radius>359)
            car.radius=-359;
        console.log(car.radius);
        console.log(car.v*(Math.sin(car.radius/360)));

    }


window.addEventListener('keydown', function(e){

         if(e.keyCode==38){
             speedUp();
//            if(e.keyCode==37){
//                turnLeft(true);
//            }
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


