class AbrigoAnimais {

  animais = {
    Rex: {tipo:"cão", brinquedos:["RATO", "BOLA"]},
    Mimi: {tipo:"gato", brinquedos:["BOLA", "LASER"]},
    Fofo: {tipo:"gato", brinquedos:["BOLA", "RATO", "LASER"]},
    Zero: {tipo: "gato", brinquedos:["RATO", "BOLA"]},
    Bola: {tipo:"cão", brinquedos:["CAIXA", "NOVELO"]},
    Bebe: {tipo:"cão", brinquedos:["LASER", "RATO", "BOLA"]},
    Loco: {tipo:"jabuti", brinquedos:["SKATE", "RATO"]}
  };
  
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
 
    let pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
    let pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
    let ordem = ordemAnimais.split(",").map(a => a.trim());

    // return {pessoa1, pessoa2, ordem};
    const nomesVistos = new Set();

    for(let nome  of ordem) {
      if(!this.animais[nome] || nomesVistos.has(nome)){
        return "Animal inválido";
      }
      nomesVistos.add(nome);
    }

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return "Brinquedo inválido";
    }

    const brinquedosValidos = new Set;
    for(let nome in this.animais){
      const brinquedosDoAnimal = this.animais[nome].brinquedos;
      brinquedosDoAnimal.forEach(b => brinquedosValidos.add(b));
    }

    const adotados1 = [];
    const adotados2 = [];
    const resultado = [];

    function temBrinquedosNaOrdem(pessoaBrinquedos, favoritos) {
      let i = 0;
      for (let brinquedo of pessoaBrinquedos) {
        if (brinquedo === favoritos[i]) i++;
        if (i === favoritos.length) return true;
      }
      return false;
    }

    for (let nome of ordem) {
      const animal = this.animais[nome];
      const favoritos = animal.brinquedos;
      const tipo = animal.tipo;

      const p1ok = temBrinquedosNaOrdem(pessoa1, favoritos);
      const p2ok = temBrinquedosNaOrdem(pessoa2, favoritos);
        let destino = "abrigo";

      if (nome === "Loco") {
        if (p1ok && adotados1.length > 0 && adotados1.length < 3) {
          destino = "pessoa 1";
          adotados1.push(nome);
        } else if (p2ok && adotados2.length > 0 && adotados2.length < 3) {
          destino = "pessoa 2";
          adotados2.push(nome);
        }
      } else if (p1ok && !p2ok && adotados1.length < 3) {
        destino = "pessoa 1";
        adotados1.push(nome);
      } else if (!p1ok && p2ok && adotados2.length < 3) {
        destino = "pessoa 2";
        adotados2.push(nome);
      } else if (p1ok && p2ok) {
        destino = "abrigo";
      }

      resultado.push(`${nome} - ${destino}`);
    }

    return resultado.sort();
  }
}

const AbrigoA = new AbrigoAnimais;
export { AbrigoAnimais as AbrigoAnimais };

let pessoaN1 = "Bruno, Rato, Bola";
let pessoaN2 = "Ana, Bola, Laser";
let animalCon = "Mimi, Rex";
console.log(AbrigoA.encontraPessoas(pessoaN1, pessoaN2, animalCon));


