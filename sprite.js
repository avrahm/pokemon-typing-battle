var ctx = document.getElementById("sprite").getContext("2d");
ctx.width = 500;
ctx.height = 400;

let isPlaying = false;

let pikachuImg = new Image();
pikachuImg.src = "./assets/images/pikachu-sprite.png";

let charizardImg = new Image();
charizardImg.src = "./assets/images/charizard-sprite.png";

// class Sprite {
//     constructor(img, imgX = 0, imgY = 0, imgW, imgH, cX, cY, cW, cH, frames = 1, rows = 1) {
//         this.img = img;
//         this.imgX = imgX;
//         this.imgY = imgY;
//         this.imgW = imgW;
//         this.imgH = imgH;
//         this.cX = cX;
//         this.cY = cY;
//         this.cW = cW;
//         this.cH = cH;
//         this.frames = frames;
//         this.rows = rows;
//         this.counter = 0;
//         this.srcX = 0;
//         this.srcY = 0;
//     }

//     updateFrame = () => {
//         ctx.clearRect(this.srcX, this.srcY, this.imgW, this.imgH)
//         this.counter += 0.1;
//         this.srcX = (Math.floor(this.counter) % this.frames) * this.imgW;
//         this.srcY = this.srcY;
//         console.log(this.counter,this.srcX,this.srcY);
//     }

//     drawImage = () => {

//         let speed = 10;
//         this.updateFrame();
//         ctx.drawImage(this.img, this.srcX + this.imgX, this.srcY + this.imgY, this.imgW, this.imgH, 
//             (this.counter * speed) + 5 /* x-axis location on canvas*/, 
//             65 /* y-axis location on canvas*/, this.imgW, this.imgH)
//             console.log(this.counter);
//     }

// }

document.onkeydown = (e) => {
    console.log(e.key);
    drawMovingImage(pikachuImg, 25, 75, 40, 40, 5, 55, 4, 1)
}

// class Game {
//     constructor() {
//         this.pikachuWalking = new Sprite(pikachuImg, 25, 75, 40, 40, 5, 5, 40, 40, 4)
//     }
// }

function start() {
    isPlaying = true;
    mainLoop();
}

function stop() {
    isPlaying = false;
    mainLoop ? cancelAnimationFrame : false;
}

function movingSprite() {
    // drawMovingImage(pikachuImg, 25, 75, 40, 40, 5, 55, 4, 1)
    drawMovingImage(pikachuImg, 30, 135, 59, 40, 5, 5, 4, 1)
    drawMovingImage(pikachuImg, 25, 558, 50, 45, 5, 105, 4, 0, 0.02)
    drawMovingImage(pikachuImg, 20, 437, 60, 50, 5, 155, 3, 0, 0.02)
}


let srcX = 0
let counter = 0;
let speed = 5;
let canX = 0;
function movingUpdateFrame(srcY, width, height, frames, rate = 0.10) {
    let multiply = rate
    counter += multiply;
    srcX = (Math.floor(counter) % frames) * width;
    srcY = srcY;
}


function drawMovingImage(img, imgX, imgY, width, height, canX, canY, frames, move = false, rate) {
    if (move) canX = (counter * speed)
    movingUpdateFrame(imgY, width, height, frames, rate);
    if (canX >= ctx.width) {
        canX -= ctx.width;
        console.log(canX);
    }
    ctx.drawImage(img, srcX + imgX, imgY, width, height, canX, canY, width, height)
    
}

function mainLoop() {
    frames++;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    // theGame = new Game()
    movingSprite()
    isPlaying === true ? requestId = requestAnimationFrame(mainLoop) : '';
}