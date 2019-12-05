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
    angleMode = "radians";

    /* TILEMAPS 15 x 11 */

    var stairObj = function(x, y, collected) {
        this.pos.x = new PVector(x, y);
        this.w = 50;
        this.h = 50;
        this.collected = collected;
    }

    stairObj.prototype.draw = function() {
        image(stairIMG, this.pos.x, this.pos.y, this.w, this.h);
    }

    var doorObj = function(x ,y, file, direction, open) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.file = file;
        this.direction = direction;
        this.open = open;
    }
    
    doorObj.prototype.draw = function() {
        switch(this.open) {
            case 0:
                pushMatrix();
                translate(this.x + 25, this.y + 25);
                switch(this.direction) {
                    case "up":
                        image(door_closed, -25, -25, this.w, this.h);
                        break;
                    case "down":
                        rotate(PI);
                        image(door_closed, -25, -25, this.w, this.h);
                        break;
                    case "left":
                        rotate(-PI/2);
                        image(door_closed, -25, -25, this.w, this.h);
                        break;
                    case "right":
                        rotate(PI/2);
                        image(door_closed, -25, -25, this.w, this.h);
                        break;
                }
                popMatrix();
                break;
            case 1:
                image(this.file, this.x, this.y, this.w, this.h);
                break;
        }
    }

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

    var room_layout =  ["ccccccccccccccc",
                        "c<uuuuuuuuuuu>c",
                        "cl-----------rc",
                        "cl-----------rc",
                        "cl-----------rc",
                        "cl-----------rc",
                        "cl-----------rc",
                        "cl-----------rc",
                        "cl-----------rc",
                        "c{ddddddddddd}c",
                        "ccccccccccccccc"];

    var level0_layout =      [[9,9,2,3,9],
                             [9,9,1,9,9],
                             [6,5,0,4,9],
                             [9,9,7,9,9],
                             [9,9,8,9,9]];

    var roomData = function(doors, enemies) {
        this.doors = doors;
        this.enemies = enemies;
    }

    //door layout = up, down, left, right
    var level0_room0 = [1, 1, 1, 1];
    var level0_room1 = [1, 1, 0, 0];
    var level0_room2 = [0, 1, 0, 1];
    var level0_room3 = [0, 0, 1, 0];
    var level0_room4 = [0, 0, 1, 0];
    var level0_room5 = [0, 0, 1, 1];
    var level0_room6 = [0, 0, 0, 1];
    var level0_room7 = [1, 1, 0, 0];
    var level0_room8 = [1, 0, 0, 0];

    var l00 = new roomData(level0_room0, []);
    var l01 = new roomData(level0_room1, []);
    var l02 = new roomData(level0_room2, []);
    var l03 = new roomData(level0_room3, []);
    var l04 = new roomData(level0_room4, []);
    var l05 = new roomData(level0_room5, []);
    var l06 = new roomData(level0_room6, []);
    var l07 = new roomData(level0_room7, []);
    var l08 = new roomData(level0_room8, []);


    var level = function(layout, rooms) {
        this.layout = layout
        this.rooms = rooms;
        this.playerRoomLocation = new PVector(2, 2);
    }

    var level0 = new level(level0_layout, [l00, l01, l02, l03, l04, l05, l06, l07, l08]);

    var room = function(loaded, door_locs) {
        this.walls = [];
        this.door_locs = door_locs;
        this.floor = [];
        this.doors = [];
        this.enemies = [];
        this.loaded = loaded;
    }

    room.prototype.load = function() {
        if(!this.loaded) {
            this.walls = [];
            this.doors = [];
            this.floor = [];
            //load the doorskis bro, x, y, image, direction, open
            if(this.door_locs[0] === 1) {
                this.doors.push(new doorObj(375, 75, door_up, "up", 1));
            }
            if(this.door_locs[1] === 1) {
                this.doors.push(new doorObj(375, 475, door_down, "down", 1));
            }
            if(this.door_locs[2] === 1) {
                this.doors.push(new doorObj(75, 275, door_left, "left", 1));
            }
            if(this.door_locs[3] === 1) {
                this.doors.push(new doorObj(675, 275, door_right, "right", 1));
            }
            //
            for(var i = 0; i < room_layout.length; ++i) {
                for(var j = 0; j < room_layout[0].length; ++j) {
                    if(room_layout[i][j] === 'l') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_left));
                    }
                    if(room_layout[i][j] === 'u') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_top));
                    }
                    if(room_layout[i][j] === 'd') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_down));
                    }
                    if(room_layout[i][j] === 'r') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, wall_right));
                    }
                    if(room_layout[i][j] === '-') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, floor_block));
                    }
                    if(room_layout[i][j] === 'c') {
                        this.floor.push(new floorObj(j*50 + 25, i*50 + 25, cobble));
                    }
                    if(room_layout[i][j] === '<') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, UL));
                    }
                    if(room_layout[i][j] === '>') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, UR));
                    }
                    if(room_layout[i][j] === '{') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, BL));
                    }
                    if(room_layout[i][j] === '}') {
                        this.walls.push(new wallObj(j*50 + 25, i*50 + 25, LR));
                    }
                }
            }
            this.loaded = 0;
        }
    }
    
    room.prototype.draw = function() {
        background(0,0,0);
        for(var i = 0; i < this.walls.length; ++i) {
            this.walls[i].draw();
        }
        for(var i = 0; i < this.floor.length; ++i) {
            this.floor[i].draw();
        }
        for(var i = 0; i < this.doors.length; ++i) {
            if(this.enemies.length > 0) {
                this.doors[i].open = 0;
            } else {
                this.doors[i].open = 1;
            }
            this.doors[i].draw();
        }
        for(var i = 0; i < this.enemies.length; ++i){
            this.enemies[i].move();
            this.enemies[i].draw();
        }
    }

    var map_data = function(currlevel) {
        this.reset = 1;
        this.level = currlevel; //consists of level.layout, and level.rooms
        this.drawRoomData = new room(0, []);
    }

    map_data.prototype.run = function() {
        //console.log(this.level.playerRoomLocation.x + " " + this.level.playerRoomLocation.y)
        this.roomSpot = this.level.layout[this.level.playerRoomLocation.x][this.level.playerRoomLocation.y];
        this.currRoom = this.level.rooms[this.roomSpot];
        this.drawRoomData.door_locs = this.currRoom.doors;
        this.drawRoomData.enemies = this.currRoom.enemies;
        this.drawRoomData.load();
        this.drawRoomData.draw();
    }

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
    var door_closed = loadImage("./images/door_closed.png");
    var stairIMG = loadImage("./images/stairs.png");
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


    var checkCollisionWalls = function(obj){
        //check for walls
        var collision = 0;
        if (obj.position.x <= 115 || obj.position.x + obj.w >= 675 || obj.position.y <= 100 || obj.position.y + obj.h >= 475) {
            // collision detected!
            //text("HIT!",200,200);
            if (obj.position.x < 115){
                obj.left = false;
                obj.position.x = 115;
            }
            if (obj.position.x + obj.w > 675){
                obj.right = false;
                obj.position.x = 675 - obj.w;
            }
            if (obj.position.y < 100){
                obj.up = false;
                obj.position.y = 100;
            }
            if (obj.position.y + obj.h > 475){
                obj.down = false;
                obj.position.y = 475 - obj.h;
            }
        }

    };


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

        this.w = 20;
        this.h = 20;

        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
    };

    arrowObj.prototype.checkCollision = function(){
        var result = false;
        if (this.player){
            //shot by player
            for (var i=0; i<gamestate.drawRoomData.enemies.length; i++){
                if (this.position.x <= gamestate.drawRoomData.enemies[i].position.x + gamestate.drawRoomData.enemies[i].w && this.position.x + this.w >= gamestate.drawRoomData.enemies[i].position.x && this.position.y <= gamestate.drawRoomData.enemies[i].position.y + gamestate.drawRoomData.enemies[i].h && this.position.y + this.h >= gamestate.drawRoomData.enemies[i].position.y) {
                    // collision detected!
                    result = true;
                    gamestate.drawRoomData.enemies[i].life -= player.damage;
                    gamestate.drawRoomData.enemies[i].hit = 1;
                    if (gamestate.drawRoomData.enemies[i].life <= 0){
                        gamestate.drawRoomData.enemies.splice(i,1);
                    }
                }
            }
        }
        else{
            //shot by enemy at player
            //if enemy shoots
            //check for hit otherwise dont
        }

        return result;
    };

    arrowObj.prototype.draw = function(){
        if (frameCount >= (this.currFrameCount+this.timeEnd)){
            return false;
        }
        else{
            //image(arrow, this.position.x, this.position.y, 20, 10);

            this.up = true;
            this.down = true;
            this.left = true;
            this.right = true;
            var hit = this.checkCollision();
            if (hit){
                return false;
            }
            checkCollisionWalls(this);

            var step = new PVector(0,0);
            step.add(this.velocity);
            step.mult(0.25);
            this.position.add(step);
            switch (this.direction){
                case 0: //right
                        if(this.right){
                            image(arrow, this.position.x, this.position.y, this.w, this.h);
                            this.position.x += this.speed;
                        }
                        else{
                            return false;
                        }
                        break;
                case 1:
                        if(this.down) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(PI / 2);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.y += this.speed;
                        }
                        else{
                            return false;
                        }
                        break;
                case 2:
                        if(this.left) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(PI);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.x -= this.speed;
                        }
                        else{
                            return false;
                        }
                        break;
                case 3:
                        if(this.up) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(-PI / 2);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.y -= this.speed;
                        }
                        else {
                            return false;
                        }
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
        this.hit = 0;
        this.hitTime = 0;
        this.hitBuffer = 120;
        this.hitCount = 0;
        this.blink = 0;
        this.blinkCount = 0;
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

        this.damage = 1;
    };

    var ratObj = function(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.step = new PVector(0,0);

        this.life = 6;
        this.w = 50;
        this.h = 30;

        //collision
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        this.frictionCoeff = -0.1;
        this.friction = new PVector(0, 0);

        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;

        this.moveTime = frameCount;
        this.moveWait = 150;

        this.drawn = false;
    };

    var eyeballObj = function(x, y){
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.angle = PI/4;
        this.w = 100;
        this.h = 100;
        this.speed = 1.5;
        this.life = 50;
        this.maxLife = 50;

        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        this.xdir = 1;
        this.ydir = 1;
        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;
    };

    var knightObj = function(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.step = new PVector(0,0);

        this.life = 6;
        this.w = 50;
        this.h = 50;

        //collision
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        this.frictionCoeff = -0.1;
        this.friction = new PVector(0, 0);

        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;

        this.moveTime = frameCount;
        this.moveWait = 150;
    };

    knightObj.prototype.draw = function(){
        image(knightImg, this.position.x, this.position.y, this.w, this.h);

    };

    knightObj.prototype.move = function(){


    };

    eyeballObj.prototype.draw = function(){
        if (this.hit){
            //tint(255,0,0,250);
            noStroke();
            fill(255,0,0,50);
            image(eyeImg, this.position.x, this.position.y, this.w, this.h);
            ellipse(this.position.x+this.w/2, this.position.y+this.h/2, this.w, this.h);
            noFill();
            //noTint();

            //image(eyeImg, this.position.x, this.position.y, this.w, this.h);
            this.hitTime++;
            if (this.hitTime === 5){
                this.hit = 0;
                this.hitTime = 0;
            }
        }
        else {
            image(eyeImg, this.position.x, this.position.y, this.w, this.h);
        }

        noStroke();
        fill(255,0,0);
        for (var i=0;i<this.life; i++){
            rect(300+i*4, 530, 4, 40);
        }
        fill(0,0,0);
        for (var i=0; i<4; i++){
            rect(340+i*40, 530, 1, 40);
        }
        stroke(0,0,0);
        strokeWeight(5);
        noFill();
        rect(300, 530, 200, 40, 5);
        noStroke();
    };

    eyeballObj.prototype.move = function(){
        if (this.life === this.maxLife*4/5){
            this.speed = 2
        }
        if (this.life === this.maxLife*3/5){
            this.speed = 2.5
        }
        if (this.life === this.maxLife*2/5){
            this.speed = 3
        }
        if (this.life === this.maxLife*1/5){
            this.speed = 4
        }
        if (this.position.x <= 115 || this.position.x + this.w >= 675 || this.position.y <= 100 || this.position.y + this.h >= 475) {
            // collision detected!
            //text("HIT!",200,200);
            if (this.position.x < 115){
                this.xdir *= -1;
            }
            if (this.position.x + this.w > 675){
                this.xdir *= -1;
            }
            if (this.position.y < 100){
                this.ydir *= -1;
            }
            if (this.position.y + this.h > 475){
                this.ydir *= -1;
            }
        }
        this.position.x += this.speed*this.xdir;
        this.position.y += this.speed*this.ydir;
    };

    ratObj.prototype.draw = function(){
        if (!this.drawn){
            this.drawn = true;
            this.moveTime = frameCount;
        }
        if (this.hit){
            //tint(255, 0,0,250);
            noStroke();
            fill(255,0,0,50);
            image(ratImg, this.position.x, this.position.y, this.w, this.h);
            rect(this.position.x, this.position.y, this.w, this.h, 50);
            noFill();
            //noTint();
            this.hitTime++;
            if (this.hitTime === 5){
                this.hit = 0;
                this.hitTime = 0;
            }
        }
        else {
            image(ratImg, this.position.x, this.position.y, this.w, this.h);
        }

    };

    ratObj.prototype.move = function(){
        //ellipse(this.position.x+this.w/2, this.position.y+this.h/2, 360,360);

        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
        this.acceleration.set(0,0);

        checkCollisionWalls(this);

        if (frameCount > (this.moveTime + this.moveWait) && this.drawn){
            this.moveTime = frameCount;
            if (dist(this.position.x+this.w/2, this.position.y+this.h/2, player.position.x+player.w/2, player.position.y+player.h/2) <= 180) {
                //chase
                this.step.set(player.position.x - this.position.x, player.position.y - this.position.y);
                this.step.normalize();
                var angle = this.step.heading();
                console.log("step: ", angle);
                this.acceleration.set(cos(angle), sin(angle));
                this.acceleration.mult(12);
            }
            else{
                //wander
                var angle = random(0,2*PI);
                this.acceleration.set(cos(angle), sin(angle));
                this.acceleration.mult(12);

            }
            //this.position.x++;
            //apply one force
        }
        this.velocity.add(this.acceleration);
        this.friction.set(this.velocity.x, this.velocity.y);
        this.friction.mult(this.frictionCoeff);
        this.velocity.add(this.friction);
        if (!this.right || !this.left){
            this.velocity.x = 0;
        }
        if (!this.up || !this.down){
            this.velocity.y = 0;
        }

        this.position.add(this.velocity);



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
        //rect(this.position.x +12, this.position.y, 30, this.h);
        if (this.hit){
            //text("HIT!", 400, 400);
            //tint(255,0,0,250);
            noStroke();
            fill(255,0,0,50);
            //rect(this.position.x, this.position.y, this.w, this.h);
            image(playerImg, this.position.x, this.position.y, this.w, this.h);
            rect(this.position.x+15, this.position.y, 20, this.h);
            noFill();
            //noTint();
            this.hitCount++;
            if (this.hitCount === 10){
                this.hit = 0;
                this.hitCount = 0;
            }

        }
        else {
            if (frameCount > (this.hitTime + this.hitBuffer) || frameCount < this.hitBuffer) {
                image(playerImg, this.position.x, this.position.y, this.w, this.h);
            }
            else {
                //blink
                if (!this.blink){
                    this.blinkCount++;
                    if (this.blinkCount === 3){
                        this.blinkCount = 0;
                        this.blink = 1;
                    }
                }
                else{
                    image(playerImg, this.position.x, this.position.y, this.w, this.h);
                    this.blinkCount++;
                    if (this.blinkCount === 3){
                        this.blinkCount = 0;
                        this.blink = 0;
                    }
                }
                //image(playerImg, this.position.x, this.position.y, this.w, this.h);
            }
        }
        //image(playerImg, this.position.x, this.position.y, this.w, this.h);
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

    playerObj.prototype.checkEnemies = function(){
        for (var i=0; i<gamestate.drawRoomData.enemies.length; i++){
            if (this.position.x + 12 < gamestate.drawRoomData.enemies[i].position.x + gamestate.drawRoomData.enemies[i].w && this.position.x + this.w - 8 > gamestate.drawRoomData.enemies[i].position.x && this.position.y < gamestate.drawRoomData.enemies[i].position.y + gamestate.drawRoomData.enemies[i].h && this.position.y + this.h > gamestate.drawRoomData.enemies[i].position.y) {
                this.life -= gamestate.drawRoomData.enemies[i].damage;
                this.hit = 1;
                this.hitTime = frameCount;
                if (this.life <= 0){
                    //GAMEOVER
                    state = "gameover";
                }

            }
        }
    };

    playerObj.prototype.checkDoors = function() {
        //console.log(gamestate.level.playerRoomLocation.x + " " + gamestate.level.playerRoomLocation.y)
        for(var i = 0; i < gamestate.drawRoomData.doors.length; ++i) {
            var current_door = gamestate.drawRoomData.doors[i];
            var door_direction = current_door.direction;
            if (this.position.x < current_door.x + current_door.w && this.position.x + this.w > current_door.x && this.position.y < current_door.y + current_door.h && this.position.y + this.h > current_door.y) {
                if(current_door.open) {
                    switch(door_direction) {
                    /* Rough Door Locations
                     (375, 75, door_up, "up", 1));
                     (375, 475, door_down, "down", 1));
                     (75, 275, door_left, "left", 1));
                     (675, 275, door_right, "right", 1));
                     */

                    case "up":
                        //console.log("HIT");
                        gamestate.level.playerRoomLocation.x--;
                        //Reset player location to the bottom of a room
                        this.position = new PVector(375, 470 - this.h);
                        break;
                    case "down":
                        gamestate.level.playerRoomLocation.x++;
                        this.position = new PVector(375,  80 + this.h);
                        break;
                    case "left":
                        gamestate.level.playerRoomLocation.y--;
                        this.position = new PVector(670 - this.w, 275);
                        break;
                    case "right":
                        gamestate.level.playerRoomLocation.y++;
                        this.position = new PVector(80 + this.w, 275);
                        break;
                }
                }
            }
        }
    }

    playerObj.prototype.move = function () {
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
        this.acceleration.set(0, 0);

        //check for collisions here
        checkCollisionWalls(this);

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
        if (!this.right || !this.left){
            this.velocity.x = 0;
        }
        if (!this.up || !this.down){
            this.velocity.y = 0;
        }

        this.position.add(this.velocity);

        this.acceleration.set(0, 0);

        //check for enemies
        if (frameCount > (this.hitTime + this.hitBuffer)) {
            //this.hit = 0;
            this.checkEnemies();
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

    player = new playerObj(375, 275);

    map_data.prototype.resetGame = function() {
        if(this.reset === 1) {
            l01.enemies = [new ratObj(400, 200), new ratObj(300, 200), new ratObj(250, 300)];
            l02.enemies = [new ratObj(400, 200), new ratObj(300, 200)];
            l03.enemies = [new eyeballObj(400, 300)];
            l04.enemies = [new ratObj(500, 200), new ratObj(500, 300)];
            l05.enemies = [new ratObj(500, 200), new ratObj(500, 300)];
            l06.enemies = [new ratObj(500, 200), new ratObj(500, 300)];
            l07.enemies = [new ratObj(500, 200), new ratObj(400, 250)];
            player = new playerObj(375, 275);
            this.level.playerRoomLocation = new PVector(2,2);
            this.reset = 0;
        }
    }
    //l00.enemies = [new eyeballObj(400,300)];

    var gamestate = new map_data(level0);

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
        /*
        for (var i=0; i<enemies.length;i++){
            enemies[i].move();
            enemies[i].draw();
        }
        */
        //eye.move();
        //eye.draw();
        player.move();
        player.draw();
        player.shoot();
    };

    /* GAMEOVER */
    var drawGameOver = function(){
        stroke(0,0,0);
        strokeWeight(5);
        fill(130,130,130);
        rect(175, 200, 450, 200, 20);
        textSize(64);
        textAlign(CENTER);
        fill(0,0,0);
        text("GAME OVER",400, 300);
        textSize(32);
        text("Main Menu\nEnter", 400, 350);

        player = new playerObj(375,275);
        textAlign(LEFT);
        gamestate.reset = 1;
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
                /*
                if (keyCode === 32) {
                    //SPACE
                    rainSound.stop();
                    state = "test";
                    break;
                }
                */
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
            case "game":
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
            case "gameover":
                if (keyCode === ENTER) {
                    state = "menu";
                }
                break;
            /*
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
             */
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
            case "game":
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
                gamestate.resetGame();
                gamestate.run();
                player.move();
                player.draw();
                player.shoot();
                player.checkDoors();
                break;
            case "test":
                gamestate.run();
                drawTest();
                break;
            case "gameover":
                drawGameOver();
                break;
        }
        //drawSky();
    };

}};
