const urlParams = new URLSearchParams(window.location.search);
const imageDetail = document.getElementById('imageDetail')
const pokemonStatsName = document.getElementById('pokemonStatsName')
const pokemonStats = document.getElementById('pokemonStats')
const pokemonStatsAbility = document.getElementById('pokemonStatsAbility')

const id = urlParams.get("id")

function convertPokemonInfo(pokemon){
    return`                
    <li class="${pokemon.type}">
        <span class="nome ${pokemon.type}">${pokemon.name}  #${pokemon.number}</span>
        <span class="photo"> <img src="${pokemon.photo}" alt="${pokemon.name}"> </span>
        <span class="peso ${pokemon.type}">${pokemon.weight} Kg</span>
        <span class="tamanho ${pokemon.type}">${pokemon.height} M</span>
    </li>`
}

function convertPokemonStat (pokemon){
    return `
        <li>${pokemon}</li>
   `
}

function loadPokemonInfo(id){
    pokeApi.getPokemon(id).then((pokemon = []) => {
        const newHtml1 = convertPokemonInfo(pokemon);
        imageDetail.innerHTML += newHtml1
    })
}

function loadPokemonStats(id){
pokeApi.getPokemon(id).then((pokemon = [] ) => {
        const newHtml1 = pokemon.statsName.map(convertPokemonStat).join('')
        const newHtml2 = pokemon.stats.map(convertPokemonStat).join('')
        const newHtml3 = pokemon.abilities.map(convertPokemonStat).join('')
        pokemonStatsName.innerHTML += newHtml1
        pokemonStats.innerHTML += newHtml2
        pokemonStatsAbility.innerHTML += newHtml3
    })
}

loadPokemonStats(id)
loadPokemonInfo(id)