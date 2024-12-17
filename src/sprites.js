//An array to store all the sprites
let sprites = [];

//Find the HTML element that represents the game screen
let screen = document.querySelector('#screen');

/**
 * This function spawns a new sprite, and returns it.
 * 
 * @returns the new sprite
 */
function spawn(){

    //Create the basic sprite data
    let sprite = {
        image: "",
        x: 0, y: 0,
        flipH: false,
        flipV: false,
        xScale: 1,
        yScale: 1,
        rotation: 0
    };

    //Create the element, track it in the 
    //sprite data.
    let div = document.createElement('div');
    div.className = 'sprite';
    sprite._div = div;
    screen.appendChild(div);

    //Add this to the list of sprites
    sprites.push(sprite);

    return sprite;
}

/**
 * This function destroys a sprite.
 * 
 * @param sprite 
 */
function destroy( sprite ){
    //Remove the provided sprite from the sprites array
    sprites = sprites.filter( s => s != sprite );

    //Remove the provided sprite from the html page
    screen.removeChild(sprite._div);
}


function updateSprites() {
    for (let sprite of sprites) {
        let div = sprite._div;
        div.innerText = sprite.image;
        div.style.color = sprite.color;
        div.style.left = (sprite.x - div.clientWidth / 2 ) + "px";
        div.style.bottom = ( sprite.y - div.clientHeight / 2) + "px";
        div.style.transform = `rotate(${sprite.rotation}deg) scale(${sprite.xScale * (sprite.flipH ? -1 : 1)},${sprite.yScale * (sprite.flipV ? -1 : 1)})`;
    }
}

export default sprites;
export {
    spawn,
    destroy,
    updateSprites
};