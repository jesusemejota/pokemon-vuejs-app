import pokemonApi from "@/api/pokemonApi"

const getPokemons = () => {
    
    const pokemonsArr = Array.from ( Array(650) )
    
    return pokemonsArr.map( ( _ , index ) => index + 1 )

}

const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5)
    
    const pokemons = await getPokemonNames( mixedPokemons.splice(0,4) )

    return pokemons

}

const getPokemonNames = async( [a,b,c,d] = [] ) => {

    // const resp = await pokemonApi.get(`/1`)
    // console.log( resp.data.name )

    const promiseArr = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]

    const [ p1, p2, p3, p4 ] = await Promise.all( promiseArr ).then()
    
    const p1format = capitalizeFirstLetter(p1.data.name)
    const p2format = capitalizeFirstLetter(p2.data.name)
    const p3format = capitalizeFirstLetter(p3.data.name)
    const p4format = capitalizeFirstLetter(p4.data.name)

    return [
        { name: p1format, id: p1.data.id},
        { name: p2format, id: p2.data.id},
        { name: p3format, id: p3.data.id},
        { name: p4format, id: p4.data.id},
    ]

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default getPokemonOptions