import Pokemon from '../classes/pokemon.js'

let baseURL = 'https://pokeapi.co/api/v2/pokemon'

let allyNum = localStorage.getItem("allyNum");
let cpuNum = localStorage.getItem("cpuNum");
let teamChoice = localStorage.getItem("teamChoice");
console.log(allyNum, cpuNum, teamChoice)

let allyPokemon = []
let cpuPokemon = []

function createPokemon(data) {
    let poke = new Pokemon(data)
    poke.selectMoves()
    return poke
}

async function requestPokemon(party, pokemonName = '') {
    if (pokemonName == '') {
        // request random pokemon

        let randPokeId = Math.floor(Math.random() * 649) + 1
        const response = await fetch(baseURL + "/" + randPokeId.toString())
        const data = await response.json()
        party.push(createPokemon(data))
    }
    else {
        // request pokemon with pokemonName
    }
};

async function initTeams(){
    for(let i = 0; i < allyNum; i++) {
        if(teamChoice == "randomized") {
            await requestPokemon(allyPokemon)
        }
    }

    for(let i = 0; i < cpuNum; i++) {
        if(teamChoice == "randomized") {
            await requestPokemon(cpuPokemon)
        }
    }
    console.log(allyPokemon)

    console.log(cpuPokemon)
}

function renderAlly(){
    document.getElementById("allyBattleSprite").src = allyPokemon[0].back_default_sprite
    document.getElementById("ally-pokemon-name").innerText = allyPokemon[0].name
    document.getElementById("ally-hp-value").innerText = allyPokemon[0].hp
}

function renderCPU(){
    document.getElementById("cpuBattleSprite").src = cpuPokemon[0].front_default_sprite
    document.getElementById("cpu-pokemon-name").innerText = cpuPokemon[0].name
    document.getElementById("cpu-hp-value").innerText = cpuPokemon[0].hp
}

await initTeams()
renderAlly()
renderCPU()
