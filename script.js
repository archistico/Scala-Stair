import { getDati } from './scala.js';

// TODO: correggere calcolo sviluppo con avanzamenti
// TODO: mettere scritte quote, freccia scala top
// TODO: calcolo delle superfici per alzate e pedate
// TODO: attenzione che avanzamento cambia la scala nel calcolo

let stairSelect = document.getElementById('stairSelect');

let dislivelloInput = document.getElementById('dislivelloInput');
dislivelloInput.onchange = () => {
    console.log("cambio dislivello " + dislivelloInput.value);
};

let dati = getDati();

// Collegamento con SVG
let drawTop = SVG('#drawing_top').size('100%', '100%');
drawTop.viewbox(0, 0, 550, 200);
drawTop.clear();

let drawFront = SVG('#drawing_front').size('100%', '100%').scale('1', '-1');
drawFront.viewbox(0, 0, 550, 200);
drawFront.clear();

getDati().forEach((scala, index) => {
    let option = document.createElement("option");
    option.text = "Dislivello: " + scala.dislivello.toFixed(1) + " cm | Alzata: " + scala.alzata.toFixed(1) + " cm | Pedata: " + scala.pedata.toFixed(1) + " cm | Numero alzate: " + scala.numeroAlzate;
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

    drawStairFront(drawFront, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
    drawStairTop(drawTop, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
}

let larghezzaScala = 100;
let alzata = 17.0;
let pedata = 29.0;
let numeroAlzate = 5;
let rapporto = 63;
let sviluppo = 116.0;
let dislivello = 85.0;
let avanzamentoPedata = 2;
let spessoreAlzata = 2;
let spessorePedata = 4;

drawStairFront(drawFront, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);
drawStairTop(drawTop, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala);

// -------------------- TOP -------------------------------------
function drawStairTop(draw, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala) {

    draw.clear();

    let drawPaddingX = 10;
    let drawPaddingY = 3;

    draw.viewbox(0, 0, drawPaddingX * 2 + sviluppo, drawPaddingY * 2 + larghezzaScala)

    // Area totale occupazione
    draw
        .rect(sviluppo + avanzamentoPedata + spessoreAlzata, larghezzaScala)
        .attr({ fill: '#dddddd', stroke: '#666666', 'stroke-width': 0, 'fill-opacity': 1 })
        .move(drawPaddingX, drawPaddingY)
        .back();

    // Linee orizzontali sopra e sotto area occupazione
    draw
        .line(0, 0, sviluppo + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY)
        .stroke({ color: '#666666', width: 0.5 });
    draw
        .line(0, 0, sviluppo + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY + larghezzaScala)
        .stroke({ color: '#666666', width: 0.5 });

    for (let c = 0; c < numeroAlzate; c++) {
        // Linea sx pedata
        draw
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5 });

        // Linea dx pedata
        draw
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c + avanzamentoPedata + spessoreAlzata, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5, dasharray: '3,3' });

        // Linea sx alzata
        draw
            .line(0, 0, 0, larghezzaScala)
            .move(drawPaddingX + pedata * c + avanzamentoPedata, drawPaddingY)
            .stroke({ color: '#666666', width: 0.5, dasharray: '3,3' });

        // Freccia salita scala

        // Scritte
    }
}

// -------------------- FRONT -------------------------------------
function drawStairFront(draw, alzata, pedata, numeroAlzate, rapporto, sviluppo, dislivello, avanzamentoPedata, spessoreAlzata, spessorePedata, larghezzaScala) {

    draw.clear();

    let drawPaddingX = 10;
    let drawPaddingY = 3;

    draw.viewbox(0, 0, drawPaddingX * 2 + sviluppo, drawPaddingY * 2 + dislivello)

    for (let c = 0; c < numeroAlzate; c++) {
        // Alzata
        draw
            .rect(spessoreAlzata, alzata - spessorePedata)
            .move(drawPaddingX + avanzamentoPedata + pedata * c, drawPaddingY + alzata * c)
            .attr({ fill: '#dddddd', stroke: '#666666', 'stroke-width': 0.5, 'fill-opacity': 0.5 });

        // Se ultima pedata
        if (c == numeroAlzate - 1) {
            draw
                .rect(avanzamentoPedata + spessoreAlzata, spessorePedata)
                .move(drawPaddingX + pedata * c, drawPaddingY + alzata * (c + 1) - spessorePedata)
                .attr({ fill: '#dddddd', stroke: '#666666', 'stroke-width': 0.5, 'fill-opacity': 0.5 });
        } else {
            // Pedata
            draw
                .rect(pedata + avanzamentoPedata + spessoreAlzata, spessorePedata)
                .move(drawPaddingX + pedata * c, drawPaddingY + alzata * (c + 1) - spessorePedata)
                .attr({ fill: '#dddddd', stroke: '#666666', 'stroke-width': 0.5, 'fill-opacity': 0.5 });
        }
    }

    // Linee dislivello alta
    draw
        .line(0, 0, pedata * (numeroAlzate - 1) + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY + dislivello)
        .stroke({ color: '#FF0000', width: 0.2, dasharray: '1,1' });

    // Linee dislivello bassa
    draw
        .line(0, 0, pedata * (numeroAlzate - 1) + avanzamentoPedata + spessoreAlzata, 0)
        .move(drawPaddingX, drawPaddingY)
        .stroke({ color: '#FF0000', width: 0.2, dasharray: '1,1' });



    // Scritte
}

let downloadProspettoButton = document.getElementById('downloadProspettoButton');
let downloadPiantaButton = document.getElementById('downloadPiantaButton');

downloadProspettoButton.onclick = () => {
    downloadSVG("drawing_front", "scala-prospetto.svg");
};

downloadPiantaButton.onclick = () => {
    downloadSVG("drawing_top", "scala-pianta.svg");
};

function downloadSVG(idelement, filename) {
    const svg = document.getElementById(idelement).outerHTML;
    const blob = new Blob([svg.toString()]);

    const element = document.createElement("a");
    element.download = filename;
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}