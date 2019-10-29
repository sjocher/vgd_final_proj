var sketchProc=function(processingInstance){ with (processingInstance) {
    size(800, 600);
    frameRate(60);

    var state = "opening";

    var a = random(1500);
    var mountains = [[],[],[]];
    var b=random(1500);
    for (var i=0; i<=2; i++) {
        for (var j=0; j<=80; j++) {
            var n = noise(b);
            mountains[i][j] = map(n,0,1,0,400-i*50);
            b += 0.05;  // ruggedness
        }
    }

    var drawSky = function(ymin){
        background(3, 102, 242);
        noStroke();

        // sky
        var n1 = a;
        for (var x = 0; x <= 800; x += 8) {
            var n2 = 0;
            for (var y = 0; y <= ymin; y += 8) {
                var c = map(noise(n1, n2), 0, 1, 0, 255);
                fill(c, c, c , 150);
                rect(x, y, 8, 8);
                n2 += 0.05; // step size in noise
            }
            n1 += 0.02; // step size in noise
        }
        a -= 0.005;  // speed of clouds
    };

    var drawTower = function(){


    };

    var drawOpening = function(){
        drawSky(250);
        for (x=0; x<=2; x++) {
            for (var y=0; y<=80; y++) {
                fill(20 + x*4, 60+x*7, 40+x*4);
                // draw quads of width 10 pixels
                quad(y*10,mountains[x][y]+x*55,(y+1)*10,mountains[x][y+1]+(x)*55,(y+1)*10,600,y*10,800);
            }
        }
        drawTower();

    };

    var draw = function() {
        switch(state){
            case "opening":
                drawOpening();
                break;
            case "menu":
                break;
            case "game":
                break;
            case "gameover":
                break;
        }
        //drawSky();
    };
}};
