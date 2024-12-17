//Importing stuff from other files
import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Bear Simulator";

//You can change the background
let background = {
    'background-color': 'lightgreen',
    'background-size': 'cover'
};

//General setup cause global variables are dumb
let SPEED = 50;
let x = false;
let day = 0;
let spriteTypes = ["🐻", "⚫", "🍓", "🍇", "🍒", "🐰", "🦴", "🌳", "🌲", "🎄"];
//Bear setup cause important
let bear = sprites.spawn(true, 5);
bear.image = spriteTypes[0];
bear.x = randomNumber((WIDTH / SPEED)) * SPEED + SPEED / 2;
bear.y = randomNumber((HEIGHT / SPEED)) * SPEED + SPEED / 2;
bear.yScale = 0.85;
bear.xScale = 0.85;
bear.live = false;
bear.maxHunger = 50;
bear.hunger = bear.maxHunger;
let cave = null
//bush existence properties
let bushNumber = 0;
let bush = [];
//Rabbit existence properties
let rabbitNumber = 0
let rabbit = [];
let bone = [];
//Tree existence properties
let treeNumber = 0;
let tree = [];
//Previous Movement Check
let previousMove = {
    right: false,
    down: false,
    left: false,
    up: false,
    space: false
}

//Previous Position Check
let beforePosition = [bear.x, bear.y];

//Chooses random number from 0 to max
function randomNumber(max) {
    return Math.floor(Math.random() * (max));
}

function spawnCollision(attemptedSpawn) {
    let counter = 0;
    if (Collision(bear, attemptedSpawn)) {
        counter++;
    };
    if (Collision(cave, attemptedSpawn)) {
        counter++;
    };
    for (let list = 0; list < bush.length; list++) {
        if (Collision(bush[list], attemptedSpawn)) {
            counter++;
        };
    };
    for (let list = 0; list < rabbit.length; list++) {
        if (Collision(rabbit[list], attemptedSpawn)) {
            counter++;
        };
    };
    for (let list = 0; list < tree.length; list++) {
        if (Collision(tree[list], attemptedSpawn)) {
            counter++;
        };
    };
    if (counter === 0) {
        return true
    } else {
        return false
    }
}
//Takes the random number from above and makes it fit the grid of 50x50 pixels
function propSpawn(sprite, type) {
    x = false;
    while (x == false) {
        let attemptedSpawn = {
            x: randomNumber((WIDTH / SPEED)) * SPEED + SPEED / 2,
            y: randomNumber((HEIGHT / SPEED)) * SPEED + SPEED / 2
        };
        switch (type) {

            case bear:
                bear.x = attemptedSpawn["x"];
                bear.y = attemptedSpawn["y"];
                x = true;
                break;

            case bush:
                if (spawnCollision(attemptedSpawn)) {
                    sprite.x = attemptedSpawn["x"];
                    sprite.y = attemptedSpawn["y"];
                    x = true;
                }
                break;

            case rabbit:
                if (spawnCollision(attemptedSpawn)) {
                    sprite.x = attemptedSpawn["x"];
                    sprite.y = attemptedSpawn["y"];
                    x = true;
                }
                break;

            case tree:
                if (spawnCollision(attemptedSpawn)) {
                    sprite.x = attemptedSpawn["x"];
                    sprite.y = attemptedSpawn["y"];
                    x = true;
                }
                break;

        }
    }
}

//Stops from spawning multiple entities on top of each other
//Bear and cave spawns first
//  ies spawn 2nd so avoid spawning on berries and bear

//Supposedly universal sprite deletion, removes the x/y axises so java script won't remember
//after the sprite is deleted, then deletes the sprite
//Future issue is all other data within sprite still exists but should get overwritten
//when new entities made
function entityDeletion(sprite) {
    delete sprite.y;
    delete sprite.x;
    sprites.destroy(sprite);
}

function Collision(sprite1, sprite2) {
    if (sprite1 != undefined &&
        sprite2 != undefined &&
        sprite1.x == sprite2.x &&
        sprite1.y == sprite2.y) {
        return true
    } else { return false }
}
//Bear Spawn
//Cave info
//Deletes the cave if it is defined
function generalDelete(sprite) {
    switch (sprite) {
        case cave:
            if (cave != undefined) {
                entityDeletion(cave);
            }
            break;

        case bush:
            if (sprite[0] != sprite.length) {
                for (let remove = 0; remove < sprite.length; remove++) {
                    for (let amount = 0; amount < sprite[remove].berries.length; amount++) {
                        entityDeletion(sprite[remove].berries[amount]);
                    }
                    entityDeletion(sprite[remove]);
                }
            } break;
        case rabbit:
            if (sprite[0] != sprite.length) {
                for (let remove = 0; remove < sprite.length; remove++) {
                    entityDeletion(sprite[remove]);
                }
            } break;
        case bone:
            if (sprite[0] != sprite.length) {
                for (let remove = 0; remove < sprite.length; remove++) {
                    if (sprite[remove].age >= 2) {
                        entityDeletion(sprite[remove])
                    }
                    else { sprite[remove].age++; }
                }
            } break;

        case tree:
            if (sprite[0] != sprite.length) {
                for (let remove = 0; remove < sprite.length; remove++) {
                    entityDeletion(sprite[remove]);
                }
            } break;


    }
}

