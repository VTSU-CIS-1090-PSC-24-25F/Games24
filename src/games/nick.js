import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//Set the name
let name = "Soccer weave";

//Set up your background
const background = {
    "background-color": "skyblue",
    "background-image": "linear-gradient(#424299, skyblue)",
    "border-bottom": "70px solid green"
};

//Set up for game

//Set some constants to use for the game
const GROUND = 80;
const PLAYER_SPEED = 500;
const JUMP_SPEED = 900;
const GRAVITY = -3000;
const CROUCH = -5;

//Set up the player sprite
let player = sprites.spawn();
player.image = "🧍‍♂️";
player.x = 100;
player.y = GROUND;
player.vY = 0;
player.vX = 0;

let ball = sprites.spawn();
ball.image = "⚽";
ball.x = 600;
ball.y = 200;
ball.vX = 950;
ball.vY = 0.9;

let ball2 = sprites.spawn();
ball2.image = "⚽";
ball2.x = 500;
ball2.y = 350;
ball2.vX = 800;
ball2.vY = 0;

let score = 0;

function frame(t, dt) {
    text.score = "Score: " + score;



    //Update hero's X Velocity based right / left button
    if (buttons.right) {
        player.vX = PLAYER_SPEED;
    } else if (buttons.left) {
        player.vX = -PLAYER_SPEED;
    } else {
        player.vX = 0;
    }

    //If up button, AND player is on the ground
    //give the hero an upwards Y Velocity. (JUMP)
    if (buttons.up && player.y == GROUND) {
        player.vY = JUMP_SPEED;
    }

    if (buttons.down && player.y == GROUND) {
        player.vY = CROUCH_SPEED;
    }
    player.y += player.vY * dt;

    //Change hero's location based on velocity 
    player.y += player.vY * dt;
    player.x += player.vX * dt;

    //Update y velocity using gravity
    if (player.y > GROUND) {
        //If he is in the air add gravity
        player.vY = player.vY + GRAVITY * dt;
    } else {
        //When he is at the ground, set it 0
        player.vY = 0;
        player.y = GROUND;
    }

    //Limit hero's location to on the screen.
    if (player.x < 0)
        player.x = 0;
    if (player.x > WIDTH)
        player.x = WIDTH;


    //Finally animate the hero, by changing the image, based on
    //how he is moving...
    if (player.vX == 0) {
        //Staying still? 
        //Use still person
        player.image = "🧍‍♂️";
    } else {
        //Moving left or right?
        if (player.y > GROUND) {
            //In the air? Always a running man
            player.image = "🏃‍♂️";
        } else {
            //Otherwise swap between two poses
            if (Math.round(t * 10) % 2 == 0) {
                player.image = "🚶";
            } else {
                player.image = "🏃‍♂️";
            }
        }

        //Flip the sprite based on which way he is going
        player.flipH = player.vX > 0;
    }



    if (ball2) {

        //Adjust the ball's position based on velocity
        ball.y += ball.vY * dt;
        ball.x += ball.vX * dt;

        //Every frame the y velocity gets GRAVITY added to it
        ball.vY = ball.vY + GRAVITY * dt;

        //And make it rotate a little;
        ball.rotation += Math.sign(ball.vX) * 250 * dt;

        //Bounce the ball off the sides
        if (ball.x > WIDTH) {
            ball.vX = ball.vX * -1;
            ball.x = WIDTH;
        } else if (ball.x < 0) {
            score++;
            ball.vX = ball.vX * -1;
            ball.x = 0;
        }
        if (ball.y <= GROUND) {
            ball.vY = ball.vY * -0.92;
            ball.y = GROUND;
        }


        if (ball2) {

            //Adjust the ball's position based on velocity
            ball2.y += ball2.vY * dt;
            ball2.x += ball2.vX * dt;

            //And make it rotate a little;
            ball2.rotation += Math.sign(ball2.vX) * 300 * dt;

            //Bounce the ball off the sides
            if (ball2.x > WIDTH) {
                ball2.vX = ball2.vX * -1;
                ball2.x = WIDTH;
            } else if (ball2.x < 0) {
                ball2.vX = ball2.vX * -1;
                ball2.x = 0;
            }




        }

    }


}


//A helpful function to get the distance between
//two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}




export {
    name,
    background,
    frame
}
/**
 * This is the function that get's run every frame...
 

 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
text.title = "Soccer Weave";
text.score = "Score: 0";



