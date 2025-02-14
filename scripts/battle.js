import Pokemon from '../classes/pokemon.js'

let baseURL = 'https://pokeapi.co/api/v2/pokemon'

let allyNum = localStorage.getItem("allyNum");
let cpuNum = localStorage.getItem("cpuNum");
let teamChoice = localStorage.getItem("teamChoice");

let allyPokemon = []
let cpuPokemon = []
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
    document.getElementById("ally-hp-value").innerText = allyPokemon[0].hp
}

function renderAlly(){
    document.getElementById("allyBattleSprite").src = allyPokemon[0].back_default_sprite
    document.getElementById("ally-pokemon-name").innerText = allyPokemon[0].name
    renderAllyHp()
}

function renderCPUHp() {
    document.getElementById("cpu-hp-value").innerText = cpuPokemon[0].hp
}

function renderCPU(){
    document.getElementById("cpuBattleSprite").src = cpuPokemon[0].front_default_sprite
    document.getElementById("cpu-pokemon-name").innerText = cpuPokemon[0].name
    renderCPUHp()
}

function renderMoves() {
    const move1 = document.getElementsByClassName('move1')[0]
    let move1_name = move1.children[0]
    let move1_type = move1.children[1].children[0]
    let move1_pp = move1.children[1].children[1]

    move1_name.innerText = allyPokemon[0].moves[0].name
    move1_type.innerText = allyPokemon[0].moves[0].type
    move1_pp.innerText = allyPokemon[0].moves[0].pp

    const move2 = document.getElementsByClassName('move2')[0]
    let move2_name = move2.children[0]
    let move2_type = move2.children[1].children[0]
    let move2_pp = move2.children[1].children[1]

    move2_name.innerText = allyPokemon[0].moves[1].name
    move2_type.innerText = allyPokemon[0].moves[1].type
    move2_pp.innerText = allyPokemon[0].moves[1].pp

    const move3 = document.getElementsByClassName('move3')[0]
    let move3_name = move3.children[0]
    let move3_type = move3.children[1].children[0]
    let move3_pp = move3.children[1].children[1]

    move3_name.innerText = allyPokemon[0].moves[2].name
    move3_type.innerText = allyPokemon[0].moves[2].type
    move3_pp.innerText = allyPokemon[0].moves[2].pp

    const move4 = document.getElementsByClassName('move4')[0]
    let move4_name = move4.children[0]
    let move4_type = move4.children[1].children[0]
    let move4_pp = move4.children[1].children[1]

    move4_name.innerText = allyPokemon[0].moves[3].name
    move4_type.innerText = allyPokemon[0].moves[3].type
    move4_pp.innerText = allyPokemon[0].moves[3].pp
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
    if (event.currentTarget == document.getElementsByClassName('move1')[0]) {
        userMoveSelection = 0
    }
    else if (event.currentTarget == document.getElementsByClassName('move2')[0]) {
        userMoveSelection = 1
    }
    else if (event.currentTarget == document.getElementsByClassName('move3')[0]) {
        userMoveSelection = 2
    }
    else if (event.currentTarget == document.getElementsByClassName('move4')[0]) {
        userMoveSelection = 3
    }
    resolve(userMoveSelection)
}

async function getUserMove(){
    return new Promise((resolve) => {
        document.getElementsByClassName('move1')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move2')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move3')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
        document.getElementsByClassName('move4')[0].addEventListener('click', (event) => userMoveInput(event, resolve));
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

function executeMove(move, attackingMon, defendingMon) {
    // TODO make ui say what move the user is using
    alert(`${attackingMon.name} used ${move.name}`)
    let base_power = move.power
    if (move.damage_class == 'special') {
        base_power *= (attackingMon.sp_atk / defendingMon.sp_def)
    }
    else if (move.damage_class == 'physical') {
        base_power *= (attackingMon.atk / defendingMon.sp_def)
    }

    // TODO implement stab
    // TODO implement status conditions

    if (Math.random() > move.accuracy/100 && move.damage_class != 'status') {
        alert(`${attackingMon.name}'s attack missed!`)
        return
    }

    let damage = Math.round(base_power/3)
    defendingMon.hp -= damage
    alert(`${attackingMon.name}'s attack did ${damage} damage`)
}


await initTeams()
renderAlly()
renderCPU()
renderMoves()

while(!battleOver()){

    // get both moves to be used in next turn
    let cpuMove = getCPUMove()
    console.log(cpuMove)
    let userMove = await getUserMove()
    userMove = allyPokemon[0].moves[userMove]
    console.log(userMove)

    // decide priority
    let moveFirst = decidePriority(userMove, cpuMove)
    // execute first move
    if (moveFirst == 'user') {
        executeMove(userMove, allyPokemon[0], cpuPokemon[0])
        if (cpuPokemon[0].hp <= 0) {
            console.log('fainted')
            // TODO handle faint
        }
        else {
            renderCPUHp()
        }
        executeMove(cpuMove, cpuPokemon[0], allyPokemon[0])
        if (allyPokemon[0].hp <= 0) {
            console.log('fainted')
            // TODO handle faint
        }
        else {
            renderAllyHp()
        }
    }
    else {
        executeMove(cpuMove, cpuPokemon[0], allyPokemon[0])
        if (allyPokemon[0].hp <= 0) {
            console.log('fainted')
            // TODO handle faint
        }
        else {
            renderAllyHp()
        }
        executeMove(userMove, allyPokemon[0], cpuPokemon[0])
        if (cpuPokemon[0].hp <= 0) {
            console.log('fainted')
            // TODO handle faint
        }
        else {
            renderCPUHp()
        }
    }

    break
}