//Chooses how many berries exist when creating them
function entityQuantity(sprite) {
    switch (sprite) {

        case bush:
            bushNumber = 15;
            return bushNumber;

        case rabbit:
            rabbitNumber = 5;
            return rabbitNumber;

        case tree:
            treeNumber = 25;
            return treeNumber;
    }
}


//Within an array called bush makes as many berries as requested and places them
function entityCreation(sprite) {
    switch (sprite) {
        case cave:
            cave = sprites.spawn()
            cave.x = bear.x;
            cave.y = bear.y;
            cave.image = spriteTypes[1];
            cave.yScale = 0.85;
            cave.xScale = 0.85;
            break;

        case bush:
            for (let repeat = 0; repeat < entityQuantity(bush); repeat++) {
                sprite[repeat] = sprites.spawn();
                propSpawn(sprite[repeat], sprite);
                sprite[repeat].image = spriteTypes[7];
                sprite[repeat].yScale = 0.6;
                sprite[repeat].xScale = 0.9;
                sprite[repeat].berries = [];
                let type = randomNumber(3) + 3
                let placement = []
                let berries = spriteTypes[randomNumber(3) + 2];

                for (let amount = 0; amount < type; amount++) {
                    let repeat1 = sprite[repeat].berries.length;
                    sprite[repeat].berries[repeat1] = sprites.spawn(true, 1);
                    switch (type) {
                        case 3:
                            placement = [[0, 7], [10, -3], [-10, -3]]
                            sprite[repeat].berries[repeat1].x = sprite[repeat].x +
                                placement[amount][0] + randomNumber(3) - 1;
                            sprite[repeat].berries[repeat1].y = sprite[repeat].y +
                                placement[amount][1] + randomNumber(3) - 1;
                            break;
                        case 4:
                            placement = [[0, 8], [11, -4], [-11, -4], [0, -2]]
                            sprite[repeat].berries[repeat1].x = sprite[repeat].x +
                                placement[amount][0] + randomNumber(5) - 2;
                            sprite[repeat].berries[repeat1].y = sprite[repeat].y +
                                placement[amount][1] + randomNumber(5) - 2;
                            break;
                        case 5:
                            placement = [[5, 8], [-5, 8], [-11, -4], [11, -4], [0, -2]]
                            sprite[repeat].berries[repeat1].x = sprite[repeat].x +
                                placement[amount][0] + randomNumber(3) - 1;
                            sprite[repeat].berries[repeat1].y = sprite[repeat].y +
                                placement[amount][1] + randomNumber(3) - 1;
                            break;
                    }
                    sprite[repeat].berries[repeat1].yScale = randomNumber(10) / 100 + 0.15;
                    sprite[repeat].berries[repeat1].xScale = sprite[repeat].berries[repeat1].yScale;
                    sprite[repeat].berries[repeat1].image = berries;
                    sprite[repeat].berries[repeat1].rotation = randomNumber(60) - 30;
                    if (berries != "🍒") {
                        sprite[repeat].berries[repeat1].rotation = sprite[repeat].berries[repeat1].rotation + 37.5
                    };
                }
            } break;
        case rabbit:
            for (let repeat = 0; repeat < entityQuantity(rabbit); repeat++) {
                sprite[repeat] = sprites.spawn();
                propSpawn(sprite[repeat], sprite);
                sprite[repeat].image = spriteTypes[5];
                sprite[repeat].yScale = 0.85;
                sprite[repeat].xScale = 0.85;
            }
            break;

        case tree:
            for (let repeat = 0; repeat < entityQuantity(tree); repeat++) {
                let gambling = randomNumber(1000)
                let image = 10
                if (
                    [gambling] == 0
                ) {
                    image = 9;
                } else if (
                    [gambling] > 0 &&
                    [gambling] < 1000
                ) {
                    image = 8
                }
                sprite[repeat] = sprites.spawn();
                propSpawn(sprite[repeat], sprite);
                sprite[repeat].image = spriteTypes[image];
                sprite[repeat].yScale = 0.88;
                sprite[repeat].xScale = 0.88;
            }
            break;
    }
}
//Every movement checks for if the bear is on the same x and y position of the bear and
//if the bush exists then increases hunger and deletes the bush sprite
function entityCollision(sprite) {
    switch (sprite) {
        case "spaceless":
            if (Collision(cave, bear)) {
                bear.image = ""
            } else {
                bear.image = spriteTypes[0];
            }
            break;

        case "spaced":
            if (Collision(cave, bear)) {
                newDay()
                break;
            } else break;

        case bush:
            for (let repeat = 0; repeat < sprite.length; repeat++) {
                if (Collision(sprite[repeat], bear) &&
                    sprite[repeat].berries[0].image != "") {
                    if (sprite[repeat].berries[0].image == "🍒") {
                        bear.hunger = bear.hunger + 4;
                        if (bear.hunger > bear.maxHunger) {
                            bear.hunger = bear.maxHunger;
                        };
                        for (let amount = 0; amount < sprite[repeat].berries.length; amount++) {
                            sprite[repeat].berries[amount].image = ""
                            entityDeletion(sprite[repeat].berries[amount]);
                        }
                    } else if (sprite[repeat].berries[0].image == "🍇") {
                        bear.hunger = bear.hunger + 8;
                        if (bear.hunger > bear.maxHunger) {
                            bear.hunger = bear.maxHunger;
                        };
                        for (let amount = 0; amount < sprite[repeat].berries.length; amount++) {
                            sprite[repeat].berries[amount].image = ""
                            entityDeletion(sprite[repeat].berries[amount]);
                        }
                    } else if (sprite[repeat].berries[0].image == "🍓") {
                        bear.hunger = bear.hunger + 6;
                        if (bear.hunger > bear.maxHunger) {
                            bear.hunger = bear.maxHunger;
                        };
                        for (let amount = 0; amount < sprite[repeat].berries.length; amount++) {
                            sprite[repeat].berries[amount].image = ""
                            entityDeletion(sprite[repeat].berries[amount]);
                        }
                    }
                }
            } break;
        case rabbit:
            for (let repeat = 0; repeat < sprite.length; repeat++) {
                if (Collision(sprite[repeat], bear)) {
                    bear.hunger = bear.hunger + 11;
                    if (bear.hunger > bear.maxHunger) {
                        bear.hunger = bear.maxHunger;
                    };
                    for (let amount = 0; amount < randomNumber(4) + 2; amount++) {
                        let repeat1 = bone.length;
                        bone[repeat1] = sprites.spawn(true);
                        bone[repeat1].x = sprite[repeat].x + randomNumber(30) - 15;
                        bone[repeat1].y = sprite[repeat].y + randomNumber(30) - 15;
                        bone[repeat1].image = spriteTypes[6];
                        bone[repeat1].age = 0;
                        bone[repeat1].yScale = 0.25;
                        bone[repeat1].xScale = 0.25;
                        bone[repeat1].rotation = randomNumber(360);
                    }
                    entityDeletion(sprite[repeat]);
                    break;
                }
            } break;

        case tree:
            for (let repeat = 0; repeat < sprite.length; repeat++) {
                if (Collision(sprite[repeat], bear)) {
                    bear.x = beforePosition[0];
                    bear.y = beforePosition[1];
                }
            }
    }
}
function entityMoveCheck(sprite) {
    let failsafe = 0;
    let direction = 5;
    for (let i = 0; i < sprite.length;) {
        if (sprite == rabbit) {
            direction = randomNumber(4);
        }
        let attemptedSpawn = {
            x: sprite[i].x,
            y: sprite[i].y
        };
        if (direction === 0) {
            attemptedSpawn.y = attemptedSpawn.y + SPEED;
        } else if (direction === 1) {
            attemptedSpawn.x = attemptedSpawn.x + SPEED;
        } else if (direction === 2) {
            attemptedSpawn.y = attemptedSpawn.y - SPEED;
        } else if (direction === 3) {
            attemptedSpawn.x = attemptedSpawn.x - SPEED;
        }
        if (spawnCollision(attemptedSpawn) &&
            !borderCheck(attemptedSpawn)
        ) {
            sprite[i].x = attemptedSpawn.x;
            sprite[i].y = attemptedSpawn.y;
            failsafe = 0;
            i++;
        }
        //failSafe
        failsafe++
        if (failsafe == 50) {
            i++;
        }
    }
}
//Resets all of the values when changed from dead to alive
// + re-randomize spawns + deletes entities that need to be deleted
function resetGame() {
    day = 0
    bear.hunger = bear.maxHunger;
    bear.live = true;
    propSpawn(bear, bear);
    generalDelete(cave);
    generalDelete(bush);
    generalDelete(rabbit);
    generalDelete(tree);
    generalDelete(bone);
    entityCreation(cave);
    entityCreation(bush);
    entityCreation(rabbit);
    entityCreation(tree);
}

