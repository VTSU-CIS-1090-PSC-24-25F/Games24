import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Fruit Basket";

//You can change the background
let background = {
    'background-color': 'teal',
    'background-size': 'cover'
};
//You can setup your game here...
var playerScore = 0;
const SPEED = 300;
let timer;


let basket = sprites.spawn();
basket.image = "🧺";
basket.x = WIDTH / 2;
basket.y = 30;

const fruit = ["🥝", "🍓", "🍍", "🥭", "🍉"];
const target = sprites.spawn();
const targetTwo = sprites.spawn();
target.y = 470;
targetTwo.y = 470;

updateTarget();

function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function updateTarget() {
    target.image = fruit[Math.floor(Math.random() * fruit.length)];
    target.x = Math.random() * WIDTH;
}

function updateTargetTwo() {

    targetTwo.image = fruit[Math.floor(Math.random() * fruit.length)];
    targetTwo.x = Math.random() * WIDTH;

}


/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    if (t > 60) {
        text.title = "Game over!";
        return;
    }
    timer = t;
    text.title = "";
    text.score = "Score: " + playerScore + " Time: " + timer;
    if (buttons.right)
        basket.x += SPEED * dt;
    if (buttons.right && buttons.space)
        basket.x += SPEED * dt + 1;


    if (buttons.left)
        basket.x -= SPEED * dt;
    if (buttons.left && buttons.space)
        basket.x -= SPEED * dt - 1;

    if (basket.x < 30)
        basket.x = 770;
    if (basket.x > 770)
        basket.x = 30;

    target.y = target.y - (t * .15);
    targetTwo.y = targetTwo.y - (t * .10);


    if (target.y <= 15) {
        updateTarget();
        target.y = 470;
        playerScore = playerScore - 5
    }
    if (targetTwo.y <= 15) {
        updateTargetTwo();
        targetTwo.y = 470;
        playerScore = playerScore - 5
    }

    if (distance(basket, target) < 30) {
        updateTarget();
        target.y = 470;
        playerScore = playerScore + 10;
    }
    if (distance(basket, targetTwo) < 30) {
        updateTargetTwo();
        targetTwo.y = 470;
        playerScore = playerScore + 10;
    }
}

//Don't worry about this
export {
    name,
    background,
    frame
}