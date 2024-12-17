import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Violent Night";

//You can change the background
let background = {
    'background-color': '#add8e6',
    'background-size': 'cover',
    'border-bottom': "70px solid white"
};

const GROUND = 80;
const PLAYER_SPEED = 500;
const JUMP_SPEED = 900;
const GRAVITY = -2500;

function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

let t;
let dt;

let player = sprites.spawn();
player.image = "🧍‍♂️";
player.x = 100;
player.y = GROUND;
player.vY = 0;
player.vX = 0;

let santaTime = 0;


let santa = sprites.spawn();
santa.image = "🎅";
santa.x = 400;
santa.y = 250;
santa.vY = 0;
santa.vX = 400;
santaTime++;


let evilDeer = 0;
let reindeer = sprites.spawn();
reindeer.image = "🦌";
reindeer.x = 750;
reindeer.y = 350;
reindeer.vY = 0;
reindeer.vX = 300;

evilDeer++;

let alive = true;

function playerDead() {
    //dead.
    player.image = "🎁",
        text.title = "GAME OVER",
        text.color = "red";
    alive = false;
}

//You can setup your game here...

/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {

    if (buttons.right && alive) {
        player.vX = PLAYER_SPEED;
    } else if (buttons.left && alive) {
        player.vX = -PLAYER_SPEED;
    } else {
        player.vX = 0;
    }

    if (buttons.up && player.y == GROUND && alive) {
        player.vY = JUMP_SPEED;
    }

    player.y += player.vY * dt;
    player.x += player.vX * dt;


    if (player.y > GROUND) {
        player.vY = player.vY + GRAVITY * dt;
        //playerDead();

    } else {
        player.vY = 0;
        player.y = GROUND;
    }


    if (player.x < 0)
        player.x = 0;

    if (player.x > WIDTH)
        player.x = WIDTH;


    if (player.vX == 0) {
        player.image = "🧍‍♂️";
    } else {
        if (Math.round(t * 10) % 2 == 0) {
            player.image = "🚶‍♂️";
        } else {
            player.image = "🏃‍♂️";
        }

    }
    player.flipH = player.vX > 0;

    if (santa) {

        santa.y += santa.vY * dt;
        santa.x += santa.vX * dt;

        santa.vY = santa.vY + GRAVITY * dt;

        santa.rotation += Math.sign(santa.vX) * 200 * dt;

        if (santa.y <= GROUND) {
            santa.vY = santa.vY * -0.9;
            santa.y = GROUND;
        }

        if (santa.x > WIDTH) {
            santa.vX = santa.vX * -1;
            santa.x = WIDTH;
        } else if (santa.x < 0) {
            santa.vX = santa.vX * -1;
            santa.x = 0;
        }

        if (distance(santa, player) < 40) {
            playerDead();

        }
        if (reindeer) {
            reindeer.y += reindeer.vY * dt;
            reindeer.x += reindeer.vX * dt;

            reindeer.vY = reindeer.vY + GRAVITY * dt;

            if (reindeer.y <= GROUND) {
                reindeer.vY = reindeer.vY * -0.9;
                reindeer.y = GROUND;
            }

            if (reindeer.x > WIDTH) {
                reindeer.vX = santa.vX * -1;
                reindeer.x = WIDTH;
            } else if (reindeer.x < 0) {
                reindeer.vX = reindeer.vX * -1;
                reindeer.x = 0;
            }
            reindeer.flipH = reindeer.vX > 0;


            if (distance(reindeer, player) < 40) {
                playerDead();

            }
        }
        if (alive == false) {
            player.image = "🎁";


        }

    }
}


//Don't worry about this
export {
    name,
    background,
    frame
}