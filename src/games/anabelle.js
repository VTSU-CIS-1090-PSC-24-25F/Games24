import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//Set some constants to use for the game
const GROUND = 30;
const JUMP_SPEED = 900;
const GRAVITY = -2500;
const SPEED = 300;

//You should set your game's name
let name = "Catch the cheese";

//You can change the background
let background = {
    'background': 'url(https://wallpaper.dog/download-wallpaper/10949288_vintage-floral-desktop-wallpapers)',
    'background-size': 'cover'
};

//You can setup your game here...

//create mouse sprite 
let mouse = sprites.spawn();
mouse.image = "🐁";
mouse.x = WIDTH / 5;
mouse.y = GROUND;  //stays at 0 at y axis the whole time 

//create cheese sprite 
let cheese = sprites.spawn();
cheese.image = "🧀";
cheese.x = WIDTH / 8;
cheese.y = HEIGHT;

//create pizza sprite 
let trap = sprites.spawn();
trap.image = "🪤";
trap.x = WIDTH / 50;
trap.y = HEIGHT;

let score = 0;
let dead = false;  //declaring dead 

//This function gets the distance between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    text.score = "Score: " + score;

    //if the mouse is dead do this
    if (dead) {
        text.title = "You Lose!";
    } else {                          //if not do these
        //if the mouse gets close to the cheese you get a point 
        if (distance(mouse, cheese) < 40) {
            score = score + 1;
            cheese.x = Math.random() * WIDTH;
        }

        //if the mouse gets close to the pizza the mouse dies 
        if (distance(mouse, trap) < 40) {
            dead = true;
        }
        //how the mouse moves around the ground 
        if (buttons.right)
            mouse.x += SPEED * dt;
        if (buttons.left)
            mouse.x -= SPEED * dt;
        if (mouse.x < 0)
            mouse.x = WIDTH;
        if (mouse.x > WIDTH)
            mouse.x = 0;

        //making the mouse jump

        if (buttons.up && mouse.y == GROUND) {
            mouse.vY = JUMP_SPEED;
        }
        mouse.y += mouse.vY * dt;
        if (mouse.y > GROUND) {
            mouse.vY = mouse.vY + GRAVITY * dt;
        } else {
            mouse.vY = 0;
            mouse.y = GROUND;
        }

        //move the trap
        trap.y = trap.y - ( score + 1);  //move the trap down 
        if (trap.y < 35) {
            //if the trap is at the bottom move it to the top 
            trap.y = HEIGHT;
            //also give it a random x position 
            trap.x = Math.random() * WIDTH;
        }

        //Move the mouse 
        cheese.y = cheese.y - (score + 1);  
        //Move the cheese down
        if (cheese.y < 35) {
            //IF the cheese is at the bottom move it to the top
            cheese.y = HEIGHT;
            //Also give it a random X position
            cheese.x = Math.random() * WIDTH;
        }

    }
}

//Don't worry about this
export {
    name,
    background,
    frame
}