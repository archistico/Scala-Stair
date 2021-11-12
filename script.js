function formula_blondel(alzata, pedata) {
    let min = 62;
    let max = 64;
    let rapporto = 2 * alzata + pedata;
    return (rapporto >= min && rapporto <= max)? true : false;
}

function controllo_dimensioni(alzata, pedata, sporgenza) {
    let pedata_min = 25;
    let alzata_min = 15;
    let alzata_max = 20;
    let sporgenza_min = 0;
    let sporgenza_max = 2.5;

    return (pedata >= pedata_min && alzata >= alzata_min && alzata <= alzata_max && sporgenza >= sporgenza_min && sporgenza <= sporgenza_max)? true : false;
}

let altezza_interpiano = 300;
let spessore_solaio = 40;
let dislivello = altezza_interpiano + spessore_solaio;
let spessore_finito_rampa = 15; // r
let spessore_finito_pianerottolo = 30; // S

let alzata = 16.6;
let pedata = 30;
let rapportoAP = alzata/pedata; // uguale a tg gamma
let angolo_radianti = Math.atan(rapportoAP);
let angolo_gradi = angolo_radianti * 180 / Math.PI;
let cos_gamma = Math.cos(angolo_radianti);

// verifico che spessore_finito_pianerottolo S <= a + r / cos_gamma
let verifica = (spessore_finito_pianerottolo <= (alzata + spessore_finito_rampa / cos_gamma)) ? true : false;

let d = spessore_finito_pianerottolo - spessore_finito_rampa/cos_gamma;
let l1 = d / rapportoAP;
let l2 = pedata - l1;

let sporgenza_gradino = 2.5;
let numero_alzate = 6;
let numero_pedate = numero_alzate-1;
let scala_larghezza = 90;


let draw = SVG('svg');
draw.size(800, 700);

for(c=0; c<numero_pedate; c++) {
    let rect = draw.rect(pedata, scala_larghezza).attr({ fill: '#dddddd', stroke: '#000','stroke-width': 1 }).move(20+pedata*c,20);
    let line = draw.line(0, 0, 0, scala_larghezza).move(20+sporgenza_gradino+pedata*c,20)
    line.stroke({ color: '#666666', width: 1, linecap: 'round', dasharray: '3,3' })
}

console.log("Formula di Blondel: "+formula_blondel(17,30));
console.log("Verifica dimensionale: "+controllo_dimensioni(17,30,2.5));