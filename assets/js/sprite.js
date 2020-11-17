let isRunning = false;
let score = 0;

let frames = 0;
let letters = "";
let keyArray = [];

// letters = "ASDFGHJKL"; //;"
// keyArray = letters.split("");

let playerStartLife = 1000;
let computerStartLife = 1000;

let playerAttackToggle = false;
let computerAttackToggle = false;

let playerDamage = -20;
let computerDamage = -20;
let playerChargeAttackDamage = -50;
let computerChargeAttackDamage = -20;

let playerChargeAttackCounter = 3;
let computerChargeAttackCounter = 3;

function background(setting, position) {
    document.getElementById("gamecanvas").style.backgroundImage = `url('/assets/images/pokemon_${setting}_bg.png')`;
    document.getElementById("gamecanvas").style.backgroundPosition = position;
    document.getElementById("skill-section").style.display = "block";
    document.getElementById("start-section").style.display = "block";
    switch (setting) {
        case 'stadium':
            document.getElementById(`${setting}-bg`).style.border = '4px solid red';
            document.getElementById(`outdoor-bg`).style.border = 'none';
            break;
        case 'outdoor':
            document.getElementById(`${setting}-bg`).style.border = '4px solid red';
            document.getElementById(`stadium-bg`).style.border = 'none';
            break;
        default:
            break;
    }
}

function setSkillMode(skill) {

    document.getElementById(`skillSelector_${skill}`).style.border = '4px solid red';


    switch (skill) {
        case "home":
            letters = "ASDFGHJKL"; //;"
            document.getElementById(`skillSelector_top`).style.border = 'none';
            document.getElementById(`skillSelector_bottom`).style.border = 'none';
            break;
        case "top":
            letters = "QWERTYUIOP"; //shift letters for hard mode :"
            document.getElementById(`skillSelector_home`).style.border = 'none';
            document.getElementById(`skillSelector_bottom`).style.border = 'none';
            break;
        case "bottom":
            letters = "ZXCVBNM"; //,./shift letters for hard mode <>?
            document.getElementById(`skillSelector_top`).style.border = 'none';
            document.getElementById(`skillSelector_home`).style.border = 'none';
            break;
    }

    keyArray = letters.split("");
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

//sprite animation
//https://demyanov.dev/javascript-canvas-sprite-animation
class Sprite {
    constructor(options) {
        this.context = options.context;
        this.image = options.image; // Path to image sprite sheet
        this.x = options.x; // Coordinates on canvas
        this.y = options.y;
        this.width = options.width; // Size of sprite frame
        this.height = options.height;
        this.frames = options.frames; // Number of frames in a row
        this.frameIndex = options.frameIndex; // Current frame
        this.row = options.row; // Row of sprites
        this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
        this.tickCount = options.tickCount; // How much time has passed
        this.life = options.life;
        this.chargeAttack = 0;
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.frames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, // The x-axis coordinate of the top left corner
            this.row * this.height, // The y-axis coordinate of the top left corner
            this.width, // The width of the sub-rectangle
            this.height, // The height of the sub-rectangle
            this.x, // The x coordinate
            this.y,// The y coordinate
            this.width, // The width to draw the image
            this.height // The width to draw the image
        );
    }
}

class Computer extends Sprite {
    constructor(x, y, context, image, life) {
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: 120,
            height: 88,
            frameIndex: 0,
            row: 0,
            tickCount: 0,
            ticksPerFrame: 4,
            frames: 8,
            life: life
        });

    }

    fly() {
        this.width = 144;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 1;
        this.ticksPerFrame = 13;
    }

    idle() {
        this.width = 125;
        this.frames = 7;
        this.frameIndex = 0;
        this.row = 0;
        this.ticksPerFrame = 15;
    }

    attack() {
        this.width = 136;
        this.frames = 8;
        this.frameIndex = 0;
        this.row = 3;
        this.ticksPerFrame = 12;
    }

    hit() {
        this.width = 117;
        this.frames = 6;
        this.frameIndex = 0;
        this.row = 2;
        this.ticksPerFrame = 15;
    }
}

class Player extends Sprite {
    constructor(x, y, context, image, life) {
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: 50,
            height: 62,
            frameIndex: 0,
            row: 1,
            tickCount: 0,
            ticksPerFrame: 4,
            frames: 8,
            life: life
        });
    }

    walk() {
        this.width = 39;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 1;
        this.ticksPerFrame = 12;
    }

    jump() {
        this.width = 62;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 6;
        this.ticksPerFrame = 15;
    }

    run() {
        this.width = 60;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 2;
        this.ticksPerFrame = 4;
    }

    idle() {
        this.width = 49;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 9;
        this.ticksPerFrame = 12;
    }

    attack() {
        this.width = 40;
        this.frames = 3;
        this.frameIndex = 0;
        this.row = 8;
        this.ticksPerFrame = 12;
    }

    hit() {
        this.width = 75;
        this.frames = 3;
        this.frameIndex = 0;
        this.row = 7;
        this.ticksPerFrame = 15;
    }

    thunder() {
        playerAttack = true;
        this.width = 30;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 10;
        this.ticksPerFrame = 12;
    }
}

