class Pokemon {
    constructor(info) {
        this.name = info.name;
        this.hp = info.stats[0].base_stat
        this.atk = info.stats[1].base_stat
        this.def = info.stats[2].base_stat
        this.sp_atk = info.stats[3].base_stat
        this.sp_def = info.stats[4].base_stat
        this.speed = info.stats[5].base_stat
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
}

export default Pokemon
