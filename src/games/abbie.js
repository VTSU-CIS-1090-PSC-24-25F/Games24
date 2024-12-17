//Importing stuff from other files
import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "EPIC FISHING !!!!";

//You can change the background
let background = {
    "background-color": 'lightblue',
    "background-size": 'cover',
    "border-bottom": '350px solid #78a2f6'
};

// speed constant
const SPEED = 200;

// sets up the player sprite
let guy = sprites.spawn();
guy.image = "🧎‍♀️";
let boat = sprites.spawn();
boat.image = "🛶";

// sets initial positions, and links the x pos of the guy to the boat
boat.x = WIDTH / 2;
guy.x = boat.x;
boat.y = 370;
guy.y = 372;

const FishOpt = ["🐟", "🐠", "🦀", "🦈", "🐡"];

// allows for multiple fsh
let fishies = [];
let MAX_FISH = 5; // limits fsh

//const fish = sprites.spawn();
updateFish();

let line = [];
let lineSpeed = -2;  //make go down
let score = 0;


/**
 * This is the function that get's run every frame...
 * 
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */


function castLine() {
    let l = sprites.spawn();
    l.image = "|";
    l.xScale = 0.3;
    l.x = boat.x; // starts at boat's x pos
    l.y = 320; // honestly just makes it look better
    line.push(l);
}

function updateFish() {

    // makes it so the ocean isnt crowded with 5 billion fish
    while (fishies.length < MAX_FISH) {

        // make new fish
        let newFish = sprites.spawn();

        // random fsh sprite
        newFish.image = FishOpt[Math.floor(Math.random() * FishOpt.length)];

        // sets random fishy position :3
        newFish.x = (Math.random() * WIDTH) + 5;
        newFish.y = (Math.random() * 300) + 25;
        newFish.vX = 50;

        fishies.push(newFish);
    }



}

// gets distance between a + b
function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}


function frame(t, dt) {
    text.score = "Number of Fish Caught: " + score;

    for (let fish of fishies) {
        // make fishie move :) 
        fish.x -= fish.vX * dt;

        // if fish hits sides, bounce off n flip image

        if (fish.x > 775) {
            fish.x = 775;
            fish.vX = fish.vX * -1;
            fish.flipH = false;

        } else if (fish.x < 25) {
            fish.x = 25;
            fish.vX = fish.vX * -1;
            fish.flipH = true;
        }

    }


    // makes it so the player cant move while holding space
    if (!buttons.space) {

        if (buttons.right) {
            boat.x += SPEED * dt;
            guy.x = boat.x;
            boat.flipH = true; // Flips the image!!! :D
            guy.flipH = true;
        }

        if (buttons.left) {
            boat.x -= SPEED * dt;
            guy.x = boat.x;
            boat.flipH = false;
            guy.flipH = false;
        }
    }

    // sets up boundaries so the boat doesnt break through
    if (boat.x > 775 || guy.x > 775) {
        boat.x = 775;
        guy.x = boat.x;
    } else if (boat.x < 25 || guy.x < 25) {
        boat.x = 25;
        guy.x = boat.x;
    }

    // casts line when player hits space
    if (buttons.space) {
        castLine();
    }

    if (fishies.length == 0) {
        updateFish();
    }

    for (let l of line) {
        l.y += lineSpeed;

        for (let i = fishies.length - 1; i >= 0; i--) {
            let fish = fishies[i];

            if (distance(l, fish) < 30 && fish != null) {

                fishies.splice(i, 1); //removes caught fish
                sprites.destroy(fish);
                fish = null;
                score++;  // Update the score
                updateFish();
                break;
            }
            fishies = fishies.filter(z => z != null);
        }
    } 

    //Remove lines that have gone off the bottom
    for ( let i = 0; i < line.length; i++ ){
        if ( line[i].y < 0 ){
            sprites.destroy(line[i]);
            line[i] = null;
        }
    }
    line = line.filter( l => l != null ); 

    // increqases amount of fish based on score :)
    if (score == 5) {
        MAX_FISH = 7;

    } else if (score == 10) {
        MAX_FISH = 10;

    } else if (score == 20) {
        MAX_FISH = 15;

    } else if (score > 30) {
        MAX_FISH = 20;
    }


}

//Don't worry about this
export {
    name,
    background,
    frame
}