import Move from '../classes/move.js'

class Pokemon {
    constructor(info) {
        this.name = info.name;
        this.hp = info.stats[0].base_stat
        this.max_hp = this.hp
        this.atk = info.stats[1].base_stat
        this.def = info.stats[2].base_stat
        this.sp_atk = info.stats[3].base_stat
        this.sp_def = info.stats[4].base_stat
        this.speed = info.stats[5].base_stat
        this.atk_mult = 1
        this.def_mult = 1
        this.sp_atk_mult = 1
        this.sp_def_mult = 1
        this.speed_mult = 1
        this.accuracy_mult = 1
        this.evasiveness_mult = 1
        this.status = null
        this.types = info.types.filter(typ => typ.type.name)
        this.back_default_sprite = info.sprites.back_default
        this.front_default_sprite = info.sprites.front_default
        this.possible_moves = info.moves
        this.moves = []

        let arr = []
        for(let typ of this.types){
            arr.push(typ.type.name)
        }
        this.types = arr

        arr = []
        for(let mv of this.possible_moves){
            arr.push(mv.move)
        }
        this.possible_moves = arr
    }

    toString() {

        return `Name: ${this.name}
                HP: ${this.hp}
                ATK: ${this.atk}
                DEF: ${this.def}
                SP ATK: ${this.sp_atk}
                SP DEF: ${this.sp_def}
                SPEED: ${this.speed}
                TYPES: ${this.types}
                FRONT SPRITE: ${this.front_default_sprite}
                BACK SPRITE: ${this.back_default_sprite}
                POSSIBLE MOVES: ${this.possible_moves}
                MOVES: ${this.moves}`
    }

    async selectMoves(blacklist) {
        let selected_idxs = []
        let selected_moves = []
        while (selected_moves.length < 4){
            let rand_mv = Math.floor(Math.random() * this.possible_moves.length)
            if (selected_idxs.includes(rand_mv)) {
                continue
            }
            else {
                let response = await fetch(this.possible_moves[rand_mv].url);
                let data = await response.json()
                if(blacklist.includes(data.name)) {
                    continue
                }
                else {
                    selected_idxs.push(rand_mv);
                    selected_moves.push(new Move(data))
                }
            }
        }
        this.moves = selected_moves
    }
}

export default Pokemon