class Attack extends Sprite {
    constructor(x, y, context, image) {
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: 0,
            height: 0,
            frameIndex: 0,
            row: 0,
            tickCount: 0,
            ticksPerFrame: 0,
            frames: 0
        });
    }

    thunder() {
        playerAttackToggle = true;
        this.width = 40;
        this.height = 62;
        this.frames = 6;
        this.frameIndex = 0;
        this.row = 10;
        this.ticksPerFrame = 12;
    }

    fireball() {
        computerAttackToggle = true;
        this.width = 35;
        this.height = 88;
        this.frames = 8;
        this.frameIndex = 0;
        this.row = 6;
        this.ticksPerFrame = 12;
    }
}

function draw(type, obj = null) {
    if (type === "tile") {
        var circle = new Path2D();
        circle.arc(obj.x + 11, obj.y - 10, 50, 0, 2 * Math.PI);
        game.context.fill(circle);
        var halfCircle = new Path2D();
        halfCircle.arc(obj.x + 11, obj.y - 10, 50, 0, 1 * Math.PI);
        game.context.fillStyle = "red"
        game.context.fill(halfCircle);
        var smallCircle = new Path2D();
        smallCircle.arc(obj.x + 11, obj.y - 10, 25, 0, 2 * Math.PI);
        game.context.fillStyle = "black"
        game.context.fill(smallCircle);
        game.context.font = "25px Times";
        game.context.strokeStyle = "black";
        game.context.lineWidth = 4;
        game.context.strokeText(obj.key, obj.x, obj.y);
        game.context.fillStyle = "white";
        game.context.fillText(obj.key, obj.x, obj.y);

    }

    // Draw and update frame index
    if (type === "player") {
        game.player.render();
        game.player.update();
    }
    if (type === "computer") {
        game.computer.render();
        game.computer.update();
    }
}

function manageLife(user, damage, reset = 0) {
    if (reset) {
        ["player", "computer"].map(user => {
            document.getElementById(`${user}Life`).innerHTML = game[user].life;
        })
    } else {
        game[user].life += damage;
        document.getElementById(`${user}Life`).innerHTML = game[user].life;
        document.getElementById(`${user}Life`).style.width -= 10;
    }
}

function attackFunction(player) {
    if (player === "player") {
        game.player.attack()
        let playerAttack = new Attack(65, 190, game.context, loader.images.player);
        game.playerAttackArr.push(playerAttack);
    }
    if (player === "computer") {
        game.computer.attack();
        let computerAttack = new Attack(650, 160, game.context, loader.images.computer);
        game.computerAttackArr.push(computerAttack);
    }
}

//HANDLE SCORE ON KEYDOWN
document.onkeydown = (e) => {
    game.tileArray.map((tile, i) => {
        if (e.key.toUpperCase() == tile.key) {
            attackFunction("player")
            handleKeyboard(e, "deactive")
            game.tileArray.splice(i, 1);
            checkScore();
        } else if (e.key.toUpperCase() !== tile.key) {
            attackFunction("computer")
            checkScore();
        }
    })
}

function checkScore() {
    if (game.player.life <= 0) {
        console.log("Computer wins");
        stopGame();
    }
    if (game.computer.life <= 0) {
        console.log("Player wins!");
        stopGame();
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
        game.tileArray.map((tile, i) => {
            game.tileArray.splice(i, 1);
            document.getElementById(`${tile.key.toLowerCase()}`).setAttribute("class", `${status}Key`)
            // document.getElementById(tile.key).setAttribute("class", `clear`)
        })
    }
}

function shakeScreen() {
    document.querySelector("canvas").classList.add("score-shake");
    setTimeout(() => {
        document.querySelector("canvas").classList.remove("score-shake");
    }, 600);
}

function handleChargeAttack(user, chargeAttack) {
    if (user === "player" && Number(chargeAttack)) {
        document.getElementById(`${user}-charge-${chargeAttack}`).style.backgroundColor = 'blue';
        if (chargeAttack === playerChargeAttackCounter) {
            manageLife("computer", playerChargeAttackDamage)
            game[user].chargeAttack = 0;
        }
    }
    if (user === "computer" && Number(chargeAttack)) {
        document.getElementById(`${user}-charge-${chargeAttack}`).style.backgroundColor = 'blue';
        if (chargeAttack === computerChargeAttackCounter) {
            manageLife("player", computerChargeAttackDamage)
            game[user].chargeAttack = 0;
        }
    }
    if (chargeAttack == "reset") {
        switch (user) {
            case "player":
                game.player.chargeAttack = 0;
                // document.getElementById(`playerCharge`).innerHTML = game.player.chargeAttack;
                break;
            case "computer":
                game.computer.chargeAttack = 0;
                // document.getElementById(`computerCharge`).innerHTML = game.computer.chargeAttack;
                break
            default:
                break;
        }
    }
}