function newDay() {
    day++
    bear.hunger = bear.hunger;
    if (bear.hunger <= 0) {
        bear.hunger = 0
    }
    propSpawn(bear, bear);
    generalDelete(cave);
    generalDelete(bush);
    generalDelete(rabbit);
    generalDelete(tree);
    generalDelete(bone);
    entityCreation(cave);
    entityCreation(bush);
    entityCreation(rabbit)
    entityCreation(tree)
}

//Collision check using the previous position that was in
function borderCheck(sprite) {
    if (sprite.x > (WIDTH - SPEED / 2) || sprite.x < SPEED / 2) {
        if (sprite == bear) {
            bear.x = beforePosition[0];
        } else return true
    }
    if (sprite.y > (HEIGHT - SPEED / 2) || sprite.y < SPEED / 2) {
        if (sprite == bear) {
            bear.y = beforePosition[1];
        } else return true
    }
    return false
}
/**
 * This is the function that get's run every frame...
 * @param t - The number of seconds since the game began 
 * @param dt - The number of seconds since the last frame
 */
function frame(t, dt) {
    //Game title
    if (!bear.live) {
        text.title = "Hit space to start.";
        text.score = "";
    } else {
        text.title = "";
        //Using the score text to display day amount
        text.score = "Day: " + day.toString();
        //Made a new text called hunger, displays the current value of hunger
        text.score += "<br>Hunger: " + bear.hunger.toString();
    }




    //If bear dead he can't move
    if (bear.live) {
        //Movement that checks every input but only if move was just done
        if (buttons.right && previousMove.right != buttons.right) {
            //Takes position of bear before moving
            beforePosition[0] = bear.x;
            beforePosition[1] = bear.y;
            //Is the moving
            bear.x += SPEED;
            //Sets current button condition to the 
            //condition of previous Move to only allow one input
            buttons.right = previousMove.right;
            //Checks if collision is doing
            borderCheck(bear);
            entityCollision(tree)
            //Decreases hunger when moves IF the position is different from before
            if (beforePosition[0] != bear.x) {
                entityCollision(rabbit);
                entityMoveCheck(rabbit);
                bear.hunger -= 1;
                if (bear.hunger <= 0) {
                    bear.hunger = 0
                }
            }
            entityCollision(bush);
            entityCollision(rabbit);
        }
        //Above code repeats but for left direction
        if (buttons.left && previousMove.left != buttons.left) {
            beforePosition[0] = bear.x;
            beforePosition[1] = bear.y;
            bear.x -= SPEED;
            buttons.left = previousMove.left;
            borderCheck(bear);
            entityCollision(tree)
            if (beforePosition[0] != bear.x) {
                entityCollision(rabbit);
                entityMoveCheck(rabbit);
                bear.hunger -= 1;
                if (bear.hunger <= 0) {
                    bear.hunger = 0
                }
            }
            entityCollision(bush);
            entityCollision(rabbit);
        }
        //Above above code repeats but for up direction
        if (buttons.up && previousMove.up != buttons.up) {
            beforePosition[1] = bear.y;
            beforePosition[0] = bear.x;
            bear.y += SPEED;
            buttons.up = previousMove.up;
            borderCheck(bear);
            entityCollision(tree)
            if (beforePosition[1] != bear.y) {
                entityCollision(rabbit);
                entityMoveCheck(rabbit);
                bear.hunger -= 1;
                if (bear.hunger <= 0) {
                    bear.hunger = 0
                }
            }
            entityCollision(bush);
            entityCollision(rabbit);
        }
        //Above above above code repeats but for down direction
        if (buttons.down && previousMove.down != buttons.down) {
            beforePosition[1] = bear.y;
            beforePosition[0] = bear.x;
            bear.y -= SPEED;
            buttons.down = previousMove.down;
            borderCheck(bear);
            entityCollision(tree)
            if (beforePosition[1] != bear.y) {
                entityCollision(rabbit);
                entityMoveCheck(rabbit);
                bear.hunger -= 1;
                if (bear.hunger <= 0) {
                    bear.hunger = 0
                }
            }
            entityCollision(bush);
            entityCollision(rabbit);
        }
        ;
        //Kills bear if hunger is or lower than 0
        if (bear.hunger <= 0) {
            bear.live = false
        }

        //Sets hunger to 0 to insta-kill bear
        if (buttons.enter) {
            bear.hunger = 0
        }

        entityCollision("spaceless")

        if (buttons.space && previousMove.space != buttons.space) {
            buttons.space = previousMove.space;
            entityCollision("spaced")
        }
    } else {
        //When dead waits for a space input to reset the game
        if (buttons.space && previousMove.space != buttons.space) {
            buttons.space = previousMove.space;
            resetGame()
        }
    }
}
//Don't worry about this
//I'm very concerned (jk)
export {
    name,
    background,
    frame
}