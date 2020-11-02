let isRunning = false;
let score = 0;

let frames = 0;
let letters = '';
let keyArray = [];

let playerStartLife = 1000;
let computerStartLife = 1000;

let playerChargeAttackDamage = -50;
let computerChargeAttackDamage = -20;

let player1Attack = false;
let computerAttack = false;

let playerChargeAttackCounter = 1;
let computerChargeAttackCounter = 4;

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

    keyArray = letters.split('');
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

class Charizard extends Sprite {

    constructor(x, y, context, image) {
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
            frames: 8
        });
    }

    fly() {
        this.width = 144;
        this.frames = 5;
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

    attack2() {
        this.width = 136;
        this.frames = 8;
        this.frameIndex = 0;
        this.row = 3;
        this.ticksPerFrame = 12;
    }
}

class Pikachu extends Sprite {

    // static src = './assets/images/pikachu-sprite.png';

    constructor(x, y, context, image) {
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
            frames: 8
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
        this.width = 40;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 6;
        this.ticksPerFrame = 12;
    }

    run() {
        this.width = 60;
        this.frames = 4;
        this.frameIndex = 0;
        this.row = 2;
        this.ticksPerFrame = 8;
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

    thunder() {
        this.width = 40;
        this.frames = 8;
        this.frameIndex = 0;
        this.row = 10;
        this.ticksPerFrame = 12;
    }
}

const draw = (obj, type) => {
    if (type === "tile1") {
        game.context.fillStyle = "black";
        game.context.fillRect(obj.x, obj.y, obj.width, obj.height);
        game.context.font = '80px Sans-serif';
        game.context.fillStyle = 'white';
        game.context.fillText(obj.key, obj.x, obj.y);
    }
    if (type === "tile") {
        game.context.font = '80px Sans-serif';
        game.context.strokeStyle = 'black';
        game.context.lineWidth = 8;
        game.context.strokeText(obj.key, obj.x, obj.y);
        game.context.fillStyle = 'white';
        game.context.fillText(obj.key, obj.x, obj.y);
    }
}

function manageLife(user, damage, reset = 0) {
    if (reset) {
        ['player', 'computer'].map(user => {
            document.getElementById(`${user}Life`).innerHTML = game[user].life;
        })
    } else {
        game[user].life += damage;
        document.getElementById(`${user}Life`).innerHTML = game[user].life;
    }
}

//HANDLE SCORE ON KEYDOWN
document.onkeydown = (e) => {
    // console.log(game.computer);
    game.tileArray.map((tile, i) => {
        if (e.key.toUpperCase() == tile.key) {
            manageLife('computer', -1)
            game.player.chargeAttack++
            game.pikachu.attack()
            // handleChargeAttack('player', game.player.chargeAttack)
            // handleKeyboard(e, 'deactive')
            game.tileArray.splice(i, 1);
            // shakeScreen();
            // checkScore();
        } else if (e.key.toUpperCase() !== tile.key) {
            manageLife('player', -1)
            game.computer.chargeAttack++
            game.charizard.attack()
            // handleChargeAttack('computer', game.computer.chargeAttack)
            // shakeScreen();
            // checkScore();
        }
    })
    // if(e.code === 'Space'){
    //     game.pikachu.attack()
    // }

    // if(e.code === 'ArrowUp'){
    //     game.pikachu.jump()
    // }

    // if(e.code === 'ArrowRight'){
    //     game.pikachu.walk()
    // }
    console.log(e)
}


startGame = (skill) => {
    isRunning = true;
    setSkillMode(skill);
    game.drawingLoop();
    manageLife(0, 0, 1);
}

const game = {

    init() {
        game.canvas = document.getElementById("gamecanvas");
        game.context = game.canvas.getContext("2d");
        game.context.width = 800;
        game.context.height = 250;
        game.loader = loader;
        game.loader.init();


        this.player = new Player(playerStartLife);
        this.computer = new Player(computerStartLife);
        this.tileArray = [];

        this.charizard = new Charizard(650, 80, game.context, loader.images.charizard);
        this.pikachu = new Pikachu(20, 80, game.context, loader.images.pikachu)

        // Start game
        game.drawingLoop();
        game.pikachu.idle();
        game.charizard.idle();
    },

    drawingLoop() {
        frames++
        // Clear canvas
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

        // Draw and update frame index
        game.charizard.render();
        game.charizard.update();
        game.pikachu.render();
        game.pikachu.update();

        game.tileArray.forEach(tile => {
            draw(tile, "tile")
        })
        
        if (frames % 150 === 0 && game.tileArray.length < 1) game.spawnTile();
        if (isRunning === true) requestAnimationFrame(game.drawingLoop);
    },

    spawnTile() {

        let rKey = keyArray[Math.floor(Math.random() * keyArray.length)];
        let rX = Math.floor(Math.random() * (game.context.width));
        let rY = Math.floor(Math.random() * (game.context.height));
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
        // handleKeyboard(newTile, 'active');

    }
};

function stopGame() {
    isRunning = false;
    // resetPlayers();
    // handleKeyboard(0, 'reset');
    /// kill any request in progress
    game.drawingLoop ? cancelAnimationFrame : false;
}

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
        loader.add('charizard', './assets/images/charizard-sprite.png');
        loader.add('pikachu', './assets/images/pikachu-sprite.png');
    }
};