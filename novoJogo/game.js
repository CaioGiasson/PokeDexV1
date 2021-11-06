// SELECIONANDO UM PERSONAGEM
function selecionar (element) {
  // DES-selecionando o selecionado atual
  var selecionado = document.getElementsByClassName("selecionado")[0]
  if (selecionado) {
    selecionado.classList.remove("selecionado")
  }

  // SELECIONANDO O NOVO PERSONAGEM
  element.classList.add("selecionado")

  // ATUALIZANDO A POSIÇÃO DO PERSONAGEM
  clickX = element.style.left - largura / 2
  clickY = element.style.top - altura / 2

}


// ALEATORIZANDO A POSIÇÃO DE UM PERSONAGEM ESPECÍFICO
function posicionar (personagem) {
  var px = 100 + Math.random() * 500
  var py = 100 + Math.random() * 500
  personagem.style.left = px + 'px'
  personagem.style.top = py + 'px'
}

// COLETANDO A LISTA DE PERSONAGENS DA TELA E ALEATORIZANDO A POSIÇÃO DE CADA UM
var todosPersonagens = document.getElementsByClassName('personagem')
for (personagem of todosPersonagens) {
  posicionar(personagem)
}

var personagemSelecionado = todosPersonagens[0]
selecionar(personagemSelecionado)
var posX, posY
var largura = 50
var altura = 50
var clickX = posX
var clickY = posY
var velocidade = 5

personagemSelecionado.style.width = largura + "px"
personagemSelecionado.style.height = altura + "px"

setInterval(function () {
  personagemSelecionado = document.getElementsByClassName("selecionado")[0]
  posX = parseInt(personagemSelecionado.style.left)
  posY = parseInt(personagemSelecionado.style.top)

  var deltaX = clickX - posX
  var deltaY = clickY - posY

  var distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  if (distancia < velocidade) return

  var angulo = Math.atan2(deltaY, deltaX)
  posX += velocidade * Math.cos(angulo)
  posY += velocidade * Math.sin(angulo)

  personagemSelecionado.style.left = posX + "px"
  personagemSelecionado.style.top = posY + "px"
}, 20)

function capturarPosicaoMouse (event) {
  var clicouEmPersonagem = event.target.classList.contains("personagem")

  if (!clicouEmPersonagem) {
    clickX = event.clientX - largura / 2
    clickY = event.clientY - altura / 2
  }
}
document.addEventListener("mousedown", capturarPosicaoMouse)


