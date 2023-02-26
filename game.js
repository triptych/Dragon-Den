import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';


console.log('localforage', localforage);

const data = reactive({
  name: '',
  avatar: '🧙'
});



const init = () => {
  console.log("init");
  getName();
}

// get name
const getName = () => {
  localforage.getItem("name").then((value) => {
    console.log("got name!", value);
    if (value) {
      data.name = value;
    } else {
      data.name = 'Guest'
    }

  }).catch((err) => {
    console.error('error:', err);
  })
}

// render name or ask for name
// html`${() => {
//   if (data.name) {
//     return html`Name: ${data.name}`;
//   } else {
//     return html`Name: ${() => {
//       const name = prompt("Please enter your name");
//       data.name = name;
//     }}`;
//   }
// }}`(document.querySelector('.game-name'));
html`
  Name: ${() => data.name} 
  <button 
    class="purple"
    @click="${(e) => {
    console.log("button clicked e", e);
    changeName();
  }}">Change</button>
`(document.querySelector('.game-name'));


// render avatar
html`<div class="avatar">${data.avatar}</div>`(document.querySelector('.game-avatar'));
// methods
const changeName = () => {
  data.name = prompt("Please enter a player name");
  localforage.setItem("name", data.name);
}


// trigger init

window.addEventListener('load', init);