var ctx = document.getElementById("sprite").getContext("2d");
ctx.width = 300;
ctx.height = 200;

let isPlaying = false;

let pikachuImg = new Image();
pikachuImg.src = "./assets/images/pikachu-sprite.png";
// pikachuImg.onload = () => init()

function init() {
    // window.requestAnimationFrame(step);
    //drawImage
    //(sprite img location x-axis, y-axis, sprite img width, height )
    //(position to draw on canvas x-axis, y-axis, canvas img width, height)
    // ctx.drawImage(pikachuImg, 25, 75, 40, 40, 5, 5, 40, 40)
}

class Sprite {
    constructor(img, imgX, imgY, imgW, imgH, cX, cY, cW, cH, frames = 1, rows = 1) {
        this.img = img;
        this.imgX = imgX;
        this.imgY = imgY;
        this.imgW = imgW;
        this.imgH = imgH;
        this.cX = cX;
        this.cY = cY;
        this.cW = cW;
        this.cH = cH;
        this.frames = frames;
        this.rows = rows;
    }

    // draw = () => {

    //     let srcX = 0;
    //     let srcY = 0;
    //     let counter = 0;
    //     function updateFrame() {
    //         ctx.clearRect(srcX, srcY, this.imgW, this.imgH)
    //         counter += 0.1;
    //         srcX = (Math.floor(counter) % this.frames) * this.imgW;
    //         srcY = srcY;
        
    //     }
    //     updateFrame();
    //     ctx.drawImage(pikachuImg, srcX + this.imgX, srcY + this.imgY, this.imgW, this.imgH, counter + this.cX, this.cY, this.imgW, this.imgH)
    // }

}

document.onkeydown = () => {
    // console.log(theGame.pikachuWalking.move());
    // return theGame.pikachuWalking.mo
}

class Game {
    constructor() {
        this.pikachuWalking = new Sprite(pikachuImg, 25, 75, 40, 40, 5, 5, 40, 40, 4)
    }
}

function start() {
    isPlaying = true;
    mainLoop();
}

function stop() {
    isPlaying = false;
    mainLoop ? cancelAnimationFrame : false;
}

let srcX = 0;
let srcY = 0;

const cols = 4;
const rows = 1;

const width = 40;
const height = 40;

let counter = 0;
let speed = 10;

function updateFrame() {
    ctx.clearRect(srcX, srcY, width, height)
    counter += 0.1;
    srcX = (Math.floor(counter) % cols) * width;
    srcY = srcY;
}

function drawImage() {
     updateFrame();
     ctx.drawImage(pikachuImg, srcX + 25, srcY + 75, width, height, (counter * speed) + 5, 65, width, height)
}


function mainLoop() {
    frames++;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    theGame = new Game()
    drawImage()
  theGame.pikachuWalking
    isPlaying === true ? requestId = requestAnimationFrame(mainLoop) : '';
}