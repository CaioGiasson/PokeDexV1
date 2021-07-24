// Regras do jogo
var minimoPares = 4
var maximoPares = 16
var quantidadePares = 0
var indiceMaximoPokemon = 183
window.animando = false

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

  return `<div class="card smooth-fast" onclick="interagir(this)" data-number="${pokemon.national_number}">
            <img src="${pokemon.sprites.large}" alt="${pokemon.name}"/>
            <span class="back"><img class="girando" src="/img/pokebola.png" alt="Fundo da carta com uma pokebola"/></span>
          </div>`
}

function sortearPares () {
  let listaSorteados = []

  let i = 1
  while (i <= quantidadePares) {
    let pokemonSorteado = sortearPokemon()

    // se o pokemon já foi sorteado então sortear novamente
    if (!listaSorteados.includes(pokemonSorteado) || pokemonSorteado.evolution == null) {
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

function interagir (carta) {
  if (window.animando) return

  window.animando = true

  // 0 - Se clicou em uma carta já revelada, não faz nada
  if (carta.classList.contains(`revelada`)) {
    window.animando = false
    return;
  }

  // 1 - Se não tiver nenhuma carta virada, simplesmente vira a carta clicada
  if (document.getElementsByClassName(`virada`).length == 0) {
    virar(carta)
    setTimeout(function () { window.animando = false }, 300)
    return;
  }

  // 2 - Se já houver 1 carta virada e clicou na mesma carta, não faz nada
  if (document.getElementsByClassName(`virada`).length == 1 && carta.classList.contains(`virada`)) {
    window.animando = false
    return;
  }

  // 3 - Se já houver 1 carta e clicou em uma carta desvirada, vira a carta clicada e analisa se formam um par
  if (document.getElementsByClassName(`virada`).length == 1 && !carta.classList.contains(`virada`)) {
    virar(carta)
    setTimeout(function () {
      analisarPar()
    }, 1000)
    return;
  }

  if (carta.classList.contains(`virada`)) {
    desvirar(carta)
    setTimeout(function () { window.animando = false }, 300)
  } else {
    virar(carta)
    setTimeout(function () { window.animando = false }, 300)
  }

}

function analisarPar () {
  let carta1 = document.getElementsByClassName(`virada`)[0]
  let carta2 = document.getElementsByClassName(`virada`)[1]

  // 3.1 - Se as cartas viradas formarem um par, então adiciona a classe "revelada" e remove a classe "virada" 
  if (carta1.dataset.number == carta2.dataset.number) {
    carta1.classList.add(`revelada`)
    carta2.classList.add(`revelada`)
    carta1.classList.remove(`virada`)
    carta2.classList.remove(`virada`)
  } else {
    // 3.2 - Se não formarem um par, então desvira ambas
    desvirar(carta1)
    desvirar(carta2)

    setTimeout(function () { window.animando = false }, 300)
  }
}

function virar (carta) {
  carta.classList.add(`virando`)
  setTimeout(function () { carta.classList.add(`virada`) }, 300)
  setTimeout(function () { carta.classList.remove(`virando`) }, 400)
}

function desvirar (carta) {
  carta.classList.add(`virando`)
  setTimeout(function () { carta.classList.remove(`virada`) }, 300)
  setTimeout(function () { carta.classList.remove(`virando`) }, 400)
}


/*
  PENDÊNCIAS:
  - GAME OVER e "Gostaria de recomeçar?" ao encontrar todos os pares
  - Contar quanto tempo a pessoa levou pra resolver
  - Resolver o bug dos clicks múltiplos
*/