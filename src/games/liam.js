import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Road Rage";

//You can change the background
let background = {
    'background-color': '#A9A9A9',
    'background-size': 'cover'

};

//You can setup your game here...




let score = 0;

let truckSpawns = [400, 250, 100];
let lastTick = 0;
let tick = 0.2;
let line1 = sprites.spawn();
line1.image = "- - - - - - - - - - - - - - - - - - - - - - - - - - - -";
line1.x = WIDTH / 2;
line1.y = HEIGHT / 1.7;

let line2 = sprites.spawn();
line2.image = "- - - - - - - - - - - - - - - - - - - - - - - - - - - -";
line2.x = WIDTH / 2;
line2.y = HEIGHT / 3.6;


let raceCar = sprites.spawn();
raceCar.image = "🏎️";
raceCar.x = WIDTH / 12;
raceCar.y = HEIGHT / 2.01;
raceCar.flipH = true;
raceCar.yScale = 3.5;
raceCar.xScale = 2;


let truck = sprites.spawn();
truck.image = "🛻";
truck.x = 900;
truck.y = truckSpawns[0];
truck.yScale = 2;
truck.xScale = 2;

function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}






const SPEED = 300;

function frame(t, dt) {
    if (distance(truck, raceCar) < 100) {
        text.title = "Game Over"
        tick = tick + 1000000;
    }
    if (t > lastTick + tick) {
        lastTick = t;
        truck.x = truck.x - 50;
    }
    if (truck.x < raceCar.x) {

        truck.x = 900;
        let i = Math.floor(Math.random()*3);
        truck.y = truckSpawns[i];
        let points
        score++
        tick = tick + .005;
        text.score = "Score: " + score;
        text.title = ""
    }






    if (buttons.up)
        raceCar.y += SPEED * dt;
    if (buttons.down)
        raceCar.y -= SPEED * dt;


    if (raceCar.y < 110)
        raceCar.y = 110;

    if (raceCar.y > HEIGHT - 20)
        raceCar.y = HEIGHT - 20;
}
/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */




//Don't worry about this
export {
    name,
    background,
    frame
}