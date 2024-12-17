import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Snake in the Grass!";

//You can change the background
let background = {
    'background-color': '#A0522D',
    'background-size': 'cover'
};
const SPEED = 300;

let dead = false

//You can setup your game here...
//create the Snake sprite
let snake = sprites.spawn();
snake.image = "🐍";
snake.x = WIDTH / 2;
snake.y = HEIGHT / 2;

//Set Grass
/*
let grass = sprites.spawn();
grass.image = " 🌿";
grass.x = 400;
grass.y = 250;
grass.yScale = 0.5;
grass.xScale = 2;
*/

let grass = [];

function initMaze() {
    for (let y = 0; y < HEIGHT; y = y + 50) {
        for (let x = 0; x < WIDTH; x = x + 50) {
            if (Math.random() < 0.15) {
                let g = sprites.spawn();
                g.image = " 🌿";
                g.x = x;
                g.y = y;
                g.yScale = 0.5;
                g.xScale = 2;
                grass.push(g);
            }
        }
    }
}

initMaze();


/**
 * This is the function that get's run every frame...
 * 
    
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    if (dead) {
        text.title = "Game Over!";
        return;
    }

    if (buttons.right)
        snake.x += SPEED * dt;
    if (buttons.left)
        snake.x -= SPEED * dt;
    if (buttons.up)
        snake.y += SPEED * dt;
    if (buttons.down)
        snake.y -= SPEED * dt;
    // WRAP it around left and right
    if (snake.x < 0)
        snake.x = 0;
    if (snake.x > WIDTH)
        snake.x = WIDTH;

    // STOP it when it goes too far UP or DOWN
    if (snake.y < 0)
        snake.y = 0;

    if (snake.y > HEIGHT)
        snake.y = HEIGHT;

    for (let i = 0; i < grass.length; i++) {
        if (  distance(snake, grass[i] ) < 10 ) {
            dead = true;
            break;
        }
    }

}

//This function gets the distance between two sprites
function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}





//Don't worry about this
export {
    name,
    background,
    frame
}