import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';


console.log('localforage', localforage);

const data = reactive({
  name: '',
  avatar: '🧙',
  gold: 0,
  level: 1,
  exp: 0,
  food: 0,
  hp: 100,
  maxHp: 100,
  maxFood: 100,
  maxGold: 100,
  maxLevel: 100,
  monsters: [
    {
      'name': 'Dragon',
      'icon': '🐲',
      'hp': 100, 'maxHp': 100, 'level': 1, 'exp': 10
    }
  ],
  stamina: 10,
  mode: 'default'
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

// actions 

html`
<button 
  class="red" 
  @click="${(e) => {
    data.mode = 'fight';
  }}"
  >⚔ Fight</button>
  <button 
    class="blue" 
    @click="${(e) => {
    data.mode = 'rest'
  }}"
    >🏠 Rest</button>
<button
  class="green"
  @click="${(e) => {
    data.mode = 'gather'
  }}"
  >🍅 Gather</button>
`(document.querySelector('.game-actions'));

html`
${() => {
    switch (data.mode) {
      case 'default': return html`
      <b>Choose an option above</b>
    `;
        break;
      case 'fight': return html`
      <b>Fight</b>
    `;
      case 'gather': return html`
      <b>Gather</b>
    `;
      case 'rest': return html`
      <b>Rest</b>
    `;
    }
  }}
`(document.querySelector('.game-mode'));


// trigger init

window.addEventListener('load', init);