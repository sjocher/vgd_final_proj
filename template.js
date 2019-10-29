var sketchProc=function(processingInstance){ with (processingInstance) {

    size(800, 600);
    frameRate(60);

    var state = "opening";

    /* OPENING SCREEN AREA */


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
                var c = map(noise(n1, n2), 0, 2, 0, 255);
                fill(c, c, c , 150);
                rect(x, y, 8, 8);
                n2 += 0.05; // step size in noise
            }
            n1 += 0.02; // step size in noise
        }
        a -= 0.01;  // speed of clouds
    };

    var towerImg = loadImage("./images/tower.png");
    var drawTower = function() {
        image(towerImg,250,100);
    };

    var fogObj = function(x,y) {
        this.x = x;
        this.y = y;
        this.speed = 0.1;
    };

    var fogImg = loadImage("./images/fog.png");
    fogObj.prototype.draw = function(){
        image(fogImg,this.x,this.y);
        if (this.x > 0 || this.x < -800){
            this.speed *= -1;
        }
        this.x += this.speed;
    };

    var fog = new fogObj(-800,0);

    var drawFirstOpen = function(fade) {
        fill(0,0,0);
        rect(0,0,800,600);
        fill(200,200,200,fade);
        textSize(64);
        textAlign(CENTER);
        text("A Game by",400,200);
        text("Brad\nFerguson", 220,300);
        text("Sean\nJocher", 600,300);
        textSize(128);
        text("&", 420,350);
        textAlign(LEFT);
    };

    var drawOpening = function() {
        drawSky(250);
        for (x=0; x<=2; x++) {
            for (var y=0; y<=80; y++) {
                fill(20 + x*4, 60+x*7, 40+x*4);
                // draw quads of width 10 pixels
                quad(y*10,mountains[x][y]+x*55,(y+1)*10,mountains[x][y+1]+(x)*55,(y+1)*10,600,y*10,800);
            }
        }
        fog.draw();
        drawTower();
        //fill(160,160,160,90);
        //rect(0,0,800,600);
    };

    var openingObj = function(state) {
        this.state = state;
        this.fade = 0;
        this.peak = false;
    };

    openingObj.prototype.draw = function() {
        switch(this.state){
            case 0:
                drawFirstOpen(this.fade);
                if(this.fade < 255 && !this.peak){this.fade++;}
                if(this.fade === 255){this.peak = true;}
                if(this.fade > 0 && this.peak){this.fade--;}
                if(this.fade === 0 && this.peak){this.state = 1; this.fade = 255;}
                break;
            case 1:
                drawOpening();
                fill(0,0,0,this.fade);
                rect(0,0,800,600);
                if(this.fade > 0){this.fade--;}
                if(this.fade === 0){
                    //DRAW TITLE AND PRESS ENTER
                }
                break;


        }
    };

    var opening = new openingObj(0);

    /* OPENING SCREEN END*/

    /* MENU SCREEN AREA */

    var buttonMenuObj = function(x, y, state, textOption) {
        this.state = state;
        this.x = x;
        this.y = y;
        this.textOption = textOption;
    }
    
    buttonMenuObj.prototype.draw = function () {
        if(this.state == "selected") {
            fill(181, 41, 20);
        } else if(this.state == "unselected") {
            fill(34, 34, 36);
        }
        rect(this.x, this.y, 280, 50, 25);
        fill(255,255,255);
        textSize(32);
        text(this.textOption, this.x + 64, this.y + 36);
    }

    var startButton = new buttonMenuObj(260, 260, "unselected", "Start Game");
    var instructionsButton = new buttonMenuObj(260, 320, "unselected", "Instructions");
    var creditsButton = new buttonMenuObj(260, 380, "unselected", "Credits");
    var exitButton = new buttonMenuObj(260, 440, "unselected", "Exit Game");

    var swordImg = loadImage("./images/sword.png");
    var selectorMenuObj = function(x, y) {
        this.x = x;
        this.y = y;
        fill(181, 41, 20);
        image(swordImg,this.x-30,this.y);
        //triangle(this.x, this.y, this.x + 30, this.y + 15, this.x, this.y + 30);
    }

    var cycleMenu = function(state) {
        switch(state) {
            case 0:
                startButton.state = "selected";
                instructionsButton.state = "unselected"
                creditsButton.state = "unselected"
                exitButton.state = "unselected"
                var arrow = new selectorMenuObj(startButton.x - 100, startButton.y + 8);
                break;
            case 1:
                instructionsButton.state = "selected";
                startButton.state = "unselected";
                creditsButton.state = "unselected"
                exitButton.state = "unselected"
                var arrow = new selectorMenuObj(instructionsButton.x - 100, instructionsButton.y + 8);
                break;
            case 2:
                creditsButton.state = "selected";
                startButton.state = "unselected";
                instructionsButton.state = "unselected"
                exitButton.state = "unselected"
                var arrow = new selectorMenuObj(creditsButton.x - 100, creditsButton.y + 8);
                break;
            case 3:
                exitButton.state = "selected";
                startButton.state = "unselected";
                instructionsButton.state = "unselected"
                creditsButton.state = "unselected"
                var arrow = new selectorMenuObj(exitButton.x - 100, exitButton.y + 8);
                break;
        }
    };

    var drawMenuOptions = function(state) {
        cycleMenu(state);
        startButton.draw();
        instructionsButton.draw();
        creditsButton.draw();
        exitButton.draw();
    };

    var menu = function(state) {
        this.state = state;
    }

    menu.prototype.draw = function() {
        //Setup background for the menu
        drawOpening();
        //Setup Menu Options
        drawMenuOptions(this.state);
    };

    var menu = new menu(0);

    /* Credits Area */

    var drawCredits = function () {
        background(0,0,0);
    }
    
    /* Instructions Area */

    var drawInstructions = function () {
        background(0,0,0);
    }
    
    /* Main Draw and Key Input Area */

    var keyPressed = function() {
        switch(state) {
            case "opening":
                if(keyCode == ENTER) {
                    state = "menu";
                }
            case "menu":
                if(keyCode == UP) {
                    if(menu.state == 0) {
                        menu.state = 3;
                    } else {
                        menu.state--;
                    }
                } else if(keyCode == DOWN) {
                    if(menu.state == 3) {
                        menu.state = 0;
                    } else {
                        menu.state++;
                    }
                }
                if(keyCode == ENTER) {
                    switch(menu.state) {
                        case 0:
                            break;
                        case 1:
                            state = "instructions";
                            break;
                        case 2:
                            state = "credits";
                            break;
                        case 3:
                            state = "opening";
                            break;
                    }
                    menu.state = 0;
                }
                break;
            case "credits":
                if(keyCode == ENTER) {
                    state = "menu";
                }
                break;
            case "instructions":
                if(keyCode == ENTER) {
                    state = "menu";
                }
                break;

        }
    }

    var draw = function() {
        switch(state){
            case "opening":
                opening.draw();
                break;
            case "menu":
                menu.draw();
                break;
            case "credits":
                drawCredits();
                break;
            case "instructions":
                drawInstructions();
                break;
            case "game":
                break;
            case "gameover":
                break;
        }
        //drawSky();
    };
}};
