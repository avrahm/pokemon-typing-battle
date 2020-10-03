

var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 800;
ctx.height = 450;

let isPlaying = false;
let score = 0;

let frames = 0;

const homeRowLetters = "asdfghjkl;'";

var keyArray = homeRowLetters.split('');

// keyArrMap = (keys) => {
//     let keyArr = keys.split('');
// console.log(keyArray)
// }


const draw = (obj, type) => {
    if (type === "tile2") {
        ctx.fillStyle = "black";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
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
    //     this[direction] += value * difficultySpeed;
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
        let rX = Math.floor(Math.random() * (ctx.width - 80)) + 65;
        let rY = Math.floor(Math.random() * (ctx.height - 80)) + 25;
        let rWidth = 45;
        let rHeight = 45;

        let newTile = new Tile(rKey, rX, rY, rWidth, rHeight);
        this.tileArray.push(newTile);
    }
}

function checkKey(keyPress){
    console.log(keyPress)
    return theGame.tileArray.map((key, i)=>{
        if(keyPress === key){
            console.log(e.key,i)
            score += 1;
            document.getElementById("score").innerHTML = score;
        }
    })
}

    document.onkeydown = (e) => {
        checkKey(e.key)
    }



function mainLoop() {
    frames++;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    theGame.tileArray.forEach(tile => {
        draw(tile, "tile")
    })

    if (frames % 150 === 0 && theGame.tileArray.length < 1) theGame.spawnTile();
console.log(theGame.tileArray.length)
    if (isPlaying === true) requestId = requestAnimationFrame(mainLoop);
}


function stopGame() {
    isPlaying = false;

    /// kill any request in progress
    mainLoop ? cancelAnimationFrame : false;
}


startGame = () => {
    isPlaying = true;
    theGame = new Game()
    mainLoop();
}