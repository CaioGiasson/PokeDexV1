// Regras do jogo
var minimoPares = 1
var maximoPares = 16
var quantidadePares = 0
var indiceMaximoPokemon = 183
var animando = false
var iniciouPartida = false

// A função "startGame", ao ser executada, vai pegar o valor digitado no campo "gameSetup"
// a seguir vai sortear uma quantidade de pokemons correpondente a esse valor
// Exemplo: Se o usuário colocar o valor 8 então o jogo vai sortear e mostrar 8 pares
function startGame () {

  const campoNumerico = document.getElementById(`quantPares`)
  const n = campoNumerico.value

  if (n < minimoPares || n > maximoPares)
    return alert(`Essa quantidade de pares nao é válida`)

  document.getElementById(`gameSetup`).innerHTML = ``

  quantidadePares = n

  embaralharPares()
}

function embaralharPares () {
  atualizarBarrinhaPorcentagem(0)

  window.iniciouPartida = false
  window.tempo = 0
  atualizarTimer()

  pokemonSorteados = sortearPares()
  pokemonSorteados = embaralhar(pokemonSorteados)

  let tabuleiro = document.getElementById(`tabuleiro`)
  tabuleiro.innerHTML = ``
  for (poke of pokemonSorteados) {
    let pokecard = obterCard(poke)
    tabuleiro.innerHTML += pokecard
  }
}

function selecionarPares () {
  atualizarBarrinhaPorcentagem(0)
  document.getElementById(`gameSetup`).innerHTML = `    
    <p>Quantidade de pares</p>
    <input type="number" name="quantPares" id="quantPares" /> 
    <button onclick="startGame()">Iniciar</button>`
  document.getElementById(`tabuleiro`).innerHTML = ``
}

function iniciarTimer () {
  window.tempo = 0
  atualizarTimer()

  window.temporizador = setInterval(function () {
    window.tempo++
    atualizarTimer()
    atualizarBarrinha()
  }, 1000)
}

function atualizarBarrinha () {
  const
    quantosParesEncontrados = document.getElementsByClassName(`revelada`).length,
    porcentagemParesEncontrados = quantosParesEncontrados / (quantidadePares * 2),
    porcentagemLegivel = 100 * porcentagemParesEncontrados

  atualizarBarrinhaPorcentagem(porcentagemLegivel)
}

function atualizarBarrinhaPorcentagem (valor) {
  let
    barrinhasPreenchidas = document.getElementsByClassName(`preenchida`),
    elementosValorPorcentagem = document.getElementsByClassName(`valor`)

  if (barrinhasPreenchidas.length !== 1) return

  let
    barrinhaPreenchida = barrinhasPreenchidas[0],
    elementoValorPorcentagem = elementosValorPorcentagem[0],

    // MÉTODO 1: Lendo os dados do HTML
    // paresEncontrados = document.getElementsByClassName(`revelada`).length / 2,
    // textoPares = paresEncontrados == 1 ? ` par encontrado` : ` pares encontrados`

    // MÉTODO 2: Calculando pela porcentagem
    paresEncontrados = Math.round(valor * quantidadePares / 100),
    textoPares = paresEncontrados == 1 ? ` par encontrado` : ` pares encontrados`

  barrinhaPreenchida.style.width = valor.toFixed(1) + "%"
  elementoValorPorcentagem.innerHTML = paresEncontrados + textoPares
}

