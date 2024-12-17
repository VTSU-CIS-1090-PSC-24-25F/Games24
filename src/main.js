import buttons from './buttons.js';
import { updateSprites } from './sprites.js';
import { updateText } from './text.js'
  
window.addEventListener("hashchange", (event) => {
  if ( window.location.hash?.substring(1) ){
    window.location.reload();
  }
});

const name = window.location.hash?.substring(1);

if (name) {
  import(`./games/${name}.js`).then((game) => {

    const bg = document.querySelector('#background');
    const name = document.querySelector('#name');

    name.innerHTML = game.name;

    //Keep track of total and interframe time
    const startTime = new Date().getTime();
    let lastTime = startTime;

    //Schedule the first frame
    requestAnimationFrame(frame);

    function frame() {
      //Update total and interframe time
      const now = new Date().getTime();
      const dt = (now - lastTime) / 1000;
      const t = (now - startTime) / 1000;
      lastTime = now;

      //Call game's frame function
      game.frame(t, dt);

      //Update sprite positions
      updateSprites();

      //Update background
      for (const s in game.background) {
        bg.style[s] = game.background[s];
      }

      //Update text
      updateText();

      //Schedule the next frame
      requestAnimationFrame(frame);
    }

  });
}