function resetPlayers() {
    ["player", "computer"].map(user => {
        game.player.idle();
        game.computer.idle();
        manageLife(0, 0, 1);
        game[user].chargeAttack = 0;
        document.getElementById(`${user}Charge`).innerHTML = game[user].chargeAttack;
    })
}

function startGame() {
    document.getElementById("header").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("keyboard-div").style.display = "block";
    isRunning = true;
    // setSkillMode(skill);
    game.drawingLoop();
    manageLife(0, 0, 1);
}

function pauseGame() {
    isRunning = !isRunning
    game.drawingLoop();
    console.log(isRunning)
}

function stopGame() {
    isRunning = false;
    resetPlayers();
    handleKeyboard(0, "reset");

    document.getElementById("header").style.display = "block";
    document.getElementById("main").style.display = "none";
    document.getElementById("keyboard-div").style.display = "none";
    /// kill any request in progress
    game.drawingLoop ? cancelAnimationFrame : false;
}

const game = {
    init() {
        game.canvas = document.getElementById("gamecanvas");
        game.context = game.canvas.getContext("2d");
        game.context.width = 800;
        game.context.height = 250;
        game.loader = loader;
        game.loader.init();

        this.tileArray = [];
        this.computerAttackArr = [];
        this.playerAttackArr = [];

        this.computer = new Computer(850, 160, game.context, loader.images.computer, computerStartLife);
        this.player = new Player(-50, 190, game.context, loader.images.player, playerStartLife)

        // Start game
        game.drawingLoop();
        game.player.run()
        game.computer.fly()

    },

    drawingLoop() {
        frames++
        // Clear canvas
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.player.x += 1;
        game.computer.x -= 1.5;
        if (game.player.x >= 65) {
            // game.player.idle(); 
            game.player.x = 65
        }
        if (game.computer.x <= 650) {
            // game.computer.idle(); 
            game.computer.x = 650
        }
        draw("player")
        draw("computer")

        game.playerAttackArr.forEach((attack, i) => {
            attack.render();
            attack.update();
            attack.thunder();
            attack.x += 3

            if (attack.x === game.computer.x) {
                game.player.chargeAttack++
                game.computer.hit()
                playerAttackToggle = false
                attack.x = 65
                attack.width = 0
                game.player.idle()
                manageLife("computer", computerDamage)
                shakeScreen();
                setTimeout(() => {
                    game.computer.idle();
                }, 1000);

                game.playerAttackArr.splice(i, 1)
                handleChargeAttack("player", game.player.chargeAttack)
                handleChargeAttack("computer", "reset")
            }
        });

        game.computerAttackArr.forEach((attack, i) => {
            attack.render();
            attack.update();
            attack.fireball();
            attack.x -= 3
            if (attack.x === game.player.x) {
                game.computer.chargeAttack++
                game.player.hit();
                setTimeout(() => {
                    game.player.idle();
                }, 1000);
                manageLife("player", playerDamage)
                handleChargeAttack("computer", game.computer.chargeAttack)
                shakeScreen();
                attack.x = 650
                attack.width = 0
                game.computer.idle()
                game.player.chargeAttack = 0
                game.computerAttackArr.splice(i, 1)
                handleChargeAttack("player", "reset")
            }
        });

        game.tileArray.forEach(tile => {
            draw("tile", tile)
        })

        if (frames % 150 === 0 && game.tileArray.length < 1) {
            game.spawnTile();
            game.player.idle();
            game.computer.idle();
        }

        if (isRunning === true) requestAnimationFrame(game.drawingLoop);
    },

    spawnTile() {
        //right 535
        //let 250
        let xAxisArr = [250, 535]
        let yAxis = 125;
        let rKey = keyArray[Math.floor(Math.random() * keyArray.length)];
        let rX = xAxisArr[Math.floor(Math.random() * xAxisArr.length)];
        let rY = yAxis
        // Math.floor(Math.random() * (game.context.height));
        let rWidth = 85;
        let rHeight = 85;
        if (rX + rWidth > game.context.width - 120) {
            rX -= 50
        }
        if (rX - rWidth < 50) {
            rX += 50
        }
        if (rY + rHeight > game.context.height) {
            rY -= 50
        }
        if (rY - rHeight < 0) {
            rY += 50
        }

        let newTile = new Tile(rKey, rX, rY, rWidth, rHeight);

        game.tileArray.push(newTile);
        handleKeyboard(newTile, "active");

    }
};

const loader = {
    count: 0,
    images: {},

    add(title, src) {
        const image = new Image();
        image.src = src;
        this.images[title] = image;
        this.count++;
    },

    init() {
        loader.add("computer", "./assets/images/charizard-sprite.png");
        loader.add("player", "./assets/images/pikachu-sprite.png");
    }
};