import buttons from '../buttons.js';
import * as sprites from '../sprites.js';
import text from '../text.js';
import { WIDTH, HEIGHT } from '../screen.js';

let mouse;
let cat;
let cheese;
let walls = [];
let level = 1;
let score = 0;
let gameOver = false;

function spawnMouse() {
    mouse = sprites.spawn();
    mouse.image = "🐭";
    mouse.x = WIDTH / 2;
    mouse.y = HEIGHT / 2;
    mouse.xScale = 2;
    mouse.yScale = 2;
}

function spawnCat() {
    cat = sprites.spawn();
    cat.image = "🐱";
    cat.x = Math.random() * WIDTH;
    cat.y = Math.random() * HEIGHT;
    cat.xScale = 2;
    cat.yScale = 2;
}

function spawnCheese() {
    cheese = sprites.spawn();
    cheese.image = "🧀";
    cheese.x = Math.random() * WIDTH;
    cheese.y = Math.random() * HEIGHT;
    cheese.xScale = 2;
    cheese.yScale = 2;
}

function generateWalls() {
    walls = [];
    for (let i = 0; i < level * 5; i++) {
        let wall = sprites.spawn();
        wall.image = "X";
        wall.x = Math.random() * WIDTH;
        wall.y = Math.random() * HEIGHT;
        wall.width = Math.random() * 100 + 50;
        wall.height = Math.random() * 100 + 50;
        wall.xScale = wall.width / 64;
        wall.yScale = wall.height / 64;
        walls.push(wall);
    }
}

function checkCollisions(sprite, xMove, yMove) {
    let futureX = sprite.x + xMove;
    let futureY = sprite.y + yMove;

    for (let wall of walls) {
        if (
            futureX + sprite.xScale * 20 > wall.x &&
            futureX - sprite.xScale * 20 < wall.x + wall.width &&
            futureY + sprite.yScale * 20 > wall.y &&
            futureY - sprite.yScale * 20 < wall.y + wall.height
        ) {
            return true;
        }
    }
    return false;
}

function resetLevel() {
    level = 1;
    score = 0;
    gameOver = false;
    spawnMouse();
    spawnCat();
    spawnCheese();
    generateWalls();
}

resetLevel();

function frame(t, dt) {
    if (gameOver) {
        text.title = "Game Over!";
        text.score = `Final Score: ${score}`;
        if (buttons.space) {
            resetLevel();
        }
        return;
    }

    if (buttons.up && !checkCollisions(mouse, 0, 5)) mouse.y += 5;
    if (buttons.down && !checkCollisions(mouse, 0, -5)) mouse.y -= 5;
    if (buttons.left && !checkCollisions(mouse, -5, 0)) mouse.x -= 5;
    if (buttons.right && !checkCollisions(mouse, 5, 0)) mouse.x += 5;

    if (
        Math.abs(mouse.x - cheese.x) < 20 &&
        Math.abs(mouse.y - cheese.y) < 20
    ) {
        score++;
        spawnCheese();
        level++;
        generateWalls();
    }

    if (
        Math.abs(mouse.x - cat.x) < 20 &&
        Math.abs(mouse.y - cat.y) < 20
    ) {
        gameOver = true;
    }

    text.title = `Level: ${level}`;
    text.score = `Score: ${score}`;

}

export {
    frame,
    text,
    resetLevel,
};