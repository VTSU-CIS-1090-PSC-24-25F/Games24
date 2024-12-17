import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//Set the name of my game...
let name = "The Santa Centipede";
text.color = "white";

//Set a fun background image
let background = {
    'background': 'url("http://t4.ftcdn.net/jpg/06/50/90/01/360_F_650900127_6WbCHsYyW2iHh41vDZFL2R2HLW8qd9gB.jpg")',
    'background-size': 'cover'
};

//The different food for Santa
const food = ["🎄","🕯️","⛄","❄️","🎁","🌟","🍪","🥛"];

//The state of my game
let centepede = []; //The array of sprites for the centepede
let dx = 0;         //Current movement in x
let dy = 1;         //current movement in y
const diff = 30;      //How far apart to place body segments
let lastTick = 0;   //Last time we ticked
let tick = 0.2;     //How often to tick
let length = 5;     //How long is he?
let dead = false;   //Are we dead?
let score = 0;      //What's the score?

//Start him in the center
centepede[0] = sprites.spawn();
centepede[0].image = "🎅";
centepede[0].x = WIDTH / 2;
centepede[0].y = HEIGHT / 2;

//The target
const target = sprites.spawn();
updateTarget();

//This function chooses a random target image and
//moves it to a random position
function updateTarget(){
    //Choose a random food...
    target.image = food[Math.floor(Math.random() * food.length)];

    //Put it somewhere else
    target.x = Math.random() * WIDTH;
    target.y = Math.random() * HEIGHT;
}

//This function gets the distance between two sprites
function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {

    //If he is dead, this is all that happens...
    if ( dead ){
        text.title = "You Lose!";
        return;
    }

    if (buttons.right)
        dy = 0, dx = 1;
    else if (buttons.left)
        dy = 0, dx = -1;
    else if (buttons.up)
        dy = 1, dx = 0;
    else if (buttons.down)
        dy = -1, dx = 0;

    //Only advance the centepede every tick
    if (t > lastTick + tick) {
        lastTick = t;
        centepede.unshift(sprites.spawn());
        centepede[0].image = "🎅";
        centepede[0].x = centepede[1].x + (dx * diff);
        centepede[0].y = centepede[1].y + (dy * diff);
        centepede[1].yScale = 0.75;
        centepede[1].xScale = 0.75;

        if (centepede.length > length) {
            sprites.destroy(centepede.pop());
        }
    }

    //If we found the target...
    if ( distance(centepede[0], target) < 30 ){
        updateTarget();
        length++;           //Make him longer
        tick = tick * 0.9;  //Speed him up

        //Update the score
        score++;
        text.score = "Score: " + score;
    }

    //If you hit a wall, dead!
    if ( centepede[0].x < 0 || centepede[0].x > WIDTH || centepede[0].y < 0 || centepede[0].y > HEIGHT ){
        dead = true;
    }

    //If the head hits any other body segment, he dead
    for ( let i = 1; i < centepede.length; i++ ){
        if ( distance(centepede[0], centepede[i]) < 30 ){
            dead = true;
        }
    }

}

//Don't worry about this
export {
    name,
    background,
    frame
}