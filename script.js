 import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';


console.log('localforage', localforage);

const init = () => {
  console.log("init");
}



// trigger init

window.addEventListener('load', init);