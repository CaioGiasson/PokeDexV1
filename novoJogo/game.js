var personagem = document.getElementById("personagem")
var posX = 100
var posY = 100
var largura = 50
var altura = 50
var clickX = posX
var clickY = posY
var velocidade = 5

console.log("Antes: " + document.getElementById("personagem").style.top)

personagem.style.left = posX + "px"
personagem.style.top = posY + "px"
personagem.style.width = largura + "px"
personagem.style.height = altura + "px"

console.log("Depois: " + document.getElementById("personagem").style.top)

setInterval(function () {
  var deltaX = clickX - posX
  var deltaY = clickY - posY

  var distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  if (distancia < velocidade) return

  var angulo = Math.atan2(deltaY, deltaX)
  posX += velocidade * Math.cos(angulo)
  posY += velocidade * Math.sin(angulo)

  personagem.style.left = posX + "px"
  personagem.style.top = posY + "px"
}, 20)

function capturarPosicaoMouse (event) {
  console.log(personagem.style.width)
  clickX = event.clientX - largura / 2
  clickY = event.clientY - altura / 2
}
document.addEventListener("mousedown", capturarPosicaoMouse)


