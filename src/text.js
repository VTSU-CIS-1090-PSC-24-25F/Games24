let title = document.querySelector('#screen > h1');
let score = document.querySelector('#screen > h2');

let text = {
    title: "",
    score: "",
    color: "black"
};

function updateText(){
    title.innerHTML = text.title;
    score.innerHTML = text.score;
    title.style.color = text.color;
    score.style.color = text.color;
}

export default text;
export {
    text,
    updateText
};