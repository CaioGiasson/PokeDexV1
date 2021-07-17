// Regras do jogo
var minimoPares = 4
var maximoPares = 16
var quantidadePares = 0
var indiceMaximoPokemon = 183

// A função "startGame", ao ser executada, vai pegar o valor digitado no campo "gameSetup"
// a seguir vai sortear uma quantidade de pokemons correpondente a esse valor
// Exemplo: Se o usuário colocar o valor 8 então o jogo vai sortear e mostrar 8 pares
function startGame () {

  const campoNumerico = document.getElementById(`quantPares`)
  const n = campoNumerico.value

  if (n < minimoPares || n > maximoPares)
    return alert(`Essa quantidade de pares nao é válida`)

  document.getElementById(`gameSetup`).remove()

  quantidadePares = n

  pokemonSorteados = sortearPares()
  pokemonSorteados = embaralhar(pokemonSorteados)

  let tabuleiro = document.getElementById(`tabuleiro`)
  for (poke of pokemonSorteados) {
    let pokecard = obterCard(poke)
    tabuleiro.innerHTML += pokecard
  }

}

function embaralhar (array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function obterCard (pokemon) {
  return `<div class="card">
            <img src="${pokemon.sprites.large}"/>
            <span class="back" onclick="virar(this)"></span>
          </div>`
}

function sortearPares () {
  let listaSorteados = []

  let i = 1
  while (i <= quantidadePares) {
    let pokemonSorteado = sortearPokemon()

    // se o pokemon já foi sorteado então sortear novamente
    if (!listaSorteados.includes(pokemonSorteado)) {
      listaSorteados.push(pokemonSorteado)
      listaSorteados.push(pokemonSorteado)
      i = i + 1
    }

  }

  return listaSorteados
}

function sortearPokemon () {
  const indiceSorteado = parseInt(Math.random() * indiceMaximoPokemon)
  return listaPokemon[indiceSorteado]
}

function virar (fundo) {
  fundo.classList.toggle('hidden')
}

/*
OK      SORTEAR N POKEMON
OK      CRIAR OS CARTÕESZINHOS DOS
OK      OS PARES ESTÃO VINDO JUNTINHOS JÁ
OK      DE VEZ EM QUANDO VEM PAR REPETIDO (O MESMO POKEMON TEM MAIS DE UM PAR)
      OS PARES ESTÃO APARECENDO VIRADOS
*/
