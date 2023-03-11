

const pokeApi = {}

function convertePokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//pegamos a lista de detalhes do pokemons e trasformamos em um json
pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((convertePokeApiDetailToPokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 9) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //Lista de pokemons
    return fetch(url) //busca lista de pokemons
    .then((response) =>response.json())// converte a lista para arquivo Json
    .then((jsonBody) =>jsonBody.results) //remove detalhes que não precisamos
    .then((pokemons) =>pokemons.map(pokeApi.getPokemonDetail)) //lista de promes de detalhes do pokemons 
    .then((detalRequests) => Promise.all(detalRequests))// aguardando que toda a lista de detalhes do pokemons termine 
    .then((pokemonsDetails) => pokemonsDetails)//passa  lista para nos    
    //.catch((error) => console.error(error))
}