function atualizarTimer () {
  let timer = document.getElementById(`timer`)
  timer.innerHTML = `<h4>Tempo decorrido: ${window.tempo}</h4>`
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
            <span class="back"><img class="girando" src="img/pokebola.png" alt="Fundo da carta com uma pokebola"/></span>
          </div>`
}

function sortearPares () {
  let listaSorteados = []

  let i = 1
  while (i <= quantidadePares) {
    let pokemonSorteado = sortearPokemon()

    // se o pokemon já foi sorteado então sortear novamente
    if (!listaSorteados.includes(pokemonSorteado) && pokemonSorteado.evolution == null) {
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

  // Debouncing da animação, pra evitar bugs se o usuário sair clicando alopradamente
  if (animando) return
  animando = true

  // Inicia o timer somente quando o usuário interagir com a primeira carta
  if (!iniciouPartida) {
    window.iniciouPartida = true
    iniciarTimer()
  }

  // 0 - Se clicou em uma carta já revelada, não faz nada
  if (carta.classList.contains(`revelada`)) {
    animando = false
    return;
  }

  // 1 - Se não tiver nenhuma carta virada, simplesmente vira a carta clicada
  if (document.getElementsByClassName(`virada`).length == 0) {
    virar(carta)
    liberarAnimacoes()
    return;
  }

  // 2 - Se já houver 1 carta virada e clicou na mesma carta, não faz nada
  if (document.getElementsByClassName(`virada`).length == 1 && carta.classList.contains(`virada`)) {
    animando = false
    return;
  }

  // 3 - Se já houver 1 carta e clicou em uma carta desvirada, vira a carta clicada e analisa se formam um par
  if (document.getElementsByClassName(`virada`).length == 1 && !carta.classList.contains(`virada`)) {
    virar(carta)
    setTimeout(analisarPar, 1000)
    return;
  }

  if (carta.classList.contains(`virada`)) {
    desvirar(carta)
    liberarAnimacoes()
  } else {
    virar(carta)
    liberarAnimacoes()
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

    checkGameOver()
  } else {
    // 3.2 - Se não formarem um par, então desvira ambas
    desvirar(carta1)
    desvirar(carta2)
  }

  liberarAnimacoes()
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

function liberarAnimacoes () {
  setTimeout(function () { animando = false }, 350)
}

function isGameOver () {
  const
    quantReveladas = document.getElementsByClassName(`revelada`).length,
    quantTotal = document.getElementsByClassName(`card`).length

  return quantTotal == quantReveladas
}

function checkGameOver () {

  if (isGameOver()) {

    atualizarBarrinhaPorcentagem(100)

    const
      tempoDecorrido = window.tempo,
      unidade = tempoDecorrido > 1 ? `segundos` : `segundo`,

      recorde = lerRecorde(),
      isNewRecord = recorde == 0 || tempoDecorrido < recorde,
      recordClass = isNewRecord ? `new-record` : `not-record`,

      recordMessage = isNewRecord
        ? `NOVO RECORDE EM ${quantidadePares} PARES: ${tempoDecorrido} ${unidade}`
        : `Vc terminou em ${tempoDecorrido} ${unidade}, mas o recorde em ${quantidadePares} pares é ${recorde}`,

      newGameButton = `<span class="new-game-button" onclick="embaralharPares()">Jogar novamente com ${quantidadePares} pares</span>`,

      choosePairsButton = `<span class="new-game-button" onclick="selecionarPares()">Selecionar quantidade de pares</span>`


    if (isNewRecord) {
      salvarRecorde(tempoDecorrido)
    }

    let tabuleiro = document.getElementById(`tabuleiro`)
    tabuleiro.innerHTML = `<h3 class="${recordClass}">${recordMessage}</h3> ${newGameButton} ${choosePairsButton}`

    clearInterval(window.temporizador)
  }

}

function lerRecorde () {
  const recorde = localStorage.getItem(`recorde-${quantidadePares}`)
  return recorde == null ? 0 : recorde
}

function salvarRecorde (tempo) {
  localStorage.setItem(`recorde-${quantidadePares}`, tempo)
}

/*
  DESAFIOS:
OK  - Colocar botão de "Jogar novamente" (mesma quantidade de pares)
OK  - Colocar botão de "Outra quantidade de pares"
OK  - Arrumar a barra de progresso para mostrar visualmente quantos pares já foram encontrados
OK  - Colocar um "contador de progresso" pra mostrar quantos pares o usuário já achou
OK  - Corrigir mensagem "1 pares" para "1 par" ou "2 pares"
  - Melhorar o CSS (ou talvez o HTML mesmo) das mensagens, pra ficar mais bonitinho
*/