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

    var level1_layout =     [[9,9,9,9,9],
                             [9,9,9,9,9],
                             [9,9,9,0,1],
                             [8,9,9,9,2],
                             [7,6,5,4,3]];

    var level2_layout =     [[9,9,9,9,9],
                             [1,2,3,9,9],
                             [0,9,4,9,8],
                             [9,9,5,6,7],
                             [9,9,9,9,9]];

    var roomData = function(doors, enemies, boss, trophy, rolled) {
        this.doors = doors;
        this.enemies = enemies;
        this.seen = false;
        this.boss = boss;
        this.trophy = trophy;
        this.rolled = rolled;
        this.loot = [];
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

    var l00 = new roomData(level0_room0, [], false, false, true);
    var l01 = new roomData(level0_room1, [], false, false, false);
    var l02 = new roomData(level0_room2, [], false, false, false);
    var l03 = new roomData(level0_room3, [], true, false, false);
    var l04 = new roomData(level0_room4, [], false, false, false);
    var l05 = new roomData(level0_room5, [], false, false, false);
    var l06 = new roomData(level0_room6, [], false, false, false);
    var l07 = new roomData(level0_room7, [], false, false, false);
    var l08 = new roomData(level0_room8, [], false, true, false);

    //door layout = up, down, left, right
    var level1_room0 = [0, 0, 0, 1];
    var level1_room1 = [0, 1, 1, 0];
    var level1_room2 = [1, 1, 0, 0];
    var level1_room3 = [1, 0, 1, 0];
    var level1_room4 = [0, 0, 1, 1];
    var level1_room5 = [0, 0, 1, 1];
    var level1_room6 = [0, 0, 1, 1];
    var level1_room7 = [1, 0, 0, 1];
    var level1_room8 = [0, 1, 0, 0];

    var l10 = new roomData(level1_room0, [], false, false, true);
    var l11 = new roomData(level1_room1, [], false, false, false);
    var l12 = new roomData(level1_room2, [], false, false, false);
    var l13 = new roomData(level1_room3, [], false, false, false);
    var l14 = new roomData(level1_room4, [], false, false, false);
    var l15 = new roomData(level1_room5, [], false, false, false);
    var l16 = new roomData(level1_room6, [], false, false, false);
    var l17 = new roomData(level1_room7, [], false, true, false);
    var l18 = new roomData(level1_room8, [], true, false, false);

    //door layout = up, down, left, right
    var level2_room0 = [1, 0, 0, 0];
    var level2_room1 = [0, 1, 0, 1];
    var level2_room2 = [0, 0, 1, 1];
    var level2_room3 = [0, 1, 1, 0];
    var level2_room4 = [1, 1, 0, 0];
    var level2_room5 = [1, 0, 0, 1];
    var level2_room6 = [0, 0, 1, 1];
    var level2_room7 = [1, 0, 1, 0];
    var level2_room8 = [0, 1, 0, 0];

    var l20 = new roomData(level2_room0, [], false, false, true);
    var l21 = new roomData(level2_room1, [], false, false, false);
    var l22 = new roomData(level2_room2, [], false, false, false);
    var l23 = new roomData(level2_room3, [], false, false, false);
    var l24 = new roomData(level2_room4, [], false, false, false);
    var l25 = new roomData(level2_room5, [], false, false, false);
    var l26 = new roomData(level2_room6, [], false, false, false);
    var l27 = new roomData(level2_room7, [], false, true, false);
    var l28 = new roomData(level2_room8, [], true, false, false);

    var level = function(layout, rooms, x, y) {
        this.layout = layout;
        this.rooms = rooms;
        this.playerRoomLocation = new PVector(x, y);
    }

    var level0 = new level(level0_layout, [l00, l01, l02, l03, l04, l05, l06, l07, l08], 2, 2);
    var level1 = new level(level1_layout, [l10, l11, l12, l13, l14, l15, l16, l17, l18], 2, 3);
    var level2 = new level(level2_layout, [l20, l21, l22, l23, l24, l25, l26, l27, l28], 2, 0);

    var room = function(loaded, door_locs) {
        this.walls = [];
        this.door_locs = door_locs;
        this.floor = [];
        this.doors = [];
        this.enemies = [];
        this.loaded = loaded;
        this.loot = [];
        this.rolled = false;
        this.boss = false;
        this.trophy = false;
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
        background(0, 0, 0);
        for (var i = 0; i < this.walls.length; ++i) {
            this.walls[i].draw();
        }
        for (var i = 0; i < this.floor.length; ++i) {
            this.floor[i].draw();
        }
        for (var i = 0; i < this.doors.length; ++i) {
            if (this.enemies.length > 0) {
                this.doors[i].open = 0;
            } else {
                this.doors[i].open = 1;
            }
            this.doors[i].draw();
        }
        for (var i = 0; i < this.enemies.length; ++i) {
            this.enemies[i].move();
            this.enemies[i].draw();
        }
        for (var i = 0; i < gamestate.currRoom.loot.length; ++i) {
            //this.loot[i].draw();
            gamestate.currRoom.loot[i].draw();
            /*
            if (gamestate.currRoom.loot[i].available){
                gamestate.currRoom.loot[i].draw();
            }
            else{
                gamestate.currRoom.loot.splice(i, 1);
            }
            */

            if (gamestate.currRoom.loot[i].spliceBool){
                gamestate.currRoom.loot.splice(i, 1);
            }
        }
    }

    room.prototype.rollLoot = function(){
        console.log("ROLLING LOOT");
        this.rolled = true;

        if (allItems.length === 0) {
            resetItems();
        }

        if (!this.boss) {
            if (!this.trophy) {
                var randomPowerUp = random(0, 100);
                if (randomPowerUp <= player.luck) {
                    //get item
                    console.log("GOT AN ITEM!");
                    if (allItems.length > 0) {
                        var randomIndex = floor(random(0, allItems.length));
                        gamestate.currRoom.loot.push(allItems[randomIndex]);
                        allItems.splice(randomIndex, 1);
                    }
                }
                else {
                    //player did not get power up
                    //roll for potion
                    if(randomPowerUp <= player.luck + 35){
                        console.log("GOT A POTION!");
                        var newPotion = new itemObj("Health Potion", potionImg, "potion");
                        gamestate.currRoom.loot.push(newPotion);
                    }
                }
            }
            else {
                //trophy room
                console.log("TROPHY ROOM");
                console.log("LENGTH: ", allItems.length);
                if (allItems.length > 0) {
                    var randomIndex = floor(random(0, allItems.length));
                    console.log("INDEX: ", randomIndex);
                    gamestate.currRoom.loot.push(allItems[randomIndex]);
                    allItems.splice(randomIndex, 1);
                }
            }
        }
        else{
            //boss room load item and stairs.
            //load item
            console.log("BOSS ROOM");
            console.log("LENGTH: ", allItems.length);
            if (allItems.length > 0) {
                console.log("INDEX: ", randomIndex);
                var randomIndex = floor(random(0, allItems.length));
                gamestate.currRoom.loot.push(allItems[randomIndex]);
                allItems.splice(randomIndex, 1);
            }

            //load stairs
            var stairs = new itemObj("Stairs", stairIMG, "stairs");
            gamestate.currRoom.loot.push(stairs);
        }
    };

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
        this.drawRoomData.boss = this.currRoom.boss;
        this.drawRoomData.trophy = this.currRoom.trophy;
        this.drawRoomData.rolled = this.currRoom.rolled;
        this.drawRoomData.loot = this.currRoom.loot;
        this.drawRoomData.load();
        this.drawRoomData.draw();
        if (!this.drawRoomData.rolled && this.drawRoomData.enemies.length === 0){
            this.drawRoomData.rollLoot();
            this.currRoom.rolled = true;
            /*
            if (this.drawnRoomData.boss){

            }

            */
        }
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
    var shootSound = new sound("./sounds/shoot.wav");

    var hitSound = new sound("./sounds/grunt.wav");
    var deathSound = new sound("./sounds/death.wav");
    var fanfareSound = new sound("./sounds/fanfare.wav");

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
        if (soundBool === 1) {
            soundButton.textOption = "Sound: ON";
        } else if (soundBool === -1) {
            soundButton.textOption = "Sound: OFF";
        }
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
    //var fullheartImg = loadImage("./images/fullheart.png");
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
    var skullIMG = loadImage("./images/skull.png");
    var trophyIMG = loadImage("./images/trophy.png");
    var acid_hurt = loadImage("./images/acid_hurt.png");
    var archer_hurt = loadImage("./images/archer_hurt.png");
    var health2 = loadImage("./images/health2.png");
    var health1 = loadImage("./images/health1.png");
    var knight_hurt = loadImage("./images/knight_hurt.png");
    var distance2 = loadImage("./images/distance2.png");
    var rat_hurt = loadImage("./images/rat_hurt.png");
    var distance1 = loadImage("./images/distance1.png");
    var damage2 = loadImage("./images/damage2.png");
    var damage1 = loadImage("./images/damage1.png");
    var speed2 = loadImage("./images/speed2.png");
    var speed1 = loadImage("./images/speed1.png");
    var shotspeed1 = loadImage("./images/shotspeed1.png");
    var shotspeed2 = loadImage("./images/shot_speed2.png");
    var luck2 = loadImage("./images/luck2.png");
    var luck1 = loadImage("./images/luck1.png");
    var player_hurt = loadImage("./images/player_hurt.png");
    var drawCredits = function() {
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
    var pausedTime = 0;
    var pausedCurrFrame = 0;


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


    var arrowObj = function(x, y, direction, time, player, vx, vy, damage) {
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

        this.damage = damage;
        this.pausedTime = 0;
        this.pausedCurrFrame = 0;
    };

    arrowObj.prototype.checkCollision = function(){
        var result = false;
        if (this.player){
            //shot by player
            for (var i=0; i<gamestate.drawRoomData.enemies.length; i++){
                if (this.position.x <= gamestate.drawRoomData.enemies[i].position.x + gamestate.drawRoomData.enemies[i].w && this.position.x + this.w >= gamestate.drawRoomData.enemies[i].position.x && this.position.y <= gamestate.drawRoomData.enemies[i].position.y + gamestate.drawRoomData.enemies[i].h && this.position.y + this.h >= gamestate.drawRoomData.enemies[i].position.y) {
                    // collision detected!
                    result = true;
                    gamestate.drawRoomData.enemies[i].life -= this.damage;
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
            if(!player.invincible) {
                if (this.position.x <= player.position.x + player.w - 8 && this.position.x + this.w >= player.position.x + 12 && this.position.y <= player.position.y + player.h && this.position.y + this.h >= player.position.y) {
                    // collision detected!
                    console.log("ARROW HIT US");
                    if (soundBool === 1) {
                        hitSound.play();
                    }
                    result = true;
                    player.life -= this.damage;
                    player.hit = 1;
                    player.hitTime = frameCount;
                    player.invincible = true;
                    if (player.life <= 0) {
                        //GAMEOVER
                        if (soundBool === 1) {
                            deathSound.play();
                        }
                        state = "gameover";
                    }
                }
            }
        }

        return result;
    };

    arrowObj.prototype.draw = function(){
        if (frameCount >= (this.currFrameCount+this.timeEnd+this.pausedTime)){
            this.pausedTime = 0;
            return false;
        }
        else{
            //image(arrow, this.position.x, this.position.y, 20, 10);
            if (this.player) {
                this.up = true;
                this.down = true;
                this.left = true;
                this.right = true;
                var hit = this.checkCollision();
                if (hit) {
                    return false;
                }
                checkCollisionWalls(this);

                var step = new PVector(0, 0);
                step.add(this.velocity);
                step.mult(0.25);
                this.position.add(step);
                switch (this.direction) {
                    case 0: //right
                        if (this.right) {
                            image(arrow, this.position.x, this.position.y, this.w, this.h);
                            this.position.x += this.speed;
                        } else {
                            return false;
                        }
                        break;
                    case 1:
                        if (this.down) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(PI / 2);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.y += this.speed;
                        } else {
                            return false;
                        }
                        break;
                    case 2:
                        if (this.left) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(PI);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.x -= this.speed;
                        } else {
                            return false;
                        }
                        break;
                    case 3:
                        if (this.up) {
                            pushMatrix();
                            translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                            rotate(-PI / 2);
                            image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);
                            popMatrix();
                            this.position.y -= this.speed;
                        } else {
                            return false;
                        }
                        break;
                }
            }
            else{
                //shot by not player
                //rotate innit
                this.up = true;
                this.down = true;
                this.left = true;
                this.right = true;


                var hit = this.checkCollision();
                if (hit) {
                    return false;
                }
                checkCollisionWalls(this);

                if(!this.up || !this.down || !this.right || !this.left){
                    return false;
                }
                var step = new PVector(0, 0);
                step.add(this.velocity);
                step.mult(0.25);
                this.position.add(step);


                pushMatrix();
                translate(this.position.x + this.w / 2, this.position.y + this.h / 2);
                rotate(this.direction);
                image(arrow, -this.w / 2, -this.h / 2, this.w, this.h);

                popMatrix();

                this.position.x += this.speed*cos(this.direction);
                this.position.y += this.speed*sin(this.direction);

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
        this.shotSpeed = 30;
        this.arrowDuration = 60;
        this.currFrameCount = 0; //time of shooting
        this.arrows = [];

        this.damage = 1;
        this.luck = 10;

        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.invincible = false;
    };

    var ratObj = function(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.step = new PVector(0,0);

        this.life = 4;
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

        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.arrowBool = false;
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


        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.arrowBool = false;
    };

    var knightObj = function(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.step = new PVector(0,0);

        this.life = 8;
        this.w = 50;
        this.h = 50;

        //collision
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        this.frictionCoeff = -0.1;
        this.friction = new PVector(0, 0);
        this.forceCoeff = 0.3;

        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;

        this.moveTime = frameCount;
        this.moveWait = 150;


        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.arrowBool = false;
    };

    var archerObj = function(x, y) {
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
        this.forceCoeff = 0.3;

        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;

        this.moveTime = frameCount;
        this.moveWait = 150;

        this.angle = 0;
        this.shotSpeed = 60;
        this.arrowDuration = 70;
        this.currFrameCount = 0; //time of shooting
        this.arrows = [];


        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.arrowBool = true;

        this.drawn = false;
    };

    var acidObj = function(x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.step = new PVector(0,0);

        this.w = 100;
        this.h = 100;
        this.speed = 1;
        this.life = 50;
        this.maxLife = 50;
        this.angle = PI/4;


        //collision
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;

        this.frictionCoeff = -0.1;
        this.friction = new PVector(0, 0);
        this.forceCoeff = 0.3;

        this.xdir = 1;
        this.ydir = 1;
        this.damage = 1;

        this.hit = 0;
        this.hitTime = 0;

        this.moveTime = frameCount;
        this.moveWait = 150;

        this.angle = 0;
        this.shotSpeed = 60;
        this.arrowDuration = 100;
        this.currFrameCount = 0; //time of shooting
        this.arrows = [];


        this.pausedTime = 0;
        this.pausedCurrFrame = 0;

        this.arrowBool = true;

        this.drawn = false;
    };

    acidObj.prototype.draw = function(){
        if (this.currFrameCount === 0){
            this.drawn = true;
            this.currFrameCount = frameCount;
        }
        stroke(0,0,0);
        strokeWeight(1);
        fill(0,0,0,150);
        ellipse(this.position.x +this.w/2, this.position.y+this.h*9/10, 90, this.h/2-10);
        noFill();
        if (this.hit){
            image(acid_hurt, this.position.x, this.position.y, this.w, this.h);

            //image(eyeImg, this.position.x, this.position.y, this.w, this.h);
            this.hitTime++;
            if (this.hitTime === 5){
                this.hit = 0;
                this.hitTime = 0;
            }
        }
        else {
            image(acidImg, this.position.x, this.position.y, this.w, this.h);
        }

        for (var i=0; i<this.arrows.length; i++){
            var alive = this.arrows[i].draw();
            if (!alive){
                this.arrows.splice(i,1);
            }
        }

        noStroke();
        fill(255,0,0);
        for (var i=0;i<this.life; i++){
            rect(300+i*4, 530, 4, 40);
        }
        fill(0,0,0);
        rect(400, 530, 1, 40);
        stroke(0,0,0);
        strokeWeight(5);
        noFill();
        rect(300, 530, 200, 40, 5);
        noStroke();
    };

    acidObj.prototype.move = function(){
        if (this.life <= this.maxLife && this.life > this.maxLife/2){
            //first phase
            if (this.currFrameCount < (frameCount - this.shotSpeed - this.pausedTime) && this.drawn) {
                this.pausedTime = 0;
                /*
                if (soundBool === 1) {
                    shootSound.play();
                }
                */
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + this.w, this.position.y + this.h/2, 0, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x + this.w/2, this.position.y + this.h, PI/2, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x, this.position.y + this.h/2, PI, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x + this.w/2, this.position.y, PI*3/2, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
            }
        }
        else{
            //second phase
            this.speed = 1.5;
            this.shotSpeed = 30;
            if (this.currFrameCount < (frameCount - this.shotSpeed - this.pausedTime) && this.drawn) {
                this.pausedTime = 0;
                /*
                if (soundBool === 1) {
                    shootSound.play();
                }
                */
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + this.w, this.position.y + this.h/2, 0, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x + this.w/2, this.position.y + this.h, PI/2, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x, this.position.y + this.h/2, PI, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x + this.w/2, this.position.y, PI*3/2, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));


                this.arrows.push(new arrowObj(this.position.x + this.w, this.position.y + this.h, PI/4, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x, this.position.y + this.h, PI*3/4, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x, this.position.y, PI*5/4, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
                this.arrows.push(new arrowObj(this.position.x + this.w, this.position.y, PI*7/4, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
            }


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

    archerObj.prototype.draw = function(){

        if (this.currFrameCount === 0){
            this.drawn = true;
            this.currFrameCount = frameCount;
        }

        if (this.hit){
            image(archer_hurt, this.position.x, this.position.y, this.w, this.h);

            this.hitTime++;
            if (this.hitTime === 5){
                this.hit = 0;
                this.hitTime = 0;
            }
        }
        else {
            image(archerImg, this.position.x, this.position.y, this.w, this.h);
        }

        for (var i=0; i<this.arrows.length; i++){
            var alive = this.arrows[i].draw();
            if (!alive){
                this.arrows.splice(i,1);
            }
        }
    };

    archerObj.prototype.shoot = function(){
        if (this.currFrameCount < (frameCount - this.shotSpeed - this.pausedTime) && this.drawn) {
            this.pausedTime = 0;
            if (soundBool === 1) {
                shootSound.play();
            }
            this.currFrameCount = frameCount;
            this.arrows.push(new arrowObj(this.position.x + this.w/2, this.position.y + this.h/2, this.angle, this.arrowDuration, false, this.velocity.x, this.velocity.y, this.damage));
        }
    };

    archerObj.prototype.move = function(){
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
        this.acceleration.set(0,0);

        checkCollisionWalls(this);

        this.step.set(player.position.x - this.position.x, player.position.y - this.position.y);
        this.step.normalize();
        this.angle = this.step.heading();
        //console.log("angle: ", this.angle);

        if(this.position.x - (player.position.x+player.w) < 250 && player.position.x - (this.position.x+this.w) < 250 && this.position.y - (player.position.y+player.h) < 250 && player.position.y - (this.position.y+this.h) < 250){
            //shoot
            //console.log("angle: ", this.angle);
            this.shoot();
        }
        else{
            //move

            this.acceleration.set(cos(this.angle), sin(this.angle));
            //console.log(this.acceleration);
            this.acceleration.mult(this.forceCoeff);
            //this.position.x++;
            //apply one force
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
        }
    };

    knightObj.prototype.draw = function(){
        if (this.hit){
            image(knight_hurt, this.position.x, this.position.y, this.w, this.h);

            this.hitTime++;
            if (this.hitTime === 5){
                this.hit = 0;
                this.hitTime = 0;
            }
        }
        else {
            image(knightImg, this.position.x, this.position.y, this.w, this.h);
        }
    };

    knightObj.prototype.move = function(){
        this.up = true;
        this.down = true;
        this.left = true;
        this.right = true;
        this.acceleration.set(0,0);

        checkCollisionWalls(this);

        this.step.set(player.position.x - this.position.x, player.position.y - this.position.y);
        this.step.normalize();
        var angle = this.step.heading();
        //console.log("angle: ", angle);
        this.acceleration.set(cos(angle), sin(angle));
        //console.log(this.acceleration);
        this.acceleration.mult(this.forceCoeff);
        //this.position.x++;
        //apply one force
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

        if (this.life <= this.maxLife && this.life >= this.maxLife*4/5){
            this.speed = 1.5
        }
        if (this.life < this.maxLife*4/5 && this.life >= this.maxLife*3/5){
            this.speed = 2
        }
        if (this.life < this.maxLife*3/5 && this.life >= this.maxLife*2/5){
            this.speed = 2.5
        }
        if (this.life < this.maxLife*2/5 && this.life >= this.maxLife*1/5){
            this.speed = 3
        }
        if (this.life < this.maxLife*1/5){
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
            image(rat_hurt, this.position.x, this.position.y, this.w, this.h);

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

        if (frameCount > (this.moveTime + this.moveWait + this.pausedTime) && this.drawn){
            this.pausedTime = 0;
            this.moveTime = frameCount;
            if (dist(this.position.x+this.w/2, this.position.y+this.h/2, player.position.x+player.w/2, player.position.y+player.h/2) <= 240) {
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
            //rect(this.position.x, this.position.y, this.w, this.h);
            image(player_hurt, this.position.x, this.position.y, this.w, this.h);

            this.hitCount++;
            if (this.hitCount === 10){
                this.hit = 0;
                this.hitCount = 0;
            }

        }
        else {
            var pauseBuffer = 0;
            if (pausedTime > 0){
                if (frameCount - pausedTime - pausedCurrFrame < 10){
                    pauseBuffer = 10;
                }
            }
            if (frameCount > (this.hitTime + this.hitBuffer + pauseBuffer) || frameCount < this.hitBuffer) {
                this.invincible = false;
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
                if (soundBool === 1) {
                    hitSound.play();
                }
                this.life -= gamestate.drawRoomData.enemies[i].damage;
                this.hit = 1;
                this.hitTime = frameCount;
                if (this.life <= 0){
                    //GAMEOVER
                    if (soundBool === 1) {
                        deathSound.play();
                    }
                    state = "gameover";
                }

            }
        }
    };

    playerObj.prototype.checkDoors = function() {
        console.log("X: " +  gamestate.level.playerRoomLocation.x + "Y: " +  gamestate.level.playerRoomLocation.y);
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
        if (frameCount > (this.hitTime + this.hitBuffer + this.pausedTime)) {
            //this.hit = 0;
            this.pausedTime = 0;
            this.checkEnemies();
        }


    };

    playerObj.prototype.shoot = function(){
        if (this.currFrameCount < (frameCount - this.shotSpeed)) {
            if (this.shootRight === 1) {
                if (soundBool === 1) {
                    shootSound.play();
                }
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + this.w, this.position.y + this.h / 2, 0, this.arrowDuration, true, this.velocity.x, this.velocity.y, this.damage));
            }
            if (this.shootLeft === 1) {
                if (soundBool === 1) {
                    shootSound.play();
                }
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x, this.position.y + this.h / 2, 2, this.arrowDuration, true, this.velocity.x, this.velocity.y, this.damage));
            }
            if (this.shootUp === 1) {
                if (soundBool === 1) {
                    shootSound.play();
                }
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + this.w / 2, this.position.y, 3, this.arrowDuration, true, this.velocity.x, this.velocity.y, this.damage));
            }
            if (this.shootDown === 1) {
                if (soundBool === 1) {
                    shootSound.play();
                }
                this.currFrameCount = frameCount;
                this.arrows.push(new arrowObj(this.position.x + this.w / 2, this.position.y + this.h, 1, this.arrowDuration, true, this.velocity.x, this.velocity.y, this.damage));
            }
        }
    };

    player = new playerObj(375, 275);

    map_data.prototype.resetGame = function() {
        if(this.reset === 1) {
            gamestate.level = level0;
            //l01.enemies = [new ratObj(400, 200), new ratObj(300, 200), new ratObj(250, 300)];
            l01.enemies = [new ratObj(400, 200), new ratObj(300, 200)];
            l02.enemies = [new ratObj(400, 200), new ratObj(300, 200)];
            l03.enemies = [new eyeballObj(400, 300)];
            l04.enemies = [new ratObj(400, 200), new ratObj(300, 200),new ratObj(200, 300)];
            l05.enemies = [new ratObj(200, 200), new ratObj(400, 300)];
            l06.enemies = [new ratObj(500, 200), new ratObj(500, 300)];
            l07.enemies = [new knightObj(200, 200), new knightObj(600, 200)];
            l01.rolled = false;
            l02.rolled = false;
            l03.rolled = false;
            l04.rolled = false;
            l05.rolled = false;
            l06.rolled = false;
            l07.rolled = false;
            l08.rolled = false;
            l01.loot = [];
            l02.loot = [];
            l03.loot = [];
            l04.loot = [];
            l05.loot = [];
            l06.loot = [];
            l07.loot = [];
            l08.loot = [];

            l11.enemies = [new knightObj(400, 200), new knightObj(400, 350)];
            l12.enemies = [new ratObj(400, 200), new ratObj(300, 200), new ratObj(400, 300), new ratObj(300, 300)];
            l13.enemies = [new knightObj(200, 350), new knightObj(400, 350), new ratObj(300, 200)];
            l14.enemies = [new archerObj(375, 150), new archerObj(375, 400)];
            l15.enemies = [new archerObj(400, 300), new knightObj(200, 300)];
            l16.enemies = [new archerObj(500, 300), new knightObj(400, 300), new archerObj(200, 300)];
            l18.enemies = [new acidObj(350, 130)];
            l11.rolled = false;
            l12.rolled = false;
            l13.rolled = false;
            l14.rolled = false;
            l15.rolled = false;
            l16.rolled = false;
            l17.rolled = false;
            l18.rolled = false;
            l11.loot = [];
            l12.loot = [];
            l13.loot = [];
            l14.loot = [];
            l15.loot = [];
            l16.loot = [];
            l17.loot = [];
            l18.loot = [];

            resetItems();

            for(var i = 0; i < level0.layout.length; ++i) {
                for(var j = 0; j < level0.layout[0].length; ++j) {
                    var room = level0.layout[i][j];
                    if (room != 9) {
                        if (level0.rooms[room].seen) {
                            level0.rooms[room].seen = false;
                        }
                    }
                }
            }

            for(var i = 0; i < level1.layout.length; ++i) {
                for(var j = 0; j < level1.layout[0].length; ++j) {
                    var room = level1.layout[i][j];
                    if (room != 9) {
                        if (level1.rooms[room].seen) {
                            level1.rooms[room].seen = false;
                        }
                    }
                }
            }

            player = new playerObj(375, 275);
            level0.playerRoomLocation = new PVector(2, 2);
            level1.playerRoomLocation = new PVector(2, 3);
            this.reset = 0;
        }
    }

    var gamestate = new map_data(level0);

        /*  MINI MAP */

    var minimap = function() {
        this.level = gamestate.level.layout;
    }

    minimap.prototype.bfs = function() {
        /*
        this.roomSpot = this.level.layout[this.level.playerRoomLocation.x][this.level.playerRoomLocation.y];
        this.currRoom = this.level.rooms[this.roomSpot];
         */
        if(!gamestate.currRoom.seen) {
            gamestate.currRoom.seen = true;
        }
        //bfs of depth 1
        //safeguarding against accessing array locations that dont exist
        if(gamestate.level.playerRoomLocation.x != 0) {
            var north = gamestate.level.layout[gamestate.level.playerRoomLocation.x-1][gamestate.level.playerRoomLocation.y];
            if(north != 9) {
                //console.log("NORTH: " + gamestate.level.rooms[north].seen);
                if(!gamestate.level.rooms[north].seen) {
                    gamestate.level.rooms[north].seen = true;
                }
            }
        }
        if(gamestate.level.playerRoomLocation.x != gamestate.level.layout.length - 1) {
            var south = gamestate.level.layout[gamestate.level.playerRoomLocation.x+1][gamestate.level.playerRoomLocation.y];
            if(south != 9) {
               //console.log("SOUTH: " + gamestate.level.rooms[south].seen);
                if(!gamestate.level.rooms[south].seen) {
                    gamestate.level.rooms[south].seen = true;
                }
            }
        }
        if(gamestate.level.playerRoomLocation.y != gamestate.level.layout[0].length - 1) {
            var east = gamestate.level.layout[gamestate.level.playerRoomLocation.x][gamestate.level.playerRoomLocation.y + 1];
            if(east != 9) {
                //console.log("EAST: " + gamestate.level.rooms[east].seen);
                if(!gamestate.level.rooms[east].seen) {
                    gamestate.level.rooms[east].seen = true;
                }
            }
        }
        if(gamestate.level.playerRoomLocation.y != 0) {
            var west = gamestate.level.layout[gamestate.level.playerRoomLocation.x][gamestate.level.playerRoomLocation.y-1];
            if(west != 9) {
                //console.log("WEST: " + gamestate.level.rooms[west].seen);
                if(!gamestate.level.rooms[west].seen) {
                    gamestate.level.rooms[west].seen = true;
                }
            }
        }
    }

    minimap.prototype.show = function() {
        for(var i = 0; i < gamestate.level.layout.length; ++i) {
            for(var j = 0; j < gamestate.level.layout[0].length; ++j) {
                var room = gamestate.level.layout[i][j];
                if(room != 9) {
                    if(gamestate.level.rooms[room].seen) {
                        //console.log("HERE");
                        noFill();
                        stroke(255, 255, 255);
                        strokeWeight(1);
                        rect(j*20 + 675, i*20 + 35, 20, 20, 5);
                        if(gamestate.level.rooms[room].boss) {
                            //draw boss
                            image(skullIMG, j*20 + 678, i*20 + 38, 15, 15);
                        }
                        if(gamestate.level.rooms[room].loot.length > 0 || (gamestate.level.rooms[room].trophy && gamestate.level.rooms[room].loot.length > 0)) {
                            //draw loot symbol
                            image(trophyIMG, j*20 + 678, i*20 + 39, 15, 15);
                        }
                        if(i == gamestate.level.playerRoomLocation.x && j == gamestate.level.playerRoomLocation.y) {
                            fill(255, 0, 0);
                            noStroke();
                            ellipse(j*20 + 685, i*20 + 46, 5, 5);
                        }
                    }
                }
            }
        }
    }

    var mmap = new minimap();
    /*  END MINI MAP */

    /*  LOOT SYSTEM AND ITEMS  */

    var itemObj = function(name, img, stat){
        this.name = name;
        this.img = img;
        this.stat = stat;

        if(stat === "stairs"){
            this.x = 625;
            this.y = 425;
            this.w = 50;
            this.h = 50;
        }
        else {
            this.x = 375;
            this.y = 275;
            this.w = 50;
            this.h = 50;
        }

        this.available = true;
        this.currFrameCount = 0;

        this.spliceBool = false;
        this.showNameTime = 120;
    };

    var allItems = [];

    //var stairs = new itemObj("Stairs", stairIMG, "stairs");

    var resetItems = function(){
        allItems = [new itemObj("Heart Crystal", health1, "health"), new itemObj("Medical Supplies", health2, "health"),
                    new itemObj("Holy Crossbow", damage1, "damage"), new itemObj("Crossbow String", damage2, "damage"),
                    new itemObj("Weight Reduction", speed1, "speed"), new itemObj("Hermes Boots", speed2, "speed"),
                    new itemObj("Double Tap", shotspeed1, "shotSpeed"), new itemObj("Cartridges", shotspeed2, "shotSpeed"),
                    new itemObj("Distance Up", distance1, "shotLength"), new itemObj("Rocket Arrows", distance2, "shotLength"),
                    new itemObj("4 Leaf Clover", luck1, "luck"), new itemObj("Lucky Dice", luck2, "luck")];
    };

    itemObj.prototype.drawName = function(){
        fill(130, 130, 130);
        strokeWeight(1);
        stroke(0,0,0);
        rect(150, 100, 500, 100, 50);

        textAlign(CENTER);
        textSize(50);
        fill(0,0,0);
        text(this.name, 400, 145);

        textSize(36);
        switch (this.stat) {
            case "health":
                text("+ Max Health +", 400, 190);
                break;
            case "damage":
                text("+ Damage +", 400, 190);
                break;
            case "speed":
                text("+ Speed +", 400, 190);
                break;
            case "shotSpeed":
                text("+ Shot Speed +", 400, 190);
                break;
            case "shotLength":
                text("+ Shot Length +", 400, 190);
                break;
            case "luck":
                text("+ Luck +", 400, 190);
                break;
        }
        textAlign(LEFT);
    };

    itemObj.prototype.checkCollected = function(){
        if (player.position.x + 12 < this.x + this.w && player.position.x + player.w - 8 > this.x && player.position.y < this.y + this.h && player.position.y + player.h > this.y) {
            if(this.stat === "potion"){
                if(player.life === player.maxLife){
                    //do nothing
                    //might need to do something if loading displaying weird
                }
                else if (player.life === player.maxLife - 1){
                    console.log("COLLECTED POTION");
                    player.life += 1;
                    this.available = false;
                    this.splice = true;
                }
                else{
                    console.log("COLLECTED POTION");
                    player.life += 2;
                    this.available = false;
                    this.splice = true;
                }
            }
            else if (this.stat === "stairs"){
                console.log("STAIRS");
                //do the things with stairs
                if(gamestate.level === level0) {
                    gamestate.level = level1;
                    player.position = new PVector(375, 275);
                    this.available = false;
                    this.splice = true;
                } else if(gamestate.level === level1) {

                    //gamestate.level = level2;
                    player.position = new PVector(375, 275);
                    this.available = false;
                    this.splice = true;
                    state = "win";
                }
            }
            else{
                //this.drawName();
                this.currFrameCount = frameCount;
                console.log("COLLECTED LOOT");
                if (soundBool === 1) {
                    fanfareSound.play();
                }

                switch (this.stat) {
                    case "health":
                        player.maxLife += 2;
                        player.life += 2;
                        break;
                    case "damage":
                        player.damage++;
                        break;
                    case "speed":
                        player.maxSpeed++;
                        break;
                    case "shotSpeed":
                        player.shotSpeed -= 5;
                        break;
                    case "shotLength":
                        player.arrowDuration += 20;
                        break;
                    case "luck":
                        player.luck += 10;
                        break;
                }
                this.available = false;
                textAlign(LEFT);
            }
        }
    };

    itemObj.prototype.draw = function(){
        if (this.available){
            //console.log("DRAWING ITEM ", this.name);
            //image(img, this.x, this.y, this.w, this.h);
            image(this.img, this.x, this.y, this.w, this.h);
            /*
            stroke(0,0,0);
            strokeWeight(1);
            if (this.stat !== "potion" && this.stat !== "stairs") {
                console.log("DRAWING ITEM ", this.name);
                fill(this.color[0], this.color[1], this.color[2]);
                rect(this.x, this.y, this.w, this.h);
            }
            else{
                image(this.img, this.x, this.y, this.w, this.h);
            }
            */

            this.checkCollected();
        }
        else {
            if (this.stat !== "potion" && this.stat !== "stairs") {
                if (frameCount < this.currFrameCount + this.showNameTime && frameCount > 60) {
                    //draw name and stuff
                    this.drawName();
                }
                if (frameCount >= this.currFrameCount + this.showNameTime && frameCount > 60) {
                    //draw name and stuff
                    this.spliceBool = true;
                }
            }
            else if (this.stat === "potion") {
                this.spliceBool = true;
            }
        }
    };

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

    var Pmenu = function (state) {
        this.state = state;
    }

    var pauseMenu = new Pmenu(0);
    var resumeButton = new buttonMenuObj(400, 300, "unselected", "Resume");
    var exitButton = new buttonMenuObj(400, 360, "unselected", "Exit");
    var soundPButton = new buttonMenuObj(400, 420, "unselected", "Sound: ON");

    var cyclePauseMenu = function (state) {
        switch (state) {
            case 0:
                resumeButton.state = "selected";
                exitButton.state = "unselected";
                soundPButton.state = "unselected";
                fill(255,0,0);
                //triangle(60, 328, 60 + 30, 328 + 15, 60, 328 + 30);
                var arrow = new selectorMenuObj(resumeButton.x - 100, resumeButton.y + 8);
                break;
            case 1:
                exitButton.state = "selected";
                resumeButton.state = "unselected";
                soundPButton.state = "unselected";
                //triangle(60, 388, 60 + 30, 388 + 15, 60, 388 + 30);
                var arrow = new selectorMenuObj(exitButton.x - 100, exitButton.y + 8);
                break;
            case 2:
                exitButton.state = "unselected";
                resumeButton.state = "unselected";
                soundPButton.state = "selected";
                //triangle(60, 448, 60 + 30, 448 + 15, 60, 448 + 30);
                var arrow = new selectorMenuObj(soundPButton.x - 100, soundPButton.y + 8);
                break;
        }
    };

    var drawPauseScreen = function(){
        stroke(0,0,0);
        strokeWeight(5);
        fill(130,130,130);
        rect(100, 100, 600, 400, 20);
        textSize(64);
        textAlign(CENTER);
        fill(0,0,0);
        text("PAUSED",400, 175);
        image(playerImg, 125, 325, 150, 150);

        textSize(24);
        //STATS
        text("Damage: " + player.damage,250, 215);
        text("Speed: " + player.maxSpeed,250, 245);
        text("Shot Speed: " + 1/(player.shotSpeed/60),250, 275);

        text("Max Health: " + player.maxLife,550, 215);
        text("Shot Length: " + player.arrowDuration,550, 245);
        text("Luck: " + player.luck + "%",550, 275);


        textAlign(LEFT);

        strokeWeight(1);
        cyclePauseMenu(pauseMenu.state);
        resumeButton.draw();
        exitButton.draw();
        if (soundBool === 1) {
            soundPButton.textOption = "Sound: ON";
        } else if (soundBool === -1) {
            soundPButton.textOption = "Sound: OFF";
        }
        soundPButton.draw();

    };

    var drawWin = function () {
        stroke(0,0,0);
        strokeWeight(5);
        fill(130,130,130);
        rect(100, 100, 600, 400, 20);
        textSize(64);
        textAlign(CENTER);
        fill(0,0,0);
        text("YOU WIN!",400, 175);
        image(playerImg, 125, 325, 150, 150);

        textSize(24);
        //STATS
        text("Damage: " + player.damage,250, 215);
        text("Speed: " + player.maxSpeed,250, 245);
        text("Shot Speed: " + 1/(player.shotSpeed/60),250, 275);

        text("Max Health: " + player.maxLife,550, 215);
        text("Shot Length: " + player.arrowDuration,550, 245);
        text("Luck: " + player.luck + "%",550, 275);


        textSize(32);
        text("Main Menu\nEnter", 550, 450);

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
                if (keyCode === 80 || keyCode === 112) { // P or p
                    //state = "paused";
                    pauseMenu.state = 0;
                    player.pausedCurrFrame = frameCount;
                    for(var i=0; i<player.arrows.length; i++){
                        player.arrows[i].pausedCurrFrame = frameCount;
                    }
                    for(var i=0; i<gamestate.currRoom.enemies.length; i++){
                        if (gamestate.currRoom.enemies[i].arrowBool){
                             for(var e=0; e<gamestate.currRoom.enemies[i].arrows.length; e++) {
                                gamestate.currRoom.enemies[i].arrows[e].pausedCurrFrame = frameCount;
                             }
                        }
                        gamestate.currRoom.enemies[i].pausedCurrFrame = frameCount;
                    }
                    state = "paused";
                }

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
                if (player.currFrameCount < (frameCount - player.shotSpeed)) {
                    if (keyCode === RIGHT) {
                        player.shootRight = 1;
                    } else if (keyCode === LEFT) {
                        player.shootLeft = 1;
                    } else if (keyCode === UP) {
                        player.shootUp = 1;
                    } else if (keyCode === DOWN) {
                        player.shootDown = 1;
                    }
                }
                break;
            case "gameover":
                if (keyCode === ENTER) {
                    state = "menu";
                }
                break;
            case "win":
                if (keyCode === ENTER) {
                    state = "menu";
                }
                break;
            case "paused":
                console.log("state: ", pauseMenu.state);
                if (keyCode === 110 || keyCode === 78){ //n or N
                    console.log("GOD MODE ENABLED");
                    player.damage = 10;
                    player.shotSpeed = 15;
                    player.maxLife = 14;
                    player.life = 14;
                    player.luck = 50;
                    player.arrowDuration = 80;
                    player.maxSpeed = 5;
                }
                if (keyCode === UP) {
                    if (soundBool === 1) {
                        clickSound.play();
                    }
                    if (pauseMenu.state === 0) {
                        pauseMenu.state = 2;
                    } else {
                        pauseMenu.state--;
                    }
                } else if (keyCode === DOWN) {
                    if (soundBool === 1) {
                        clickSound.play();
                    }
                    if (pauseMenu.state === 2) {
                        pauseMenu.state = 0;
                    } else {
                        pauseMenu.state++;
                    }
                }
                if (keyCode === ENTER) {
                    switch (pauseMenu.state) {
                        case 0:
                            player.pausedTime = frameCount - player.pausedCurrFrame;
                            for(var i=0; i<player.arrows.length; i++){
                                player.arrows[i].pausedTime = frameCount - player.arrows[i].pausedCurrFrame;
                            }
                            for(var i=0; i<gamestate.currRoom.enemies.length; i++){
                                if (gamestate.currRoom.enemies[i].arrowBool){
                                     for(var e=0; e<gamestate.currRoom.enemies[i].arrows.length; e++) {
                                        gamestate.currRoom.enemies[i].arrows[e].pausedTime = frameCount - gamestate.currRoom.enemies[i].arrows[e].pausedCurrFrame;
                                     }
                                }
                                gamestate.currRoom.enemies[i].pausedTime = frameCount - gamestate.currRoom.enemies[i].pausedCurrFrame;
                            }
                            state = "game";
                            break;
                        case 1:
                            gamestate.reset = 1;
                            state = "menu";
                            break;
                        case 2:
                            soundBool *= -1;
                            if (soundBool === 1) {
                                soundPButton.textOption = "Sound: ON";
                            } else if (soundBool === -1) {
                                soundPButton.textOption = "Sound: OFF";
                            }
                            break;
                    }
                    //menu.state = 0;
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
            case "paused":

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
                if (keyCode === DOWN) {
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
                mmap.bfs();
                mmap.show();
                break;
            case "test":
                gamestate.run();
                drawTest();
                break;
            case "gameover":
                drawGameOver();
                break;
            case "win":
                drawWin();
                break;
            case "paused":
                drawPauseScreen();
                break;
        }
    };
}};
