import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
//Someone stole the money in the vault! only one of the bags contains money. Move around the board and 
//find out which one still holds money. Voila! Now you're rich! 
let name = "Find the Real Money Bag";

//You can change the background
let background = {
    'background': 'url("https://media.istockphoto.com/id/1192893406/photo/safe-deposit-boxes-room-inside-of-a-bank-vault.jpg?s=612x612&w=0&k=20&c=fWYnSeHFGuNp-fhWdpTlDfXlnMSTIvVqYQdhbQHQBXA=")',
    'background-size': 'cover'
};

//You can setup your game here...

//Set some constant values
const SPEED = 300;
const GROUND = 80;

//setting game over screen to false
let gameOver = false;


//create the character sprite
let player = sprites.spawn();
player.image = "🧍";
player.x = 100;
player.y = GROUND;
player.vY = 0;
player.vX = 0;

let targets = [];

function updateTarget() {

    //Object on screen to collect
    const object = sprites.spawn();
    object.image = "💰";
    object.width = 30;
    object.height = 30;
    //Put it somewhere else
    object.x = Math.random() * WIDTH;
    object.y = Math.random() * HEIGHT;
    targets.push(object);
}

updateTarget();
updateTarget();
updateTarget();
updateTarget();


//This function gets the distance between two sprites
function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This function ends game if money bag was found
function destroyMoneyBag() {
    if (distance(targets[0], player) < 20) {
        // Destroy the money bag (targets[0])
        text.title = "GAME OVER! Now try again!";
        gameOver = true;


    }
}





/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {

    //Ending game if money bag was found
    if (gameOver) return;

    //Make the player move based on arrow keys
    if (buttons.left) {
        player.image = "🏃";
        player.x -= SPEED * dt;
    } else if (buttons.right) {
        player.image = "🏃";
        player.x += SPEED * dt;
    } else if (buttons.up) {
        player.image = "🏃";
        player.y += SPEED * dt;
    } else if (buttons.down) {
        player.image = "🏃";
        player.y -= SPEED * dt;
    } else
        player.image = "🧍";



    // WRAP it around left and right
    if (player.x < 0)
        player.x = WIDTH;
    if (player.x > WIDTH)
        player.x = 0;

    // STOP it when it goes too far UP or DOWN
    if (player.y < 0)
        player.y = 0;

    if (player.y > HEIGHT)
        player.y = HEIGHT;

    //calling function to end game if money bag is found
    destroyMoneyBag()



}


//Don't worry about this
export {
    name,
    background,
    frame
}
