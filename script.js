document.getElementById("cv-btn-con3").addEventListener("click", (e) => {
    const parent = e.target.closest("#cv-btn-con3");
    parent.style.transform = "translateY(10px)";

    setTimeout(() => {
        parent.style.transform = "translateY(0px)";
    }, 200)
})

const clouds = document.getElementsByClassName("cloud");
const cloudSpeed = 10;




const keys = {
    left: false,
    right: false
};


let src = './sprite/Idle.png'
let frame = 6;


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = src; // Ensure Idle.png is in the same directory or provide the full path

const frameWidth = 128; // width of one frame
const frameHeight = 134; // height of one frame
let frameCount = 6; // total frames in the sprite sheet
let currentFrame = 0;
let currentAnimation = "";

const fps = 10; // frames per second
const frameDuration = 800 / fps;

let lastFrameTime = 0;

let positionX = canvas.getBoundingClientRect().left;
const moveSpeed = 6; 

function animate(time) {
    if (time - lastFrameTime >= frameDuration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            spriteSheet,
            currentFrame * frameWidth, 0, 
            frameWidth, frameHeight,     
            -10, -30,                        
            frameWidth, frameHeight       
        );
        currentFrame = (currentFrame + 1) % frameCount;
        lastFrameTime = time;
    }


    if (keys.right) {
        positionX += moveSpeed;
    } else if (keys.left) {
        positionX -= moveSpeed;
    }
    canvas.style.left = positionX + 'px';

    requestAnimationFrame(animate);
}


window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "d") {
        keys.right = true;
        document.getElementById("control-btn-right").style.transform = "translateY(15px)";
        updateSprite("./sprite/Run.png", 8, false, "right");
    } else if (e.key.toLowerCase() === "a") {
        keys.left = true;
        document.getElementById("control-btn-left").style.transform = "translateY(15px)";
        updateSprite("./sprite/Run.png", 8, true, "left");
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "d") {
        keys.right = false;
        document.getElementById("control-btn-right").style.transform = "translateY(0)";
        updateSprite("./sprite/Idle.png", 6, false, "");
    } else if (e.key.toLowerCase() === "a") {
        keys.left = false;
        document.getElementById("control-btn-left").style.transform = "translateY(0)";
        updateSprite("./sprite/Idle.png", 6, true, "");
    }
});


function updateSprite(newSrc, newFrameCount, isRotate, animationName) {
    if (currentAnimation !== animationName) {
        currentAnimation = animationName;
        src = newSrc;
        spriteSheet.src = newSrc;
        frameCount = newFrameCount;
        currentFrame = 0;

        if (isRotate) {
            canvas.style.transform = "rotateY(180deg)";
        }
        else {
            canvas.style.transform = "rotateY(0deg)";
        }
    }


    
}


requestAnimationFrame(animate);
