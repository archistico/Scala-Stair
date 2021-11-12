import { getDati } from './scala.js';

let makeStairButton = document.getElementById('makeStairButton');
let stairSelect = document.getElementById("stairSelect");

makeStairButton.onclick = function (event) {
    console.log(stairSelect.selectedIndex);
}

let dati = getDati();

getDati().forEach((scala, index) => {
    let option = document.createElement("option");
    option.text = "Dislivello: " + scala.dislivello.toFixed(1) + " cm | Alzata: " + scala.alzata.toFixed(1) + " cm | Pedata: " + scala.pedata.toFixed(1) + " cm | Numero alzate: " + scala.numeroAlzate + " | Sviluppo: " + scala.sviluppo.toFixed(1) + " cm | Rapporto: " + scala.rapporto;
    option.value = index
    stairSelect.add(option);
});