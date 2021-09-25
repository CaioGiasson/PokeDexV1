
function pokeCard (pokemon, indiceNoTime = null) {

  const isMega = pokemon.evolution != null
  const name = isMega ? pokemon.evolution.name : pokemon.name

  const image = pokemon.sprites.normal

  return `<div class="pokecard">
  <img class="pequena" src="${image}" alt="Ilustração do pokemon ${name}" />
      <b class="name">${name} (${pokemon.national_number})</b>
      <span class="prop">HP: ${pokemon.hp}</span>
      <span class="prop">Attack: ${pokemon.attack}</span>
      <span class="prop">Defense: ${pokemon.defense}</span>
      <span class="prop">SP. Attack: ${pokemon.sp_atk}</span>
      <span class="prop">SP. Defense: ${pokemon.sp_def}</span>

    </div>`
}


window.lista = document.getElementById("lista")

function mostrar () {
  window.minimo = +document.getElementById("minimo").value
  window.maximo = +document.getElementById("maximo").value

  lista.innerHTML = ""

  for (pokemon of listaPokemon) {

    if (pokemon.national_number < minimo) continue
    if (pokemon.national_number > maximo) break

    console.log(pokemon)

    lista.innerHTML += pokeCard(pokemon)
  }
}



