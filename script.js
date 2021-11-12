import { getDati } from './scala.js';

// Dati impostati ora qua ma poi verranno messi nel form
const avanzamentoPedata = 2;
const larghezzaScala = 100;
const spessoreRivestimento = 2;
const spessoreBattiscopa = 10;

let makeStairButton = document.getElementById('makeStairButton');
let stairSelect = document.getElementById("stairSelect");

let dati = getDati();

getDati().forEach((scala, index) => {
    let option = document.createElement("option");
    option.text = "Dislivello: " + scala.dislivello.toFixed(1) + " cm | Alzata: " + scala.alzata.toFixed(1) + " cm | Pedata: " + scala.pedata.toFixed(1) + " cm | Numero alzate: " + scala.numeroAlzate + " | Sviluppo: " + scala.sviluppo.toFixed(1) + " cm | Rapporto: " + scala.rapporto;
    option.value = index
    stairSelect.add(option);
});

makeStairButton.onclick = function (event) {
    let scala = dati[stairSelect.selectedIndex];
    
    let alzata = scala.alzata;
    let pedata = scala.pedata;
    let numeroAlzate = scala.numeroAlzate;
    let rapporto = scala.rapporto;
    let sviluppo = scala.sviluppo;
    let dislivello = scala.dislivello;

    // Disegna scala


}