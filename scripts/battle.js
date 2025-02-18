import Pokemon from '../classes/pokemon.js'

let baseURL = 'https://pokeapi.co/api/v2/pokemon'

let allyNum = localStorage.getItem("allyNum");
let cpuNum = localStorage.getItem("cpuNum");
let teamChoice = localStorage.getItem("teamChoice");

let allyPokemon = []
let cpuPokemon = []
let superEffective = {'normal': [],
                    'fire': ['grass', 'ice', 'bug', 'steel'],
                    'water': ['fire', 'ground', 'rock'],
                    'electric': ['water', 'flying'],
                    'grass': ['water', 'ground', 'rock'],
                    'ice': ['grass', 'ground', 'flying', 'dragon'],
                    'fighting': ['normal', 'ice', 'rock', 'dark', 'steel'],
                    'poison': ['grass', 'fairy'],
                    'ground': ['fire', 'electric', 'poison', 'rock', 'steel'],
                    'flying': ['grass', 'fighting', 'bug'],
                    'psychic': ['fighting', 'poison'],
                    'bug': ['grass', 'psychic', 'dark'],
                    'rock': ['fire', 'ice', 'flying', 'bug'],
                    'ghost': ['psychic', 'ghost'],
                    'dragon': ['dragon'],
                    'dark': ['psychic', 'ghost'],
                    'steel': ['ice', 'rock', 'fairy'],
                    'fairy': ['fighting', 'dragon', 'dark']}
let notVeryEffective = {'normal': ['rock', 'steel'],
                    'fire': ['fire', 'water', 'rock', 'dragon'],
                    'water': ['water', 'grass', 'dragon'],
                    'electric': ['electric', 'grass', 'dragon'],
                    'grass': ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
                    'ice': ['fire', 'water', 'ice', 'steel'],
                    'fighting': ['poison', 'flying', 'psychic', 'bug', 'fairy'],
                    'poison': ['poison', 'ground', 'rock', 'ghost'],
                    'ground': ['grass', 'bug'],
                    'flying': ['electric', 'rock', 'steel'],
                    'psychic': ['psychic', 'steel'],
                    'bug': ['fire', 'fighting', 'poison', 'flying', 'rock', 'steel', 'fairy'],
                    'rock': ['fighting', 'ground', 'steel'],
                    'ghost': ['dark'],
                    'dragon': ['steel'],
                    'dark': ['fighting', 'dark', 'fairy'],
                    'steel': ['fire', 'water', 'electric', 'steel'],
                    'fairy': ['fire', 'poison', 'steel']}
let noEffect = {'normal': ['ghost'],
                    'fire': [],
                    'water': [],
                    'electric': ['ground'],
                    'grass': [],
                    'ice': [],
                    'fighting': ['ghost'],
                    'poison': ['steel'],
                    'ground': ['flying'],
                    'flying': [],
                    'psychic': ['dark'],
                    'bug': [],
                    'rock': [],
                    'ghost': ['normal'],
                    'dragon': ['fairy'],
                    'dark': [],
                    'steel': [],
                    'fairy': []}
let userMoveSelection = -1

// add event handler to redirect to home page on click
let home = document.getElementById('nav-item-home')
home.addEventListener('click', function() {
    window.location.href = "index.html";
});

// add event handler to redirect repo page on click
document.getElementById('nav-item-repo').addEventListener('click', function() {
    window.location.href = "https://github.com/Chaos66-dev/sc-project1"
})

document.getElementById('run').addEventListener('click', function() {
    alert('coward')
    window.location.href = "index.html";
})

// Creates instance of pokemon class and selects moves
async function createPokemon(data) {
    let poke = new Pokemon(data)
    await poke.selectMoves()
    return poke
}

