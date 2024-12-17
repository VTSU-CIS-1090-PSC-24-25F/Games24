import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Maze Run";
const TURBO_EMOJI = "🔥"
const WALL_SPRITE_IMAGE = "|";
const TURBO_SPEED = 400
const SPEED = 200;
const TURBO_COUNT = 3;

let timer = 0;
let turbo = TURBO_COUNT;
let turboMode = false;
let fastestTime = -1;
let walls = [];

//You can change the background
let background = {
    'background-color': 'grey',
    'background-size': 'cover'
};

//You can setup your game here...
let explorer = sprites.spawn();
explorer.image = "🏃‍♂️";
explorer.x = 30;
explorer.y = 30;

let finishLine = sprites.spawn();
finishLine.image = "🏁";
finishLine.x = 760;
finishLine.y = 470;

drawWalls();
restartGame();

function restartGame() {
    explorer.x = 0;
    explorer.y = 0;
    timer = 0;
    turbo = TURBO_COUNT;
    turboMode = false;
    displayRemainingTurbo();
}

function drawWalls() {
    let lines = [125, 250, 375, 500, 625, 720];
    for (let i = 0; i < lines.length; i++) {
        createWallSprite(lines[i], 90, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 120, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 150, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 180, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 210, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 240, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 270, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 300, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 350, WALL_SPRITE_IMAGE)
        createWallSprite(lines[i], 410, WALL_SPRITE_IMAGE)
        createWallSprite(125, 30, WALL_SPRITE_IMAGE)
        createWallSprite(250, 470, WALL_SPRITE_IMAGE)
        createWallSprite(375, 30, WALL_SPRITE_IMAGE)
        createWallSprite(500, 470, WALL_SPRITE_IMAGE)
        createWallSprite(625, 30, WALL_SPRITE_IMAGE)
        createWallSprite(720, 470, WALL_SPRITE_IMAGE)
    }
}


function createWallSprite(x, y, image) {
    let wallSprite = sprites.spawn();
    wallSprite.image = image;
    wallSprite.x = x;
    wallSprite.y = y;
    wallSprite.yScale = 1.4;
    walls.push(wallSprite);
}

function displayRemainingTurbo(){
    let title = "";
    console.log(turbo);
    for (let i = 0; i < turbo; i++){
        title += TURBO_EMOJI;
    }
    text.title = title;
}

function win(){
    if (timer < fastestTime || fastestTime == -1){
        fastestTime = timer.toFixed(2);
    }
    restartGame();
}

function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * This is the function that get's run every frame...

 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    if (buttons.space){
        if (turboMode == false && turbo > 0){
            turboMode = true;
            turbo -= 1;
            displayRemainingTurbo();
        }
    }
    let speed = SPEED;
    if (turboMode){
        speed = TURBO_SPEED;
    }
    if (buttons.right) {
        turboMode = false;
        explorer.x += speed * dt;
        if(!explorer.flipH){
            explorer.flipH = true;
        }
    }
    if (buttons.left) {
        turboMode = false;
        explorer.x -= speed * dt;

        if(explorer.flipH) {
            explorer.flipH = false;
        }
    }
    if (buttons.up)
        explorer.y += speed * dt;
    if (buttons.down)
        explorer.y -= speed * dt;
    if (explorer.x <= 30)
        explorer.x = 30;
    if (explorer.x >= 770)
        explorer.x = 770;
    if (explorer.y <= 30)
        explorer.y = 30;
    if (explorer.y >= 470)
        explorer.y = 470;
    if (explorer.x >= 750 && explorer.y >= 450) {
        win();
    }
    for (let i = 0; i < walls.length; i++)
    if (distance(explorer, walls[i]) < 20) {
        restartGame();
    }
    
    timer += dt;
    text.score = timer.toFixed(2);
    if (fastestTime > 0) {
        text.score += " (Fastest: " + fastestTime + ")";

    }
    
}

//Don't worry about this
export {
    name,
    background,
    frame
}