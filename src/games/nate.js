import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "🛧Don't Crash The  Internet🛧";

let backgroundColor = 'Green'

//You can change the background
let background = {
    'background-color': backgroundColor,
    'background-size': 'cover'
};
// Player
let internetCharactor = sprites.spawn();
internetCharactor.image = "🌐";
internetCharactor.x = WIDTH / 2
internetCharactor.y = HEIGHT / 2
let playerSpeed = 175;


//enemys
let internetEnemyOne = sprites.spawn()
internetEnemyOne.image = "⚠";
internetEnemyOne.x = 50
internetEnemyOne.y = -90
let enemySpeed = 200

let internetEnemytwo = sprites.spawn()

let enemySpeedTwo = enemySpeed + 4
/*c*
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
// Keep track of Score
let score = 0

//To make dt effect how many times the game runs befor giving score
let dtCounter = 0

//Player dies
let playerdeath = false
let deathScreen = false

//Color change
let colorChangerequirement = 10

//Related to emeny speed in: 50
let speedRequirement = 20
let speedCap = 200
let timer = 0

function frame(t, dt) {

   


    // The enemy's speed gose up

    //enemy ones homing
    const dx = internetCharactor.x - internetEnemyOne.x
    const dy = internetCharactor.y - internetEnemyOne.y
    const distance = dx * dx + dy * dy

    if (distance > 0) {
        internetEnemyOne.x += (dx / distance) * enemySpeed
        internetEnemyOne.y += (dy / distance) * enemySpeed
    } if (distance < 31) {
        playerdeath = true
        deathScreen = true
    }

    if (playerdeath == true) {
        if (deathScreen != false) {
            text.title = "Times Ran Out";
        }
        internetEnemyOne.x = internetCharactor.x
        internetEnemyOne.y = internetCharactor.y
        return
    }

    if (dtCounter == 125) {
        dtCounter = 0;
        score++;
    }
    dtCounter++;
    text.score = "Score: " + score;


    //Game Point system

    //Make the UFO based on arrow keys

    if (buttons.right)
        internetCharactor.x += playerSpeed * dt;
    if (buttons.left)
        internetCharactor.x -= playerSpeed * dt;
    if (buttons.up)
        internetCharactor.y += playerSpeed * dt;
    if (buttons.down)
        internetCharactor.y -= playerSpeed * dt;

    // WRAP it around left and right
    if (internetCharactor.x < 0)
        internetCharactor.x = WIDTH;
    if (internetCharactor.x > WIDTH)
        internetCharactor.x = 0;

    // STOP it when it goes too far UP or DOWN
    if (internetCharactor.y < 0)
        internetCharactor.y = 0;

    if (internetCharactor.y > HEIGHT)
        internetCharactor.y = HEIGHT;

}

//Don't worry about this
export {
    name,
    background,
    frame

}