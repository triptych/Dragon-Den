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
    },
    {
      'name': 'Goblin',
      'icon': '👹',
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
html`
<div class="avatar">${data.avatar}</div>
<div class="stats">
  <div>HP: ${() => data.hp} / ${() => data.maxHp}</div>
  <div>${"Level: " + data.level + " / " + data.maxLevel}</div>
</div>
`(document.querySelector('.game-avatar'));
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
      case 'default': return html` <b>Choose an option above</b>`;
        break;
      case 'choose': return html`
        ${() => getDefaultUI()}
        `;
        break;
      case 'fight': return html`
        ${() => getFightUI()}
        `;
        break;
      case 'gather': return html`
        ${() => getGatherUI()}
        `;
        break;
      case 'rest': return html`
        ${() => getRestUI()}
        `;
        break;
      default: return html`- Something went wrong - `;
    }
  }}
`(document.querySelector('.game-mode'));

// render default 

const getDefaultUI = () => {
  return html`
    <b>Choose an option above</b>
    `;
};

// render fight
const getFightUI = () => {
  console.log('getfightUI');
  return html`
  <h2>Fight</h2>
  <div class="monster">
    <div class="monster-icon">${data.monsters[0].icon}</div>
    <div class="monster-name">Name: ${data.monsters[0].name}</div>
    <div class="monster-hp">HP: ${data.monsters[0].hp} / ${data.monsters[0].maxHp}</div>
    <div class="monster-level">Level: ${data.monsters[0].level}</div>
  </div>
  <div class="battleUI">
    <button class="purple" @click="${(e) => {
      data.monsters[0].hp = data.monsters[0].hp - 1;
      data.hp = data.hp - 1;
      localforage.setItem("monsters", data.monsters);
    }}"> Attack
      </button>
    <button class="orange" @click="${(e) => {
      data.mode = "choose";
    }}"> Flee</button>
  </div>
  `;
}

const getGatherUI = () => {
  console.log('getgatherUI');
  return html`<>-- Gather --<>`;
}
const getRestUI = () => {
  console.log('getrestUI');
  return html`<>-- Rest --<>`;
}




// trigger init

window.addEventListener('load', init);