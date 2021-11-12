import { getDati } from './scala.js';

// Dati impostati ora qua ma poi verranno messi nel form
let avanzamentoPedata = 2;
let larghezzaScala = 100;
let spessoreRivestimento = 2;
let spessoreBattiscopa = 10;

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

    // TEMPORANEE PER DISEGNO SENZA SELEZIONE
    if(stairSelect.selectedIndex == 0) {
        alzata = 17.8;
        pedata = 27.4;
        numeroAlzate = 3;
        rapporto = 63;
        sviluppo = 54.8;
        dislivello = 53.4;
        avanzamentoPedata = 2;
    }   


    // Disegna scala
    let drawTop = SVG('#drawing_top').size('100%', '100%');
    //draw.size();
    drawTop.viewbox(10, 10, 600, 200);

    drawTop.clear();
    
    for(let c=0; c<numeroAlzate-1; c++) {
        let line = drawTop.line(0, 0, 0, larghezzaScala).move(20+avanzamentoPedata+pedata*c,20)
            line.stroke({ color: '#666666', width: 1, linecap: 'round', dasharray: '3,3' })
        let rect = drawTop.rect(pedata, larghezzaScala).attr({ fill: '#dddddd', stroke: '#000','stroke-width': 1 }).move(20+pedata*c,20).back();
        if(c==numeroAlzate-1) {
            let rect = drawTop.rect(pedata, larghezzaScala).attr({ fill: '#dddddd', stroke: '#000','stroke-width': 1 }).move(20+pedata*c,20).back();
        }
    }

    let drawFront = SVG('#drawing_front').size('100%', '100%');
    //draw.size();
    drawFront.viewbox(10, 10, 600, 200);

    drawFront.clear();

}