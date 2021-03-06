let rapportoBlondel = 63;
let rapportoBlondelMinimo = 62;
let rapportoBlondelMassimo = 64;
let alzataMinima = 15.5;
let alzataMassima = 18.55;
let pedataMinima = 26.5;
let pedataMassima = 30;
let numeroMassimoAlzate = 20;

function Arrotonda(num) {
    return Math.round(num*100)/100;    
}

class Scala {
    constructor(alzata, pedata, numeroAlzate) {
        this.alzata = Arrotonda(alzata);
        this.pedata = Arrotonda(pedata);
        this.numeroAlzate = Arrotonda(numeroAlzate);
        this.rapporto = this.getRapporto();
        this.sviluppo = this.getSviluppo();
        this.dislivello = this.getDislivello();
    }

    getRapporto() {
        return Arrotonda(2*this.alzata + this.pedata);
    }
    
    getSviluppo() {
        return Arrotonda((this.numeroAlzate-1) * this.pedata);
    }

    getDislivello() {
        return Arrotonda(this.numeroAlzate * this.alzata);
    }

    static calcolaPedata(alzata, rapporto) {
        let tPedata = Arrotonda(rapporto - 2*alzata);
        if(tPedata < pedataMinima) {
            tPedata = Arrotonda(rapportoBlondelMassimo - 2*alzata);
        } 
        if(tPedata > pedataMassima) {
            tPedata = Arrotonda(rapportoBlondelMinimo - 2*alzata);
        }
        return tPedata;
    }
}

let listaScale = [];

for(let tAlzata=alzataMinima; tAlzata<=alzataMassima; tAlzata += 0.05) {
    for(let tNumeroAlzate=1; tNumeroAlzate<=numeroMassimoAlzate; tNumeroAlzate++) {
        let scala = new Scala(tAlzata,Scala.calcolaPedata(tAlzata, rapportoBlondel),tNumeroAlzate);
        listaScale.push(scala);
    }
}

// Ordina in base al dislivello

function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || 
       !b.hasOwnProperty(key)) {
  	  return 0; 
    }
    
    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];
      
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? 
      (comparison * -1) : comparison
    );
  };
}

let listaOrdinata = listaScale.sort(compareValues('dislivello', 'asc'));

export function getDati() {
    return listaOrdinata;
}
