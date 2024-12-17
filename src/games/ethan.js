import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Cops and Robbers";

//You can change the background
let background = {
    'background-color': 'orange',
    'background-size': 'cover'
};

//You can setup your game here...
let good = sprites.spawn();
good.image = "🦸‍♀️";
good.x = WIDTH / 2;
good.y = HEIGHT / 2;

let bad = sprites.spawn();
bad.image = "🦹‍♂️";
bad.x = WIDTH / 2;
bad.y = HEIGHT / 2;

function moveBad(){
    bad.x = Math.random() * WIDTH
    bad.y = Math.random() * HEIGHT
}

/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    text.title = "My Game";
    text.score = "Score: 0";
}

//Don't worry about this
export {
    name,
    background,
    frame
}