/*
    Names: Brad Ferguson & Sean Jocher
    Project Name: Darkest Tower
    Progress: Introduction & Title Screen Complete 11/1/19
    Description: [Current State] Opening and menu screen for the start of Darkest Tower. Includes sounds for additional effect.
                Sprites for game are in the credits. Menu screen exists as a FSM. Currently starting the game produces
                no effect.
 */

var sketchProc=function(processingInstance){ with (processingInstance) {

    size(800, 600);
    frameRate(60);

    /* TILEMAPS 15 x 11 */

    var wallObj = function(x, y, file) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.file = file;
    }

    wallObj.prototype.draw = function() {
        image(this.file, this.x, this.y, this.w, this.h);
    }

    var floorObj = function(x, y, file) {
        this.file = file;
        this.x = x;
        this.y = y;
    }

    floorObj.prototype.draw = function() {
        image(this.file, this.x, this.y, 50, 50);
    }

    var room0 =    ["ccccccccccccccc",
                    "c<uuuuu^uuuuu>c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c[-----------]c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c{dddddvddddd}c",
                    "ccccccccccccccc"];

    var room1 =    ["ccccccccccccccc",
                    "c<uuuuuuuuuuu>c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c{dddddvddddd}c",
                    "ccccccccccccccc"];

    var room2 =    ["ccccccccccccccc",
                    "c<uuuuuuuuuuu>c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c[-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c{ddddddddddd}c",
                    "ccccccccccccccc"];

    var room3 =    ["ccccccccccccccc",
                    "c<uuuuu^uuuuu>c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c{ddddddddddd}c",
                    "ccccccccccccccc"];

    var room4 =    ["ccccccccccccccc",
                    "c<uuuuuuuuuuu>c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------]c",
                    "cl-----------rc",
                    "cl-----------rc",
                    "cl-----------rc",
                    "c{ddddddddddd}c",
                    "ccccccccccccccc"];

    var room = function(curr, loaded) {
        this.currRoom = curr;
        this.walls = [];
        this.floor = [];
        this.doors = [];
        this.loaded = loaded;
    }

    room.prototype.load = function() {
        if(!this.loaded) {
            this.walls = [];
            this.doors = [];
            this.floor = [];
            for(var i = 0; i < this.currRoom.length; ++i) {
                for(var j = 0; j < this.currRoom[0].length; ++j) {
                    if(this.currRoom[i][j] === 'l') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_left));
                    }
                    if(this.currRoom[i][j] === 'u') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_top));
                    }
                    if(this.currRoom[i][j] === 'd') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_down));
                    }
                    if(this.currRoom[i][j] === 'r') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_right));
                    }
                    if(this.currRoom[i][j] === '-') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, floor_block));
                    }
                    if(this.currRoom[i][j] === 'c') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, cobble));
                    }
                    if(this.currRoom[i][j] === '<') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, UL));
                    }
                    if(this.currRoom[i][j] === '>') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, UR));
                    }
                    if(this.currRoom[i][j] === '{') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, BL));
                    }
                    if(this.currRoom[i][j] === '}') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, LR));
                    }
                    if(this.currRoom[i][j] === '[') {
                        this.doors.push(new floorObj(j*50 + 25, i*50 + 25, door_left));
                    }
                    if(this.currRoom[i][j] === ']') {
                        this.doors.push(new floorObj(j*50 + 25, i*50 + 25, door_right));
                    }
                    if(this.currRoom[i][j] === '^') {
                        this.doors.push(new floorObj(j*50 + 25, i*50 + 25, door_up));
                    }
                    if(this.currRoom[i][j] === 'v') {
                        this.doors.push(new floorObj(j*50 + 25, i*50 + 25, door_down));
                    }
                }
            }
            this.loaded = 1;
        }
    }
    
    room.prototype.draw = function() {
        background(0,0,0);
        for(var i = 0; i < this.walls.length; ++i) {
            this.walls[i].draw();
        }
        for(var i = 0; i < this.doors.length; ++i) {
            this.doors[i].draw();
        }
        for(var i = 0; i < this.floor.length; ++i) {
            this.floor[i].draw();
        }
    }

    var game = new room(room0, 0);

    //Functions to load the rooms

    /* TILEMAP END */

    var state = "opening";
    var soundBool = 1;

    /* SOUNDS */
    var sound = function (src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    };
    var rainSound = new sound("./sounds/rain.wav");
    var clickSound = new sound("./sounds/click.wav");

    /* OPENING SCREEN AREA */


    var a = random(1500);
    var mountains = [[], [], []];
    var b = random(1500);
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 80; j++) {
            var n = noise(b);
            mountains[i][j] = map(n, 0, 1, 0, 400 - i * 50);
            b += 0.05;  // ruggedness
        }
    }

    var drawSky = function (ymin) {
        //background(3, 102, 242);
        background(15, 46, 89);
        noStroke();

        // sky
        var n1 = a;
        for (var x = 0; x <= 800; x += 8) {
            var n2 = 0;
            for (var y = 0; y <= ymin; y += 8) {
                var c = map(noise(n1, n2), 0, 2, 0, 255);
                fill(c, c, c, 150);
                rect(x, y, 8, 8);
                n2 += 0.05; // step size in noise
            }
            n1 += 0.02; // step size in noise
        }
        a -= 0.01;  // speed of clouds
    };

    var towerImg = loadImage("./images/tower.png");
    var drawTower = function () {
        image(towerImg, 250, 100);
    };

    var fogObj = function (x, y) {
        this.x = x;
        this.y = y;
        this.speed = 0.1;
    };

    var fogImg = loadImage("./images/fog.png");
    fogObj.prototype.draw = function () {
        image(fogImg, this.x, this.y);
        if (this.x > 0 || this.x < -800) {
            this.speed *= -1;
        }
        this.x += this.speed;
    };

    var fog = new fogObj(-800, 0);

    var rainObj = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, random(3, 7));
        this.size = random(5, 12);
        this.position.y -= (18 - this.size);
        this.timeLeft = 255;
    };

    var rain = [];

    rainObj.prototype.move = function () {
        this.position.add(this.velocity);
        this.timeLeft--;
    };

    rainObj.prototype.draw = function () {
        noStroke();
        //fill(this.c1, this.c1, this.c1, this.timeLeft);
        stroke(183, 193, 240, this.timeLeft);
        strokeWeight(1);
        line(this.position.x, this.position.y, this.position.x, this.position.y + this.size);
        //ellipse(this.position.x, this.position.y, this.size, this.size*2);
    };

    var drawFirstOpen = function (fade) {
        fill(0, 0, 0);
        rect(0, 0, 800, 600);
        fill(200, 200, 200, fade);
        textSize(64);
        textAlign(CENTER);
        text("A Game by", 400, 200);
        text("Brad\nFerguson", 220, 300);
        text("Sean\nJocher", 600, 300);
        textSize(128);
        text("&", 420, 350);
        textAlign(LEFT);
    };

    var titleImg = loadImage("./images/title.png");
    var drawOpening = function () {
        drawSky(250);
        for (x = 0; x <= 2; x++) {
            for (var y = 0; y <= 80; y++) {
                fill(20 + x * 4, 60 + x * 7, 40 + x * 4);
                // draw quads of width 10 pixels
                quad(y * 10, mountains[x][y] + x * 55, (y + 1) * 10, mountains[x][y + 1] + (x) * 55, (y + 1) * 10, 600, y * 10, 800);
            }
        }
        fog.draw();
        if (rain.length < 500) {
            rain.push(new rainObj(random(0, 800), 0));
            rain.push(new rainObj(random(0, 800), 0));
            rain.push(new rainObj(random(0, 800), 0));
        }
        for (var i = 0; i < rain.length; i++) {
            if ((rain[i].timeLeft > 0) && (rain[i].position.y < 600)) {
                rain[i].draw();
                rain[i].move();
                if (soundBool === 1) {
                    rainSound.play();
                }
                if (soundBool === -1) {
                    rainSound.stop();
                }
            } else {
                rain.splice(i, 1);
            }
        }
        drawTower();
        image(titleImg, 50, 25);
        //fill(160,160,160,90);
        //rect(0,0,800,600);
    };

    var openingObj = function (state) {
        this.state = state;
        this.fade = 0;
        this.peak = false;
        this.showEnter = 0;
        this.currFrame = 0;
    };

    openingObj.prototype.draw = function () {
        switch (this.state) {
            case 0:
                drawFirstOpen(this.fade);
                if (this.fade < 255 && !this.peak) {
                    this.fade++;
                }
                if (this.fade === 255) {
                    this.peak = true;
                }
                if (this.fade > 0 && this.peak) {
                    this.fade--;
                }
                if (this.fade === 0 && this.peak) {
                    this.state = 1;
                    this.fade = 255;
                }
                break;
            case 1:
                drawOpening();
                fill(0, 0, 0, this.fade);
                rect(0, 0, 800, 600);
                if (this.fade > 0) {
                    this.fade--;
                }
                if (this.fade === 0) {
                    //PRESS ENTER
                    if (this.showEnter === 1) {
                        textAlign(CENTER);
                        fill(255, 255, 255);
                        textSize(32);
                        text("Press Enter", 400, 500);
                        textAlign(LEFT);
                        if (this.currFrame < (frameCount - 60)) {
                            this.currFrame = frameCount;
                            this.showEnter = 0;
                        }
                    } else {
                        if (this.currFrame < (frameCount - 30)) {
                            this.currFrame = frameCount;
                            this.showEnter = 1;
                        }
                    }

                }
                break;


        }
    };

    var opening = new openingObj(0);

    /* OPENING SCREEN END*/

    /* MENU SCREEN AREA */

    var buttonMenuObj = function (x, y, state, textOption) {
        this.state = state;
        this.x = x;
        this.y = y;
        this.textOption = textOption;
    }

    buttonMenuObj.prototype.draw = function () {
        if (this.state === "selected") {
            fill(181, 41, 20);
        } else if (this.state === "unselected") {
            fill(34, 34, 36);
        }
        rect(this.x, this.y, 280, 50, 25);
        fill(255, 255, 255);
        textSize(32);
        text(this.textOption, this.x + 64, this.y + 36);
    }

    var startButton = new buttonMenuObj(260, 260, "unselected", "Start Game");
    var instructionsButton = new buttonMenuObj(260, 320, "unselected", "Instructions");
    var creditsButton = new buttonMenuObj(260, 380, "unselected", "Credits");
    var soundButton = new buttonMenuObj(260, 440, "unselected", "Sound: ON");

    var swordImg = loadImage("./images/sword.png");
    var selectorMenuObj = function (x, y) {
        this.x = x;
        this.y = y;
        fill(181, 41, 20);
        image(swordImg, this.x - 30, this.y);
        //triangle(this.x, this.y, this.x + 30, this.y + 15, this.x, this.y + 30);
    }

    var cycleMenu = function (state) {
        switch (state) {
            case 0:
                startButton.state = "selected";
                instructionsButton.state = "unselected"
                creditsButton.state = "unselected"
                soundButton.state = "unselected"
                var arrow = new selectorMenuObj(startButton.x - 100, startButton.y + 8);
                break;
            case 1:
                instructionsButton.state = "selected";
                startButton.state = "unselected";
                creditsButton.state = "unselected"
                soundButton.state = "unselected"
                var arrow = new selectorMenuObj(instructionsButton.x - 100, instructionsButton.y + 8);
                break;
            case 2:
                creditsButton.state = "selected";
                startButton.state = "unselected";
                instructionsButton.state = "unselected"
                soundButton.state = "unselected"
                var arrow = new selectorMenuObj(creditsButton.x - 100, creditsButton.y + 8);
                break;
            case 3:
                soundButton.state = "selected";
                startButton.state = "unselected";
                instructionsButton.state = "unselected"
                creditsButton.state = "unselected"
                var arrow = new selectorMenuObj(soundButton.x - 100, soundButton.y + 8);
                break;
        }
    };

    var drawMenuOptions = function (state) {
        cycleMenu(state);
        startButton.draw();
        instructionsButton.draw();
        creditsButton.draw();
        soundButton.draw();
    };

    var menu = function (state) {
        this.state = state;
    }

    menu.prototype.draw = function () {
        //Setup background for the menu
        drawOpening();
        //Setup Menu Options
        drawMenuOptions(this.state);
    };

    var menu = new menu(-1);

    /* Credits Area */

    var acidImg = loadImage("./images/acid.png");
    var archerImg = loadImage("./images/archer.png");
    var eyeImg = loadImage("./images/eyeball.png");
    var knightImg = loadImage("./images/knight.png");
    var playerImg = loadImage("./images/player.png");
    var potionImg = loadImage("./images/potion.png");
    var ratImg = loadImage("./images/rat.png");
    var fullheartImg = loadImage("./images/fullheart.png");
    var floor_block = loadImage("./images/floor_block.png");
    var wall_left = loadImage("./images/wall_left.png");
    var wall_top = loadImage("./images/wall_top.png");
    var wall_right = loadImage("./images/wall_right.png");
    var wall_down = loadImage("./images/wall_bottom.png");
    var cobble = loadImage("./images/cobble.png");
    var UL = loadImage("./images/UL.png");
    var UR = loadImage("./images/UR.png");
    var BL = loadImage("./images/BL.png");
    var LR = loadImage("./images/LR.png");
    var door_left = loadImage("./images/door_left.png");
    var door_right = loadImage("./images/door_right.png");
    var door_up = loadImage("./images/door_up.png");
    var door_down = loadImage("./images/door_down.png");
    var arrow = loadImage("./images/arrow.png");
    var drawCredits = function () {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(32);
        //Authors Area
        text("Thanks for Playing!", 260, 50);
        text("Game by", 320, 80);
        text("Brad Ferguson & Sean Jocher", 190, 120);
        image(acidImg, 250, 300, 100, 100);
        image(archerImg, 250, 200, 100, 100);
        image(eyeImg, 250, 400, 100, 100);
        image(knightImg, 450, 300, 100, 100);
        image(playerImg, 350, 300, 100, 100);
        image(potionImg, 450, 200, 100, 100);
        image(ratImg, 450, 400, 100, 100);
    };

    /* Instructions Area */

    var instructionImg = loadImage("./images/instructions.png");
    var drawInstructions = function () {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(64);
        textAlign(CENTER);
        text("Controls", 400, 70);
        textSize(32);
        text("WASD to Move", 400, 120);
        text("Arrow Keys to Shoot", 400, 180);
        image(instructionImg, 50, 200, 700, 250);
        text("Press Enter to Return to Main Menu", 400, 550);
        textAlign(LEFT);
    }

    /* TEST */
    var rightForce = new PVector(1, 0);
    var leftForce = new PVector(-1, 0);
    var upForce = new PVector(0, -1);
    var downForce = new PVector(0, 1);


    var arrowObj = function(x, y, direction, time, player, vx, vy) {
        this.position = new PVector(x,y);
        this.velocity = new PVector(vx, vy);
        //0 - right
        //1 - down
        //2 - left
        //3 - up
        this.direction = direction;
        this.currFrameCount = frameCount;
        this.timeEnd = time;
        this.player = player; //true if fired from player
        this.speed = 5;
    };

    arrowObj.prototype.draw = function(){
        if (frameCount >= (this.currFrameCount+this.timeEnd)){
            return false;
        }
        else{
            image(arrow, this.position.x, this.position.y, 20, 10);
            var step = new PVector(0,0);
            step.add(this.velocity);
            step.mult(0.25);
            this.position.add(step);
            switch (this.direction){
                case 0: //right
                        this.position.x += this.speed;
                        break;
                case 1:
                        this.position.y += this.speed;
                        break;
                case 2:
                        this.position.x -= this.speed;
                        break;
                case 3:
                        this.position.y -= this.speed;
                        break;
            }
        }
        return true;
    };


    var playerObj = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.force = new PVector(0, 0);

        this.life = 6;
        this.maxLife = 6;
        this.w = 50;
        this.h = 50;

        //movement
        this.walkRight = 0;
        this.walkLeft = 0;
        this.walkUp = 0;
        this.walkDown = 0;
        this.maxSpeed = 3;
        this.frictionCoeff = -0.1;
        this.friction = new PVector(0, 0);
        this.forceCoeff = 0.1;

        //collision
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        //shooting
        this.shootRight = 0;
        this.shootLeft = 0;
        this.shootUp = 0;
        this.shootDown = 0;
        this.shotSpeed = 20;
        this.arrowDuration = 60;
        this.currFrameCount = 0; //time of shooting
        this.arrows = [];


    };

    playerObj.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };

    playerObj.prototype.draw = function () {
        stroke(0,0,0);
        strokeWeight(1);
        fill(0,0,0,150);
        ellipse(this.position.x +this.w/2+3, this.position.y+this.h-4, 40, this.h/2-10);
        noFill();
        rect(this.position.x +12, this.position.y, 30, this.h);
        image(playerImg, this.position.x, this.position.y, this.w, this.h);
        for (var i=0; i<this.arrows.length; i++){
            var alive = this.arrows[i].draw();
            if (!alive){
                this.arrows.splice(i,1);
            }
        }
        this.drawLife();
    };

    var fullHeartImg = loadImage("./images/fullheart.png");
    var halfHeartImg = loadImage("./images/halfheart.png");
    var emptyHeartImg = loadImage("./images/emptyheart.png");
    playerObj.prototype.drawLife = function(){
        //draw max heart containers
        var hearts = this.maxLife / 2;
        //text("hearts: " + hearts, 200, 200);
        for (var i=0; i<hearts; i++){
            image(emptyHeartImg, 40*i+30, 30, 40, 40);
        }
        //draw filled in hearts
        if (this.life % 2 === 0){
            //even
            var fillHearts = this.life / 2;
            for (var i=0; i<fillHearts; i++){
                image(fullHeartImg, 40*i+30, 30, 40, 40);
            }
        }
        if ((this.life - 1) % 2 === 0){
            //odd amount of life
            var fillHearts = (this.life-1) / 2;
            for (var i=0; i<fillHearts; i++){
                image(fullHeartImg, 40*i+30, 30, 40, 40);
            }
            image(halfHeartImg, 40*fillHearts+30, 30, 40, 40);
        }

    };

    playerObj.prototype.move = function () {
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
        this.acceleration.set(0, 0);

        //check for collisions here

        //set acceleration if moving
        if (this.velocity.x <= this.maxSpeed) {
            if (this.walkRight === 1 && this.right) {
                this.force.set(rightForce.x, 0);
                this.force.mult(this.forceCoeff);
                this.applyForce(this.force);
            }
        }
        if (this.velocity.x >= -this.maxSpeed) {
            if (this.walkLeft === 1 && this.left) {
                this.force.set(leftForce.x, 0);
                this.force.mult(this.forceCoeff);
                this.applyForce(this.force);
            }
        }
        if (this.velocity.y >= -this.maxSpeed) {
            if (this.walkUp === 1 && this.up) {
                this.force.set(0, upForce.y);
                this.force.mult(this.forceCoeff);
                this.applyForce(this.force);
            }
        }
        if (this.velocity.y <= this.maxSpeed) {
            if (this.walkDown === 1 && this.down) {
                this.force.set(0, downForce.y);
                this.force.mult(this.forceCoeff);
                this.applyForce(this.force);
            }
        }
        this.velocity.add(this.acceleration);
        //if not pressing right or left dont add x friction
        if (!this.walkRight && !this.walkLeft ){
            this.friction.set(this.velocity.x, 0);
            this.friction.mult(this.frictionCoeff);
            this.velocity.add(this.friction);
        }
        //if not pressing up or down dont add y friction
        if (!this.walkUp && !this.walkDown) {
            this.friction.set(0, this.velocity.y);
            this.friction.mult(this.frictionCoeff);
            this.velocity.add(this.friction);
        }
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);


        //testing code
        if (this.position.x > 800) {
            this.position.x = -this.w;
        } else if (this.position.x < -this.w) {
            this.position.x = 800;
        }
        if (this.position.y > 600) {
            this.position.y = -this.h;
        } else if (this.position.y < -this.h) {
            this.position.y = 600;
        }

    };

    playerObj.prototype.shoot = function(){
        if (this.currFrameCount < (frameCount - this.shotSpeed)) {
            if (this.shootRight === 1) {
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + player.w, this.position.y + this.h / 2, 0, this.arrowDuration, true, this.velocity.x, this.velocity.y));
            }
            if (this.shootLeft === 1) {
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x, this.position.y + this.h / 2, 2, this.arrowDuration, true, this.velocity.x, this.velocity.y));
            }
            if (this.shootUp === 1) {
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + player.w / 2, this.position.y, 3, this.arrowDuration, true, this.velocity.x, this.velocity.y));
            }
            if (this.shootDown === 1) {
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + player.w / 2, this.position.y + this.h, 1, this.arrowDuration, true, this.velocity.x, this.velocity.y));
            }
        }
    };

    player = new playerObj(200, 200);


    var drawTest = function () {
        /*
        background(255, 255, 255);
        noStroke();
        fill(0,0,0);
        for (var i=1; i<17; i++){
            rect(i*50-25, 0, 1, 600);
            text(i, i*50 - 25, 25);
        }
        for (var i=1; i<13; i++){
            rect(0, i*50-25, 800, 1);
        }
        */
        player.move();
        player.draw();
        player.shoot();
    };


    /* Main Draw and Key Input Area */

    var keyPressed = function () {
        switch (state) {
            case "opening":
                if (keyCode === ENTER) {
                    state = "menu";
                }
            case "menu":
                if (keyCode === UP) {
                    if (soundBool === 1) {
                        clickSound.play();
                    }
                    if (menu.state === 0) {
                        menu.state = 3;
                    } else {
                        menu.state--;
                    }
                } else if (keyCode === DOWN) {
                    if (soundBool === 1) {
                        clickSound.play();
                    }
                    if (menu.state === 3) {
                        menu.state = 0;
                    } else {
                        menu.state++;
                    }
                }
                if (keyCode === 32) {
                    //SPACE
                    rainSound.stop();
                    state = "test";
                    break;
                }
                if (keyCode === ENTER) {
                    switch (menu.state) {
                        case -1:
                            menu.state = 0;
                            break;
                        case 0:
                            rainSound.stop();
                            state = "game";
                            break;
                        case 1:
                            state = "instructions";
                            rainSound.stop();
                            break;
                        case 2:
                            state = "credits";
                            rainSound.stop();
                            break;
                        case 3:
                            soundBool *= -1;
                            if (soundBool === 1) {
                                soundButton.textOption = "Sound: ON";
                            } else if (soundBool === -1) {
                                soundButton.textOption = "Sound: OFF";
                            }
                            break;
                    }
                    //menu.state = 0;
                }
                break;
            case "credits":
                if (keyCode === ENTER) {
                    state = "menu";
                }
                break;
            case "instructions":
                if (keyCode === ENTER) {
                    state = "menu";
                }
                break;
            case "test":
                if (keyCode === 68 || keyCode === 100) {//D or d
                    player.walkRight = 1;
                }
                if (keyCode === 65 || keyCode === 97) {//A or a
                    player.walkLeft = 1;
                }
                if (keyCode === 87 || keyCode === 119) {//W or w
                    player.walkUp = 1;
                }
                if (keyCode === 83 || keyCode === 115) {//S or s
                    player.walkDown = 1;
                }
                if (player.currFrameCount < (frameCount - player.shotSpeed)){
                    if (keyCode === RIGHT){
                        player.shootRight = 1;
                    }
                    else if (keyCode === LEFT){
                        player.shootLeft = 1;
                    }
                    else if (keyCode === UP){
                       player.shootUp = 1;
                    }
                    else if (keyCode === DOWN){
                       player.shootDown = 1;
                    }
                }
                break;

        }
    };

    var keyReleased = function () {
        switch (state) {
            case "test":
                if (keyCode === 68 || keyCode === 100) {//D or d
                    player.walkRight = 0;
                }
                if (keyCode === 65 || keyCode === 97) {//A or a
                    player.walkLeft = 0;
                }
                if (keyCode === 87 || keyCode === 119) {//W or w
                    player.walkUp = 0;
                }
                if (keyCode === 83 || keyCode === 115) {//S or s
                    player.walkDown = 0;
                }
                if (keyCode === RIGHT){
                    player.shootRight = 0;
                }
                if (keyCode === LEFT){
                    player.shootLeft = 0;
                }
                if (keyCode === UP){
                   player.shootUp = 0;
                }
                if (keyCode === DOWN){
                   player.shootDown = 0;
                }
                break;


        }
    };

    var draw = function () {
        switch (state) {
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
                game.load();
                game.draw();
                break;
            case "test":
                game.load();
                game.draw();
                drawTest();
                break;
            case "gameover":
                break;
        }
        //drawSky();
    };

}};
