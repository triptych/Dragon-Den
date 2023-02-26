import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';


console.log('localforage', localforage);

const data = reactive({
  name: '',
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
html`${() => {
  if (data.name) {
    return html`Name: ${data.name}`;
  } else {
    return html`Name: ${() => {
      const name = prompt("Please enter your name");
      data.name = name;
    }}`;
  }
}}`(document.querySelector('.game-name'));





// trigger init

window.addEventListener('load', init);