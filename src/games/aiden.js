import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Deer Dodger";

//You can change the background
let background = {
    'background-color': 'green',
    'background-size': 'cover'
};

//You can setup your game here...

const SPEED = 300;

let deer = sprites.spawn();
deer.image = "🦌";
deer.x = WIDTH / 2;
deer.y = HEIGHT / 2;

let dead = false;

let Gunshot = ("❌")

let hunters = [];
function addHunter() {
    let h = sprites.spawn();
    h.image = Gunshot;
    h.timeToShot = Math.random() + 1;
    hunters.push(h);
}

addHunter();

let score = 0;


const target = sprites.spawn();


/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    text.score = "Score:" + score;



    if (dead) {
        text.title = "You Lose!";

        return;
    } else {

        score++;

        if (buttons.right)
            deer.x += SPEED * dt;
        if (buttons.left)
            deer.x -= SPEED * dt;
        if (buttons.up)
            deer.y += SPEED * dt;
        if (buttons.down)
            deer.y -= SPEED * dt;

        // WRAP it around left and right
        if (deer.x < 0)
            deer.x = WIDTH;
        if (deer.x > WIDTH)
            deer.x = 0;

        // STOP it when it goes too far UP or DOWN
        if (deer.y < 0)
            deer.y = 0;

        if (deer.y > HEIGHT)
            deer.y = HEIGHT;



        for (let i = 0; i < hunters.length; i++) {
            let h = hunters[i];

            if (distance(deer, h) < 30) {
                dead = true;
            }

            h.timeToShot = h.timeToShot - dt;
            console.log(h.timeToShot);
            if (h.timeToShot <= 0) {
                h.timeToShot = 2;
                //Put it somewhere 
                h.x = Math.random() * WIDTH;
                h.y = Math.random() * HEIGHT;
            }

        }











    }

    if (score == 500) {
        addHunter();
    }

    if (score == 1000) {
        addHunter();
    }


    if (score == 1500) {
        addHunter();
    }

    if (score == 2000) {
        addHunter();
    }

    if (score == 2500) {
        addHunter();
    }


    if (score == 3000) {
        addHunter();
    }


}



//A helpful function to get the distance between
//two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
























//Don't worry about this
export {
    name,
    background,
    frame
}