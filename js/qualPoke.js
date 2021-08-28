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
  pokemonSorteado = sortearPokemon()

  jogo.innerHTML = `
    <div class="pokemon">
      <img src="${pokemonSorteado.sprites.large}" alt="" class="qual"/>
    </div>
  `
  //  Mostrar uma "cobertura" sobre o pokemon (sem dar tempo de ver o pokemon)
  //  Mostrar timer
  //  Iniciar o timer
  //  Mostrar contagem de tentativas
  //  Criar o campo "Dica", mas deixar em branco
  //  Mostrar o campo para tentar adivinhar
}

function sortearPokemon () {
  const numero = Math.floor(Math.random() * 150) + 1
  return listaPokemon.find(poke => poke.national_number == numero && poke.evolution === null)
}

// FUNÇÕES DE MENU
function menuInicial () {
  menu.innerHTML = `
    <button onclick="voltar()">Voltar</button>
    <button onclick="iniciarJogo()">Iniciar jogo</button>
  `
}
function menuIngame () {
  menu.innerHTML = `
    <button onclick="desistir()">Desistir</button>
  `
}
function menuGameover () {
  menu.innerHTML = `
    <button onclick="iniciarJogo()">Reiniciar</button>
  `
}