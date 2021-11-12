import { getDati } from './scala.js';

let makeStairButton = document.getElementById('makeStairButton');
let stairSelect = document.getElementById("stairSelect");

makeStairButton.onclick = function (event) {
    console.log("ok");
}

let dati = getDati();
console.log(dati);

// getDati().forEach(element => {
//     let option = document.createElement("option");
//     option.text = element;
//     stairSelect.add(option);
// });