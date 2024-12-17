//Button state
let buttons = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    enter: false
};

//Watch key up and down, update button state
document.onkeyup = document.onkeydown = function (event) {
    let pressed = event.type == "keydown";
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            buttons.up = pressed;
            break;
        case 'ArrowDown':
            event.preventDefault();
            buttons.down = pressed;
            break;
        case 'ArrowLeft':
            event.preventDefault();
            buttons.left = pressed;
            break;
        case 'ArrowRight':
            event.preventDefault();
            buttons.right = pressed;
            break;
        case ' ':
            event.preventDefault();
            buttons.space = pressed;
            break;
        case 'Enter':
            event.preventDefault();
            buttons.enter = pressed;
            break;
    }
};

export default buttons;