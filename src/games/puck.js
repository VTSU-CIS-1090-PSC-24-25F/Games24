import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

//You should set your game's name
let name = "Zombie Attack";

//You can change the background
let background = {
    'background-color': '#7e3429',
    'background-size': 'cover'
};

function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

let player = sprites.spawn()
player.image = "🧍"
player.x = WIDTH / 2;
player.y = HEIGHT / 2;

let bulletTime = 0;
let zombies = [];
let zombieCount = 0;
let bulletCount = 0;
let score = 0;

let bullets = [];
function spawnBullet() {
    let bul = sprites.spawn()
    bul.image = "↑"
    bullets.push(bul);
    bul.x = player.x
    bul.y = player.y
    bulletCount++
    if (buttons.left) {
        bul.vX = -2
        bul.vY = 0
        bul.rotation = 270
    } else if (buttons.right) {
        bul.vX = 2
        bul.vY = 0
        bul.rotation = 90
    } else if (buttons.down) {
        bul.vY = -2
        bul.vX = 0
        bul.rotation = 180
    } else {
        bul.vY = 2
        bul.vX = 0
        bul.rotation = 0
    }
}


function spawnEnemy() {
    if (zombieCount == 0) {
        for (let h = 0; h < score; h++) {
            let enemy = sprites.spawn();
            enemy.image = "🧟"
            enemy.x = Math.random() * WIDTH;
            enemy.y = Math.random() * HEIGHT;
            enemy.vX = 1;
            enemy.vY = 1;
            zombies.push(enemy);
        }
        zombieCount += score
        score++
    }
}

const SPEED = 150;

function frame(t, dt) {

    bulletTime++

    text.score = ("Score: " + score);
    spawnEnemy()

    if (buttons.right) {
        player.x += SPEED * dt;
        player.image = "🏃‍♂️"
        player.flipH = true
    }
    if (buttons.left) {
        player.x -= SPEED * dt;
        player.image = "🏃‍♂️"
        player.flipH = false
    }
    if (buttons.up) {
        player.y += SPEED * dt;
        player.image = "🧍"
    }
    if (buttons.down) {
        player.y -= SPEED * dt;
        player.image = "🧍"
    }
    if (buttons.space && bulletCount < 11 && bulletTime > 10) {
        spawnBullet()
    }
    for (let i = 0; i < zombies.length; i++) {
        if (distance(player, zombies[i]) < 40) {
            text.title = "Too bad!";
            sprites.destroy(player);
            player = null;
        }
        zombies[i].x += zombies[i].vX
        zombies[i].y += zombies[i].vY
        if (zombies[i].x > WIDTH) {
            zombies[i].vX = zombies[i].vX * -1;
        } else if (zombies[i].x < 0) {
            zombies[i].vX = zombies[i].vX * -1;
        }
        if (zombies[i].y > HEIGHT) {
            zombies[i].vY = zombies[i].vY * -1;
        } else if (zombies[i].y < 0) {
            zombies[i].vY = zombies[i].vY * -1;
        }
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].vX
        bullets[i].y += bullets[i].vY
        for (let h = 0; h < zombies.length; h++) {
            if (zombies[h] != null && bullets[i] != null && distance(bullets[i], zombies[h]) < 40) {
                sprites.destroy(zombies[h]);
                zombies[h] = null
                zombieCount = zombieCount - 1
                sprites.destroy(bullets[i]);
                bullets[i] = null
                bulletCount = bulletCount - 1
            }
        }
        if (bullets[i] != null) {
            if (bullets[i].x < 0) {
                sprites.destroy(bullets[i]);
                bullets[i] = null
                bulletCount = bulletCount - 1
            } else if (bullets[i].y < 0) {
                sprites.destroy(bullets[i]);
                bullets[i] = null
                bulletCount = bulletCount - 1
            } else if (bullets[i].x > WIDTH) {
                sprites.destroy(bullets[i]);
                bullets[i] = null
                bulletCount = bulletCount - 1
            } else if (bullets[i].y > HEIGHT) {
                sprites.destroy(bullets[i]);
                bullets[i] = null
                bulletCount = bulletCount - 1
            }
        }

        if (player.x < 0)
            player.x = 0;
        if (player.x > WIDTH)
            player.x = WIDTH;
        if (player.y < 0)
            player.y = 0;
        if (player.y > WIDTH)
            player.y = WIDTH;
    }

    zombies = zombies.filter(z => z != null);
    bullets = bullets.filter(z => z != null);


}

//You can setup your game here...

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