class Move {
    constructor(info) {
        this.name = info.name
        this.accuracy = info.accuracy
        this.damage_class = info.damage_class.name
        this.power = info.power
        this.pp = info.pp
        this.priority = info.priority
        this.type = info.type.name
    }

    toString() {
        return `Name: ${this.name}
                ACCURACY: ${this.accuracy}
                DAMAGE CLASS: ${this.damage_class}
                POWER: ${this.power}
                PP: ${this.pp}
                PRIORITY: ${this.priority}
                TYPE: ${this.type}`
    }
}

export default Move