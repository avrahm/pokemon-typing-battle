var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 800;
ctx.height = 250;

let isPlaying = false;
let score = 0;

let frames = 0;
let letters = '';

let playerStartLife = 1000;
let computerStartLife = 1000;

let playerChargeAttackDamage = -50;
let computerChargeAttackDamage = -20;

let player1Attack = false;
let computerAttack = false;

let playerChargeAttackCounter = 1;
let computerChargeAttackCounter = 4;

let player1ImgAttack;

let player1Img = new Image();
player1Img.src = "assets/images/pikachu-sprite.png";

function setSkillMode(skill) {

    switch (skill) {
        case "home":
            letters = "ASDFGHJKL"; //;'
            break;
        case "top":
            letters = "QWERTYUIOP"; //shift letters for hard mode :"
            break;
        case "bottom":
            letters = "ZXCVBNM"; //,./shift letters for hard mode <>?
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
        this.chargeAttack = 0
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
        this.player = new Player(playerStartLife);
        this.computer = new Player(computerStartLife);
        this.tileArray = [];
        this.spriteArray = {};
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
        // handleKeyboard(newTile, 'active');

    }
}


function handleChargeAttack(user, chargeAttack) {
    document.getElementById(`${user}Charge`).innerHTML = theGame[user].chargeAttack;
    if (user === 'player') {
        if (chargeAttack === playerChargeAttackCounter) {
            manageLife('computer', playerChargeAttackDamage)
            theGame[user].chargeAttack = 0;
            document.getElementById(`${user}Charge`).innerHTML = theGame[user].chargeAttack;
            
        }
    }
    if (user === 'computer') {
        if (chargeAttack === computerChargeAttackCounter) {
            manageLife('player', computerChargeAttackDamage)
            theGame[user].chargeAttack = 0;
            document.getElementById(`${user}Charge`).innerHTML = theGame[user].chargeAttack;
        }
    }
}

//HANDLE KEYBOARD
function handleKeyboard(tile, status) {

    if (status === "active" || status === "deactive") {
        // console.log(tile.key)
        // if (tile.key === (/A-Z/)) {
        tile = tile.key.toLowerCase();
        //     console.log(tile)
        // }
        document.getElementById(`${tile}`).setAttribute("class", `${status}Key`)
    }

    if (status === "reset") {
        theGame.tileArray.map((tile, i) => {
            theGame.tileArray.splice(i, 1);
            document.getElementById(`${tile.key.toLowerCase()}`).setAttribute("class", `${status}Key`)
            // document.getElementById(tile.key).setAttribute("class", `clear`)
        })
    }
}

//HANDLE SCORE ON KEYDOWN
document.onkeydown = (e) => {
    // console.log(theGame.computer);
    theGame.tileArray.map((tile, i) => {
        if (e.key.toUpperCase() == tile.key) {
            manageLife('computer', -1)
            theGame.player.chargeAttack++
            handleChargeAttack('player', theGame.player.chargeAttack)
            // handleKeyboard(e, 'deactive')
            theGame.tileArray.splice(i, 1);
            shakeScreen();
            checkScore();
        } else if (e.key.toUpperCase() !== tile.key) {
            manageLife('player', -1)
            theGame.computer.chargeAttack++
            handleChargeAttack('computer', theGame.computer.chargeAttack)
            shakeScreen();
            checkScore();
        }
    })
    console.log(e)
}

function checkScore() {
    if (theGame.player.life <= 0) {
        console.log('Computer wins');
        stopGame();
    }
    if (theGame.computer.life <= 0) {
        console.log('Player wins!');
        stopGame();
    }
}

function shakeScreen() {
    document.querySelector("canvas").classList.add("score-shake");
    setTimeout(() => {
        document.querySelector("canvas").classList.remove("score-shake");
    }, 600);
}

function resetPlayers() {
    ['player', 'computer'].map(user => {
        // console.log(user)
        manageLife(0, 0, 1);
        theGame[user].chargeAttack = 0;
        document.getElementById(`${user}Charge`).innerHTML = theGame[user].chargeAttack;
    })
}

function manageLife(user, damage, reset = 0) {
    if (reset) {
        ['player', 'computer'].map(user => {
            document.getElementById(`${user}Life`).innerHTML = theGame[user].life;
        })
    } else {
        theGame[user].life += damage;
        document.getElementById(`${user}Life`).innerHTML = theGame[user].life;
    }
}

function mainLoop() {
    frames++;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    theGame.tileArray.forEach(tile => {
        draw(tile, "tile")
    })

    if (frames % 150 === 0 && theGame.tileArray.length < 1) theGame.spawnTile();
    if (isPlaying === true) requestId = requestAnimationFrame(mainLoop);
}

function stopGame() {
    isPlaying = false;
    resetPlayers();
    handleKeyboard(0, 'reset');
    /// kill any request in progress
    mainLoop ? cancelAnimationFrame : false;
}

startGame = (skill) => {
    isPlaying = true;
    theGame = new Game();
    setSkillMode(skill);
    mainLoop();
    manageLife(0, 0, 1);
}