
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.base_experience = pokeDetail.base_experience

    const statsName = pokeDetail.stats.map((typeSlot) => typeSlot.stat.name) 
    const stats = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat) 

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)

    pokemon.types = types
    pokemon.type = type

    pokemon.statsName = statsName
    pokemon.stats = stats

    pokemon.abilities = abilities

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.weight = (pokeDetail.weight * 0.1).toFixed(1)
    pokemon.height = (pokeDetail.height * 0.1).toFixed(2)

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((detailRequests) => convertPokeApiDetailToPokemon(detailRequests))
        .then((pokemonDetails) => Promise.resolve(pokemonDetails))
}