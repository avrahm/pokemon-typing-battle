

var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 800;
ctx.height = 450;

let isPlaying = false;
let score = 0;

let frames = 0;
let letters = '';

function setSkillMode(skill) {

    switch (skill) {
        case "home":
            letters = "ASDFGHJKL;'";
            break;
        case "top":
            letters = "QWERTYUIOP"; //shift letters for hard mode :"
            break;
        case "bottom":
            letters = "ZXCVBNM,./"; //shift letters for hard mode <>?
            break;
    }

    return keyArray = letters.split('');
}

const draw = (obj, type) => {
    if (type === "tile1") {
        ctx.fillStyle = "black";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.font = '80px Sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(obj.key, obj.x, obj.y);
    }
    if (type === "tile") {
        ctx.font = '80px Sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(obj.key, obj.x, obj.y);
        ctx.fillStyle = 'white';
        ctx.fillText(obj.key, obj.x, obj.y);
    }
}

class Player {
    constructor(life) {
        this.life = life;
    }
}

class Tile {
    constructor(key, x, y, width, height) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //hard
    // moveTile(direction, value) {
    //     this[direction] += value; //* difficultySpeed;
    // }
}

class Game {
    constructor() {
        this.player = new Player(100);
        this.computer = new Player(100);
        this.tileArray = [];
    }

    spawnTile() {
        let rKey = keyArray[Math.floor(Math.random() * keyArray.length)];
        let rX = Math.floor(Math.random() * (ctx.width));
        let rY = Math.floor(Math.random() * (ctx.height));
        let rWidth = 85;
        let rHeight = 85;
        if (rX + rWidth > ctx.width) {
            rX -= 50
        }
        if (rX - rWidth < 0) {
            rX += 50
        }
        if (rY + rHeight > ctx.height) {
            rY -= 50
        }
        if (rY - rHeight < 0) {
            rY += 50
        }

        let newTile = new Tile(rKey, rX, rY, rWidth, rHeight);
        this.tileArray.push(newTile);
    }
}

document.onkeydown = (e) => {
    theGame.tileArray.map((tile, i) => {
        if (e.key.toUpperCase() == tile.key) {
            score += 1;
            document.getElementById("score").innerHTML = score;
            theGame.tileArray.splice(i, 1);
        } else if (e.key.toUpperCase() !== tile.key) {
            score -= 1;
            document.getElementById("score").innerHTML = score;
        }
    })
}

function mainLoop() {
    frames++;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    theGame.tileArray.forEach(tile => {
        draw(tile, "tile")
    })

    if (frames % 150 === 0
        && theGame.tileArray.length < 1
    ) theGame.spawnTile();
    if (isPlaying === true) requestId = requestAnimationFrame(mainLoop);
}


function stopGame() {
    isPlaying = false;

    /// kill any request in progress
    mainLoop ? cancelAnimationFrame : false;
}


startGame = (skill) => {
    setSkillMode(skill);
    isPlaying = true;
    theGame = new Game()
    mainLoop();
}