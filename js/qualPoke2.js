var pokemonSorteado = null
var tentativas = 0
var time = 0
var jogoAcabou = false

var jogo = document.getElementById(`jogo`)
var menu = document.getElementById(`menu`)

setInterval(function () {
  if (!jogoAcabou) {
    time++
    atualizarTimer()
  }
}, 1000)

function voltar () {
  document.location = `index.html`
}

function iniciarJogo () {
  menuIngame()
  jogoAcabou = false
  time = 0

  pokemonSorteado = sortearPokemon()

  jogo.innerHTML = `
  <div class="pokemon">
      <img src="https://static.quizur.com/i/b/57c1c26fc0b812.5998420157c1c26fb156c9.51498011.png" class="fundo" />
      <img src="${pokemonSorteado.sprites.normal}" alt="" class="sombra"/>
      <img src="${pokemonSorteado.sprites.normal}" alt="" class="qual oculto"/>
    </div>
    <div class="timer">00:00</div>
    <div class="tentativas">Tentativas: 0</div>
    <input type="text" name="nomePokemon" class="nomePokemon"/>
    <p>Qual é o meu nome? Digite e aperte ENTER</p>
    <p class="result"></p>
  `

  var campoNomePokemon = document.getElementsByClassName("nomePokemon")[0]
  campoNomePokemon.focus()
  campoNomePokemon.addEventListener("keyup", tentativa)

  trocarPosicaoCobertura()
}

function revelar () {
  var qual = document.getElementsByClassName("qual")[0]
  qual.classList.add("animada")
  qual.classList.remove("oculto")
}

function tentativa (e) {
  if (jogoAcabou || e.keyCode != 13) return

  contarTentativa()

  const pokemonDigitado = e.target.value
  const nome1 = pokemonDigitado.toLowerCase()
  const nome2 = pokemonSorteado.name.toLowerCase()

  if (nome1 == nome2) gameOver()
  else errou()
}

function contarTentativa () {
  tentativas++

  var divTentativas = document.getElementsByClassName("tentativas")[0]
  divTentativas.innerHTML = `Tentativas: ${tentativas}`
}

function gameOver () {
  var pResult = document.getElementsByClassName("result")[0]
  pResult.innerHTML = "ACERTOU MIZERAVI"
  pResult.classList.remove("errado")
  pResult.classList.add("certo")

  jogoAcabou = true
  menuGameover()
  revelar()
}
function errou () {
  var pResult = document.getElementsByClassName("result")[0]
  pResult.innerHTML = "ERROUUUUUUU"
  pResult.classList.remove("certo")
  pResult.classList.add("errado")
}

function atualizarTimer () {
  var listaDivTimer = document.getElementsByClassName("timer")
  if (listaDivTimer.length == 0) return
  var divTimer = listaDivTimer[0]

  const
    tempo = new Date(time * 1000),
    minutos = tempo.getMinutes(),
    segundos = tempo.getSeconds()

  // const
  //   minutos = Math.floor(time / 60),
  //   segundos = time % 60

  divTimer.innerHTML = `${lz(minutos)}:${lz(segundos)}`
}

function desistir () {
  revelar()
  menuGameover()
  jogoAcabou = true
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