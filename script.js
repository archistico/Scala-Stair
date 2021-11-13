import { getDati } from './scala.js';

let stairSelect = document.getElementById('stairSelect');

let dati = getDati();

getDati().forEach((scala, index) => {
    let option = document.createElement("option");
    option.text = "Dislivello: " + scala.dislivello.toFixed(1) + " cm | Alzata: " + scala.alzata.toFixed(1) + " cm | Pedata: " + scala.pedata.toFixed(1) + " cm | Numero alzate: " + scala.numeroAlzate + " | Sviluppo: " + scala.sviluppo.toFixed(1) + " cm | Rapporto: " + scala.rapporto;
    option.value = index
    stairSelect.add(option);
});

stairSelect.onchange = function (event) {
    let scala = dati[stairSelect.selectedIndex];

    let alzata = scala.alzata;
    let pedata = scala.pedata;
    let numeroAlzate = scala.numeroAlzate;
    let rapporto = scala.rapporto;
    let sviluppo = scala.sviluppo;
    let dislivello = scala.dislivello;

    drawStairFront(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
    drawStairTop(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
}

let larghezzaScala = 80;
let alzata = 17.0;
let pedata = 29.0;
let numeroAlzate = 5;
let rapporto = 63;
let sviluppo = 116.0;
let dislivello = 85.0;
let avanzamentoPedata = 2;
let spessoreAlzata = 1;
let spessorePedata = 3;

drawStairFront(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
drawStairTop(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);

// -------------------- TOP -------------------------------------
function drawStairTop(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala) {
    // Disegna scala
    let drawTop = SVG('#drawing_top').size('100%', '100%');
    //draw.size();
    drawTop.viewbox(0, 0, 550, 200);
    drawTop.clear();

    let drawPaddingX = 10;
    let drawPaddingY = 10;

    // Area totale occupazione
    drawTop
        .rect(sviluppo + avanzamentoPedata + spessoreAlzata, larghezzaScala)
        .attr({ fill: '#dddddd', stroke: '#666666', 'stroke-width': 0, 'fill-opacity': 1 })
        .move(drawPaddingX, drawPaddingY)
        .back();

    // Linee orizzontali sopra e sotto area occupazione
    drawTop
        .line(0, 0, sviluppo + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY)
        .stroke({ color: '#666666', width: 0.5 });
    drawTop
        .line(0, 0, sviluppo + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY + larghezzaScala)
        .stroke({ color: '#666666', width: 0.5 });

    for (let c = 0; c < numeroAlzate; c++) {
        // Linea sx pedata
        drawTop
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5 });

        // Linea dx pedata
        drawTop
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c + avanzamentoPedata + spessoreAlzata, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5, dasharray: '3,3' });

        // Linea sx alzata
        drawTop
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c + avanzamentoPedata, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5, dasharray: '3,3' });

        // Freccia salita scala
    }
}

function drawStairFront(alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala) {
    // -------------------- FRONT -------------------------------------

    let drawFront = SVG('#drawing_front').size('100%', '100%');
    //draw.size();
    drawFront.viewbox(0, 0, 550, 100);

    drawFront.clear();

    let drawPaddingX = 10;
    let drawPaddingY = 10;

    for (let c = 0; c < numeroAlzate; c++) {
        // Linea sx alzata
        drawFront
            .line(0, 0, 0, alzata - spessorePedata)
            .move(drawPaddingX + pedata * c, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5 });
    }
}
