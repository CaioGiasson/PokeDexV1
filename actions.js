var timeSalvo = localStorage.getItem('meuTime')
var meuTime = JSON.parse(timeSalvo)

if (!timeSalvo) {
  meuTime = []
  salvarTime()
}

var campoNomePokemon = document.getElementById(`pokename`)

function apertouEnter (key) {
  if (key.keyCode == 13) buscarPokemon()
}

function ativarCampo (key) {
  if (campoNomePokemon == document.activeElement) return

  if (key.keyCode < 65 || key.keyCode > 90) return

  campoNomePokemon.value = key.key
  campoNomePokemon.focus()
}

document.addEventListener('keyup', ativarCampo)
campoNomePokemon.addEventListener('keyup', apertouEnter)
campoNomePokemon.focus()

function mostrarTime () {
  const time = document.getElementById(`meu-time`)

  if (meuTime.length == 0) {
    time.innerHTML = "Meu time está vazio... <br /> Busque algum pokemon e clique para adicionar"
    return
  }

  time.innerHTML = ""
  for (let i in meuTime) {
    const pokemon = meuTime[i]

    time.innerHTML += pokeCard(pokemon, i)
  }
}

function adicionarAoTime (i) {
  document.body.scrollTop = 0

  if (meuTime.length == 6) {
    alert(`Seu time já está cheio! Remova algum outro pokemon`)
    return
  }

  const pokemon = listaPokemon[i]

  const repetidos = meuTime.filter(poke => poke.national_number == pokemon.national_number)
  if (repetidos.length > 0) {
    alert(`Você já tem ${pokemon.name} no seu time. Escolha outro, pq é feio repetir, seu apelão`)
    return
  }

  meuTime.push(pokemon)
  mostrarTime()

  salvarTime()
}

function salvarTime () {
  const meuTimeString = JSON.stringify(meuTime)
  localStorage.setItem('meuTime', meuTimeString)
}

function removerDoTime (i) {
  meuTime.splice(i, 1)
  mostrarTime()

  salvarTime()
}

function buscarPokemon () {
  const pokename = document.getElementById(`pokename`)
  const resultadosBusca = document.getElementById(`resultados-busca`)
  const quantResultados = document.getElementById(`quantidade-resultados`)

  const name = pokename.value
  const results = name == "" ? [] : buscaNaLista(name)

  quantResultados.innerHTML = `Encontrado(s) ${results.length} pokemon`
  resultadosBusca.innerHTML = ""

  for (pokemon of results)
    resultadosBusca.innerHTML += pokeCard(pokemon)
}

function pokeCard (pokemon, indiceNoTime = null) {

  const isMega = pokemon.evolution != null
  const name = isMega ? pokemon.evolution.name : pokemon.name
  const indice = indicePokemon(pokemon)

  const botaoAdd = `<span class="addTime" onclick="adicionarAoTime(${indice})">&plus;</span>`
  const botaoRemover = `<span class="remTime" onclick="removerDoTime(${indiceNoTime})">&times;</span>`

  const botoes = indiceNoTime ? botaoRemover : botaoAdd

  return `<div class="pokecard">
      <img src="${pokemon.sprites.animated}" alt="Ilustração do pokemon ${name}" />
      <b class="name">${name}</b>
      <span class="prop">HP: ${pokemon.hp}</span>
      <span class="prop">Attack: ${pokemon.attack}</span>
      <span class="prop">Defense: ${pokemon.defense}</span>
      <span class="prop">SP. Attack: ${pokemon.sp_atk}</span>
      <span class="prop">SP. Defense: ${pokemon.sp_def}</span>

      ${botoes}

    </div>`
}

function indicePokemon (p) {
  for (i in listaPokemon) {
    let pokemon = listaPokemon[i]

    if (pokemon.national_number == p.national_number && pokemon.evolution == p.evolution)
      return i
  }
}

function buscaNaLista (parteDoNome) {

  let listaFiltradaPorNome = []

  for (pokemon of listaPokemon) {

    if (pokemon.name.toLowerCase().includes(parteDoNome.toLowerCase()))
      listaFiltradaPorNome.push(pokemon)

  }

  return listaFiltradaPorNome
}

function imageExists (image_url) {
  var http = new XMLHttpRequest()

  http.open('HEAD', image_url, false)
  http.send();

  return http.status == 200
}