// calls pokemon api and adds the pokemon to party
async function requestPokemon(party, pokemonName = '') {
    if (pokemonName == '') {
        // request random pokemon

        let randPokeId = Math.floor(Math.random() * 649) + 1
        const response = await fetch(baseURL + "/" + randPokeId.toString())
        const data = await response.json()
        party.push(await createPokemon(data))
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

function renderAllyHp() {
    document.getElementById("ally-hp-value").innerText = `${allyPokemon[0].hp} / ${allyPokemon[0].max_hp}`
}

function renderAlly(){
    document.getElementById("allyBattleSprite").src = allyPokemon[0].back_default_sprite
    document.getElementById("ally-pokemon-name").innerText = allyPokemon[0].name
    renderAllyHp()
}

function renderCPUHp() {
    document.getElementById("cpu-hp-value").innerText = `${cpuPokemon[0].hp} / ${cpuPokemon[0].max_hp}`
}

function renderCPU(){
    document.getElementById("cpuBattleSprite").src = cpuPokemon[0].front_default_sprite
    document.getElementById("cpu-pokemon-name").innerText = cpuPokemon[0].name
    renderCPUHp()
}

function renderMoves() {
    rerenderMove(0)
    rerenderMove(1)
    rerenderMove(2)
    rerenderMove(3)
}

function renderMoveType(move_type) {
    switch (move_type.innerText) {
        case 'normal':
            move_type.style.background = '#aab09f';
            break;
        case 'fire':
            move_type.style.background = '#ea7a3c';
            break;
        case 'water':
            move_type.style.background = '#539ae2';
            break;
        case 'electric':
            move_type.style.background = '#e5c531';
            break;
        case 'grass':
            move_type.style.background = '#71c558';
            break;
        case 'ice':
            move_type.style.background = '#70cbd4';
            break;
        case 'fighting':
            move_type.style.background = '#cb5f48';
            break;
        case 'poison':
            move_type.style.background = '#b468b7';
            break;
        case 'ground':
            move_type.style.background = '#cc9f4f';
            break;
        case 'flying':
            move_type.style.background = '#7da6de';
            break;
        case 'psychic':
            move_type.style.background = '#e5709b';
            break;
        case 'bug':
            move_type.style.background = '#94bc4a';
            break;
        case 'rock':
            move_type.style.background = '#b2a061';
            break;
        case 'ghost':
            move_type.style.background = '#846ab6';
            break;
        case 'dragon':
            move_type.style.background = '#6a7baf';
            break;
        case 'dark':
            move_type.style.background = '#736c75';
            break;
        case 'steel':
            move_type.style.background = '#89a1b0';
            break;
        case 'fairy':
            move_type.style.background = '#e397d1';
            break;
    }
    move_type.style.borderRadius = '2em'
}

function rerenderMove(move_num) {
    const move = document.getElementsByClassName(`move${move_num}`)[0]
    let move_name = move.children[0]
    let move_type = move.children[1].children[0]
    let move_pp = move.children[1].children[1]
    let mon_available_pp = Math.max(allyPokemon[0].moves[move_num].pp, 0)

    move_name.innerText = allyPokemon[0].moves[move_num].name
    move_type.innerText = allyPokemon[0].moves[move_num].type
    renderMoveType(move_type)
    move_pp.innerText = `${mon_available_pp} / ${allyPokemon[0].moves[move_num].max_pp}`
    console.log(`${mon_available_pp} / ${allyPokemon[0].moves[move_num].max_pp}`)
}

function battleOver() {
    if (allyPokemon.length == 0 || cpuPokemon.length == 0){
        return true
    }
    return false
}

function getCPUMove() {
    let moveChoice = Math.floor(Math.random() * 4)
    moveChoice = cpuPokemon[0].moves[moveChoice]
    return moveChoice
}

function userMoveInput(event, resolve){
    if (event.currentTarget == document.getElementsByClassName('move0')[0]) {
        userMoveSelection = 0
    }
    else if (event.currentTarget == document.getElementsByClassName('move1')[0]) {
        userMoveSelection = 1
    }
    else if (event.currentTarget == document.getElementsByClassName('move2')[0]) {
        userMoveSelection = 2
    }
    else if (event.currentTarget == document.getElementsByClassName('move3')[0]) {
        userMoveSelection = 3
    }
    resolve(userMoveSelection)
}

async function getUserMove(){
    return new Promise((resolve) => {
        document.getElementsByClassName('move0')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move1')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move2')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move3')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
    })
}

function decidePriority(userMove, cpuMove) {
    if (userMove.priority > cpuMove.priority) {
        return 'user'
    }
    else if (userMove.priority < cpuMove.priority) {
        return 'cpu'
    }
    else {
        return allyPokemon[0].speed >= cpuPokemon[0].speed ? 'user' : 'cpu' // user always wins speed ties
    }
}

function effectivenessCheck(move_type, defendingMonTypes) {
    let effectiveness = 1
    for(let mon_type of defendingMonTypes) {
        if(superEffective[move_type].includes(mon_type)){
            effectiveness *= 2
        }
        if(notVeryEffective[move_type].includes(mon_type)){
            effectiveness /= 2
        }
        if(noEffect[move_type].includes(mon_type)) {
            effectiveness = 0
        }
    }
    return effectiveness
}

function executeMove(move, attackingMon, defendingMon) {
    alert(`${attackingMon.name} used ${move.name}`)
    let damage_roll_multiplier = 1 + (Math.random()/10) - 0.05
    let base_power = move.power

    // stab check
    if (attackingMon.types.includes(move.type)) {
        base_power *= 1.5
        console.log('stab')
    }

    // super/not effective check
    let effectiveness = effectivenessCheck(move.type, defendingMon.types)
    base_power *= effectiveness

    if (move.damage_class == 'special') {
        base_power *= (attackingMon.sp_atk / defendingMon.sp_def)
    }
    else if (move.damage_class == 'physical') {
        base_power *= (attackingMon.atk / defendingMon.sp_def)
    }

    // TODO implement status moves
    // TODO implement stat changing moves

    if (Math.random() > move.accuracy/100 && move.damage_class != 'status') {
        alert(`${attackingMon.name}'s attack missed!`)
        return
    }

    let damage = Math.round((base_power * damage_roll_multiplier)/3)
    defendingMon.hp -= damage
    alert(`${attackingMon.name}'s attack did ${damage} damage`)
    if(effectiveness > 1) {
        alert(`${attackingMon.name}'s move was super effective!`)
    }
    else if (effectiveness < 1 && effectiveness > 0) {
        alert(`${attackingMon.name}'s move was not very effective...`)
    }
    else if (effectiveness == 0) {
        alert(`${attackingMon.name}'s move had no effect`)
    }
}

function hasAnyPP(mon){
    for(let move of mon.moves){
        if (move.pp > 0){
            return true
        }
    }
    return false
}


function decreaseMovePP(mon, move, ally){
    for(let i = 0; i < 4; i++){
        if(mon.moves[i] == move){
            move.pp--
            if(ally) {
                rerenderMove(i)
            }
            return
        }
    }
}

function cpuFaint(){
    cpuPokemon[0].hp = 0
    renderCPUHp()
    alert(`${cpuPokemon[0].name} fainted`)
    cpuPokemon.shift()
}

function cpuNewPokemon() {
    alert(`CPU sends out ${cpuPokemon[0].name}`)
    renderCPU()
}

function allyFaint() {
    allyPokemon[0].hp = 0
    renderAllyHp()
    alert(`${allyPokemon[0].name} fainted`)
    allyPokemon.shift()
}

// TODO stretch goal of allowing user to choose next pokemon
function allyNewPokemon() {
    alert(`Ally sends out ${allyPokemon[0].name}`)
    renderAlly()
    renderMoves()
}

function endOfGame() {
    if (allyPokemon.length == 0) {
        alert('You blacked out')
    }
    else if (cpuPokemon.length == 0) {
        alert('You defeated the CPU!')
    }
    localStorage.clear()
    window.location.href = "index.html";
}

await initTeams()
renderAlly()
renderCPU()
renderMoves()

let turnNum = 1
while(!battleOver()){
    // alert(`Turn: ${turnNum++}`)

    // get both moves to be used in next turn
    var cpuMove = ''
    if(hasAnyPP(cpuPokemon[0])){
        cpuMove = getCPUMove()
        let tmp = cpuMove.pp
        while (tmp <= 0) {
            cpuMove = getCPUMove()
            tmp = cpuMove.pp
        }
        console.log(cpuMove)
    }
    else {
        console.log('cpu pokemon is out of all move pp')
        // TODO handle this case
    }

    // check to see if at least one move has pp, else handle
    var userMove = ''
    if(hasAnyPP(allyPokemon[0])){
        userMove = await getUserMove()
        let tmp = allyPokemon[0].moves[userMove].pp
        while (tmp <= 0) {
            alert('This move has no more pp. please choose another move.')
            userMove = await getUserMove()
            tmp = allyPokemon[0].moves[userMove].pp
        }
        userMove = allyPokemon[0].moves[userMove]
        console.log(userMove)
    }
    else {
        console.log('all moves are out of pp')
        // TODO handle this case
    }

    // decrease move pp
    decreaseMovePP(allyPokemon[0], userMove, true)
    decreaseMovePP(cpuPokemon[0], cpuMove, false)

    // decide priority
    let moveFirst = decidePriority(userMove, cpuMove)
    // execute first move
    if (moveFirst == 'user') {
        executeMove(userMove, allyPokemon[0], cpuPokemon[0])
        if (cpuPokemon[0].hp <= 0) {
            cpuFaint()
            if(cpuPokemon.length > 0){
                cpuNewPokemon()
            }
        }
        else {
            renderCPUHp()
            executeMove(cpuMove, cpuPokemon[0], allyPokemon[0])
            if (allyPokemon[0].hp <= 0) {
                allyFaint()
                if(allyPokemon.length > 0){
                    allyNewPokemon()
                }
            }
            else {
                renderAllyHp()
            }
        }
    }
    else {
        executeMove(cpuMove, cpuPokemon[0], allyPokemon[0])
        if (allyPokemon[0].hp <= 0) {
            allyFaint()
                if(allyPokemon.length > 0){
                    allyNewPokemon()
                }
        }
        else {
            renderAllyHp()
            executeMove(userMove, allyPokemon[0], cpuPokemon[0])
            if (cpuPokemon[0].hp <= 0) {
                cpuFaint()
                if(cpuPokemon.length > 0){
                    cpuNewPokemon()
                }
            }
            else {
                renderCPUHp()
            }
        }
    }
}

endOfGame()
