var pokemonSorteado = null

var jogo = document.getElementById(`jogo`)
var menu = document.getElementById(`menu`)


function voltar () {
  document.location = `index.html`
}

function iniciarJogo () {
  menuIngame()

  // Iniciar um novo jogo
  // OK    Sortear um pokemon
  // OK    Mostrar o pokemon sorteado
  // OK    Mostrar uma "cobertura" sobre o pokemon (sem dar tempo de ver o pokemon)
  // OK    Fazer a posição da cobertura ser aleatória
  // OK    Mostrar timer
  // OK    Iniciar o timer
  // OK    Atualizar o timer
  // OK    Mostrar contagem de tentativas
  // OK    Criar o campo "Dica", mas deixar em branco
  // OK     Alterado para Botão Dica, que muda a posição da "janelinha de visão"
  // OK    Campo para digitar o nome do pokemon
  pokemonSorteado = sortearPokemon()

  jogo.innerHTML = `
    <div class="pokemon">
      <img src="${pokemonSorteado.sprites.large}" alt="" class="qual"/>
      <div class="cobertura"></div>
    </div>
    <div class="timer">00:00</div>
    <div class="tentativas">Tentativas: 0</div>
    <input type="text" name="nomePokemon" class="nomePokemon" />
    <p>Qual é o meu nome? Digite e aperte ENTER</p>
  `

  var campoNomePokemon = document.getElementsByClassName("nomePokemon")[0]
  campoNomePokemon.focus()

  trocarPosicaoCobertura()
  iniciarTimer()
}

function iniciarTimer () {
  window.time = 0
  window.timerId = setInterval(function () {
    window.time++
    atualizarTimer()
  }, 1000)
}

function atualizarTimer () {
  var timer = document.getElementsByClassName("timer")[0]

  const
    tempo = new Date(window.time * 1000),
    minutos = tempo.getMinutes(),
    segundos = tempo.getSeconds()

  // const
  //   minutos = Math.floor(window.time / 60),
  //   segundos = window.time % 60

  timer.innerHTML = `${lz(minutos)}:${lz(segundos)}`
}

function lz (number) {
  if (number < 10) return "0" + number
  return number
}

function trocarPosicaoCobertura () {
  var cobertura = document.getElementsByClassName("cobertura")[0]
  const
    posicaoTop = Math.floor(Math.random() * 100) + 300,
    posicaoLeft = Math.floor(Math.random() * 100) + 300

  cobertura.style.left = `-${posicaoLeft}px`
  cobertura.style.top = `-${posicaoTop}px`
}

function sortearPokemon () {
  const numero = Math.floor(Math.random() * 150) + 1
  return listaPokemon.find(poke => poke.national_number == numero && poke.evolution === null)
}

// FUNÇÕES DE MENU
function menuInicial () {
  menu.innerHTML = `
    <button class="button" onclick="voltar()">Voltar</button>
    <button class="button" onclick="iniciarJogo()">Iniciar jogo</button>
  `
}
function menuIngame () {
  menu.innerHTML = `
    <button class="button" onclick="desistir()">Desistir</button>
    <span class="dica button" onclick="trocarPosicaoCobertura()">Dica</span>
  `
}
function menuGameover () {
  menu.innerHTML = `
    <button class="button" onclick="iniciarJogo()">Reiniciar</button>
  `
}